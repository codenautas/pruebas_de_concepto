drop schema if exists test_id cascade;
create schema test_id;

set search_path = test_id;

create table id_generados(
  nomvar text,
  valores jsonb,
  id bigint
);

insert into id_generados values ('ejemplo','null'::jsonb, 1000);

select setseed(0.12312333);

create or replace function generar_id(p_nomvar text, p_valores jsonb) returns bigint
  language plpgsql
as
$BODY$
declare
  v_id bigint;
begin
  select id into v_id
    from id_generados
    where nomvar=p_nomvar  
      and valores=p_valores;
  if v_id is null then
    select max(id) into v_id
      from id_generados
      where nomvar=p_nomvar;
    if v_id is null then
      raise 'No hay primer ID para generar_id de %', p_nomvar;
    else
      while random()<0.2 loop
        v_id:=v_id+10;
      end loop;
      v_id:=v_id+floor((random()*10));
      insert into id_generados(nomvar, valores, id) values (p_nomvar, p_valores, v_id);
    end if;
  end if;
  return v_id;
end;
$BODY$;

select jsonb_build_array(table_catalog, table_schema, table_name, table_type) as valores, 
       generar_id('ejemplo', jsonb_build_array(table_catalog, table_schema, table_name, table_type)) as id
  from information_schema.tables;

select jsonb_build_array(table_catalog, table_schema, table_name, table_type) as valores, 
       generar_id('ejemplo', jsonb_build_array(table_catalog, table_schema, table_name, table_type)) as id
  from information_schema.tables
  where table_name = 'table1';  

select *, lead(id) over (order by id)
  from id_generados;

select siguiente_id-id, count(*)
  from (
    select *, lead(id) over (order by id) siguiente_id
      from id_generados
  ) x
  group by siguiente_id-id
  order by 1;
  