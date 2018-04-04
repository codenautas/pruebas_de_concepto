/*
create user test_user password 'test_pass';
create database test_db owner test_user;
*/

set role to test_user;
drop schema if exists defe cascade;
create schema defe;
set search_path = defe;
 
create table comision(
    id text primary key
);

create table miembros(
    comision text references comision(id),
    miembro text not null,
    sexo text not null check (sexo in ('F','M')),
    primary key (comision, miembro)
);

create or replace function comision_cupo_trg() returns trigger 
  language plpgsql
as
$BODY$
declare
  miembros_f bigint;
  miembros_m bigint;
  miembros bigint;
begin
  select sum(case when sexo='F' then 1 else null end),
         sum(case when sexo='M' then 1 else null end),
         count(*)
    into miembros_f, miembros_m, miembros
    from miembros
    where comision = new.id;
  if miembros=0 then 
    raise 'comision % sin miembros', new.id;
  elsif miembros_f is distinct from miembros_m then
    raise 'comision % no respeta el cupo % F y % M', new.id, miembros_f, miembros_m;
  end if;
  return new;
end;
$BODY$;

create trigger comision_cupo_trg 
  after insert or update on comision DEFERRABLE INITIALLY DEFERRED
  for each row 
  execute procedure comision_cupo_trg();

do
$TEST$
begin
  insert into comision values ('VACIO');
  raise 'DEBIO DAR ERROR POR VACIO' using ERRCODE = 'assert_failure';
exception
  when raise_exception then
    raise NOTICE 'OK VACIO DIO ERROR';
end;
$TEST$;

do
$TEST$
begin
  insert into comision values ('SENADO');
  insert into miembros values ('SENADO', 'AARON', 'M');
  insert into miembros values ('SENADO', 'ABA'  , 'F');
end;
$TEST$;

select * from miembros;

select * from comision;