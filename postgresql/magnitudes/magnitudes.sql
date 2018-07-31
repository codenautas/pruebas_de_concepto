-- magnitudes.sql

drop schema if exists magnitudes cascade;
create schema magnitudes;

set search_path = magnitudes;

create function create_magnitude_operator(p_type_name_left text, p_type_name_right text, p_type_name_result text, p_operator text, p_commutator text) returns void
  language plpgsql
as
$BODY$
declare
  v_function_name text:=format('%4$s %1$s %2$s %3$s', p_type_name_left, p_type_name_right, p_type_name_result, p_operator);
  v_expresion_in  text:=format($$ p_op1.%1$I %4$s p_op2.%2$I $$, p_type_name_left, p_type_name_right, p_type_name_result, p_operator);
  v_expresion_out text:=case p_type_name_result when 'decimal' then v_expresion_in else format($$ row(%s)::%I; $$, v_expresion_in  , p_type_name_result) end; 
  v_sql text:=format($SENTENCE$
create function %5$I (p_op1 %1$I, p_op2 %2$I) returns %3$I
  language sql RETURNS NULL ON NULL INPUT as 
$SQL$
  select %6$s;
$SQL$;
create operator %4$s (
  procedure = %5$I,
  leftarg = %1$I,
  rightarg = %2$I %7$s
);
$SENTENCE$, p_type_name_left, p_type_name_right, p_type_name_result, p_operator, v_function_name, v_expresion_out, ', commutator = '||p_commutator);
begin
  execute replace(replace(v_sql,format('.%I','decimal'),''),format('%I','decimal'),'decimal');
end;
$BODY$;

create function create_magnitude_type(p_type_name text) returns void
  language plpgsql
as
$BODY$
declare
  v_sql text:=format($SENTENCE$
create type %1$I as (
  %1$I decimal
); 
$SENTENCE$, p_type_name);
  v_sql_agg text:=format($SENTENCE$
create function %1$I(p_escalar decimal) returns %1$I
  language sql as $SQL$ select row(p_escalar)::%1$I; $SQL$;
create aggregate sum(BASETYPE = %1$I, SFUNC = %2$I, STYPE = %1$I);
$SENTENCE$, p_type_name, format('+ %1$s %1$s %1$s', p_type_name));
begin
  execute replace(v_sql, 'gramos', p_type_name);
  perform create_magnitude_operator(p_type_name,p_type_name,p_type_name,'+','+' );
  perform create_magnitude_operator(p_type_name,p_type_name,p_type_name,'-',null);
  perform create_magnitude_operator(p_type_name,'decimal'  ,p_type_name,'*','*' );
  perform create_magnitude_operator('decimal'  ,p_type_name,p_type_name,'*','*' );
  perform create_magnitude_operator(p_type_name,'decimal'  ,p_type_name,'/',null);
  execute replace(v_sql_agg, 'gramos', p_type_name);
end;
$BODY$;

create function declare_inverse_magnitude(p_type_name text, p_reverse text) returns void
  language plpgsql
as 
$BODY$
begin
  perform create_magnitude_operator('decimal'  , p_type_name, p_reverse  ,'/',null);
  perform create_magnitude_operator('decimal'  , p_reverse  , p_type_name,'/',null);
  perform create_magnitude_operator(p_reverse  , p_type_name,'decimal'   ,'*','*' );
  perform create_magnitude_operator(p_type_name, p_reverse  ,'decimal'   ,'*','*' );
end;
$BODY$;

create function pharentesis_not_simple(p_type_name text) returns text
  language sql as
$SQL$
  select case when p_type_name ~* '^\w*$' then p_type_name else '('||p_type_name||')' end;
$SQL$;

create function declare_compound_magnitude(p_numerator text, p_denominator text, p_fractional text, p_inverse text=null) returns void
  language plpgsql 
as
$BODY$
begin
  perform create_magnitude_operator(p_fractional,p_denominator,p_numerator ,'*','*' );
  perform create_magnitude_operator(p_numerator ,p_denominator,p_fractional,'/',null);
  if p_denominator<>p_fractional then
    perform create_magnitude_operator(p_denominator,p_fractional,p_numerator  ,'*','*' );
    perform create_magnitude_operator(p_numerator  ,p_fractional,p_denominator,'/',null);
  end if;
  if p_inverse is not null then
    perform declare_compound_magnitude(p_denominator, p_numerator, p_inverse);
  end if;
end;
$BODY$;

create function create_magnitude(p_type_name text, p_reverse text=null, p_square text=null, p_reverse_square text=null) returns void
  language plpgsql
as 
$BODY$
declare
  v_reverse_name   text:=coalesce(p_reverse        , pharentesis_not_simple(p_type_name  )||'-1');
  v_square_name    text:=coalesce(p_square         , pharentesis_not_simple(p_type_name  )||'2' );
  v_reverse_square text:=coalesce(p_reverse_square , regexp_replace(v_square_name,'2$','-2'), pharentesis_not_simple(p_type_name  )||'-1');
begin
  perform create_magnitude_type(p_type_name     );
  perform create_magnitude_type(v_reverse_name  );
  perform create_magnitude_type(v_square_name   );
  perform create_magnitude_type(v_reverse_square);
  perform declare_inverse_magnitude(p_type_name  , v_reverse_name);
  perform declare_inverse_magnitude(v_square_name, v_reverse_square);
  perform declare_compound_magnitude(v_square_name, p_type_name, p_type_name);
end;
$BODY$;



select create_magnitude_type('amstrongs');

create table pesos_atomicos(
  numero_atomico integer primary key,
  simbolo text unique,
  peso_atomico amstrongs
);

insert into pesos_atomicos (numero_atomico, simbolo, peso_atomico) values 
  (1,'H', amstrongs('1.0079')),
  (2,'He',amstrongs('4.003')),
  (3,'Li',amstrongs('6.941'));

select * from pesos_atomicos;

-- select sum(peso_atomico) from pesos_atomicos;
select * from pesos_atomicos order by peso_atomico;

select create_magnitude('metros'  ,'m-1','m2');
select create_magnitude('segundos','s-1','s2');
select create_magnitude('m/s'     ,'s/m'  );
select create_magnitude('m/s2'    ,'s2/m' );
select create_magnitude('gramos'  ,'g-1','g2');
select create_magnitude('m/g'     ,'g/m','m2/g2'   ,'g2/m2');
-- select create_magnitude('m2/g2'   ,'g2/m2');
select create_magnitude('N');
select create_magnitude('N m2/g2');
select declare_compound_magnitude('metros','segundos','m/s','s/m');
select declare_compound_magnitude('m/s','segundos','m/s2');
select declare_compound_magnitude('m2' ,'g2','m2/g2','g2/m2');
select declare_compound_magnitude('N m2/g2','N','m2/g2','g2/m2');

-- /*
do language plpgsql 
$body$
declare
  v_velocidad "m/s";
  v_recorrido "metros";
  v_tiempo "segundos";
begin
  v_velocidad:="m/s"(12);
  v_recorrido:="metros"(120);
  v_tiempo:="segundos"(10);
  if v_velocidad=v_recorrido/v_tiempo then
    raise notice 'ok';
  else
    raise notice 'mal %',v_recorrido/v_tiempo;
  end if;
end;
$body$;
-- */

select p.*, simbolo||':'||peso_atomico, 
       lag(peso_atomico) over (order by numero_atomico) as peso_anterior, peso_atomico- lag(peso_atomico) over (order by numero_atomico) as diferencia,
       to_jsonb(p.peso_atomico) as p_atomico,
       -- avg(peso_atomico) over (),
       sum(peso_atomico) over ()
       -- max(peso_atomico) over ()
  from pesos_atomicos p
  -- where numero_atomico=1
  ;

-- /*
select *, tierra*luna/(distancia*distancia)*G as atraccion
  from (select "gramos"(5972.37e24) as tierra, "gramos"(7342e22) as luna, "metros"(384400000) as distancia, "N m2/g2" (6.67384e-5) as G) x
-- */