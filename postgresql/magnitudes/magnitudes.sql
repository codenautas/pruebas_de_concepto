-- magnitudes.sql

drop schema if exists magnitudes cascade;
create schema magnitudes;

set search_path = magnitudes;

create function create_magnitude_operator(p_type_name_left text, p_type_name_right text, p_type_name_result text, p_operator text, p_commutator text) returns void
  language plpgsql
as
$BODY$
declare
  v_sql text:=$SENTENCE$
create function "* LEFT_T RIGH_T RESU_T"(p_op1 "LEFT_T", p_op2 "RIGH_T") returns "RESU_T"
  language sql as 
$SQL$
  select row(p_op1."LEFT_T" * p_op2."RIGH_T")::"RESU_T";
$SQL$;
create operator * (
  procedure = "* LEFT_T RIGH_T RESU_T",
  leftarg = "LEFT_T",
  rightarg = "RIGH_T", commutator = *
);
$SENTENCE$;
begin
  execute replace(replace(replace(replace(replace(replace(replace(v_sql,
    ', commutator = *',coalesce(', commutator = '||p_commutator,'')),
    'LEFT_T'     ,p_type_name_left  ),
    'RIGH_T',p_type_name_right ),
    'RESU_T'  ,p_type_name_result),
    '."decimal"',''),
    '"decimal"','decimal'),
    '*', p_operator);
end;
$BODY$;

create function create_magnitude_type(p_type_name text) returns void
  language plpgsql
as
$BODY$
declare
  v_sql text:=$SENTENCE$
create type "gramos" as (
  "gramos" decimal
); 
$SENTENCE$;
  v_sql_agg text:=$SENTENCE$
create function "gramos"(p_escalar decimal) returns "gramos"
  language sql as $SQL$ select row(p_escalar)::"gramos"; $SQL$;
create aggregate sum(
    BASETYPE = "gramos",
    SFUNC = "+ gramos gramos gramos",
    STYPE = "gramos"
);
$SENTENCE$;
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

create function declare_compound_magnitude(p_numerator text, p_denominator text, p_fractional text) returns void
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

select create_magnitude_type('metros');
select create_magnitude_type('segundos');
select create_magnitude_type('m/s');
select create_magnitude_type('s2');
select create_magnitude_type('m/s2');
select declare_compound_magnitude('metros','segundos','m/s');
select declare_compound_magnitude('s2','segundos','segundos');
select declare_compound_magnitude('m/s','segundos','m/s2');

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
  from pesos_atomicos p;
  