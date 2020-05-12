drop schema if exists  prueba_variables cascade;
create schema prueba_variables;

set search_path = prueba_variables;

create function no_numerica(p_texto text) returns boolean
  language sql immutable 
as
$sql$ 
  select case when p_texto ~ '^(0|[1-9]\d*)$' then null else true end;
$sql$;

create table variables (
	variable text primary key,
	no_numerica boolean check (no_numerica is not false),
	nombre text,
	unique (variable, no_numerica) -- para la fk, acá está la magia
);

insert into variables values 
  ('n1', null, 'variable numérica, solo acepta números enteros'), 
  ('v1', true, 'variable común de texto, acepta números y textos');

create table variables_opciones (
	variable text references variables (variable),
	opcion text,
	no_numerica boolean check (no_numerica is not false)
	  generated always as (no_numerica(opcion)) stored,
	unique (variable, opcion, no_numerica),
	constraint "var_t_fk" foreign key (variable, no_numerica) references variables (variable, no_numerica),
	primary key (variable, opcion)
);

create view casos_prueba_no_numerica as 
  select * from (
    select 'ERROR' as estado, no_numerica(parametro) as valor_obtenido, *
      from (
        select null::boolean as valor_esperado, '0' as parametro
          union select null, '1'
          union select null, '980'
          union select true, '012' -- no es canónico por el 0
          union select true, '.'  -- no es número
          union select true, ' 12 ' -- no es canónico por los espacios
          union select true, '12.' -- no es canónico por el punto
          union select true, '12.0' -- no es canónico por el decimal
          union select true, 'a12'
	  ) casos
	) test
	where valor_obtenido is distinct from valor_esperado;

select *
  from casos_prueba_no_numerica;

do $do$
declare 
  errores text;
begin
  select string_agg(to_json(x.*)::text,'; ') into errores from casos_prueba_no_numerica x;
  if errores is not null then
    raise 'hay errores en casos_prueba_no_numerica %', errores;
  end if;
end;
$do$;

insert into variables_opciones values 
  ('n1', '1'), -- es numérica, puedo ingresar un número
  ('v1', '1'), -- es no numérica, también puedo ingresar un número
  ('v1', 'a'); -- es no numérica, puedo ingresar un texto 
  
select * from variables_opciones; -- el campo no_numerico se llena solo  
  
do $do$
begin
  insert into variables_opciones values 
    ('n1', 'a');
  raise 'debio fallar';
exception
  when foreign_key_violation then
    raise notice 'ok, veo que no permite ingresar un texto en una opción numérica';
end;
$do$