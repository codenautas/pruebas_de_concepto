-- pg-parents

drop schema if exists test_parents cascade;
create schema test_parents;
set search_path = test_parents;

create table with_parent (
  parentid text,
  id text,
  code text,
  name text,
  primary key (id),
  foreign key (parentid) references with_parent (id) on update cascade
);

create or replace function with_parent_id_trg() returns trigger
  language plpgsql as
$body$
begin
  if new.code ~ '\|' then
    raise 'code must not have |';
  end if;
  new.id:=coalesce(new.parentid||'|','')||new.code;
  return new;
end;
$body$;

create trigger with_parent_id_trg 
  before insert or update
  on with_parent
  for each row
  execute procedure with_parent_id_trg();

do language plpgsql  
$do$
declare 
  idEarth text;
  idSA text;
  idUY text;
  idAR text;
  idAR_B text;
  idAR_C text;
begin
  insert into with_parent (code, name) 
    values ('♁', 'Tierra') 
    returning id into idEarth;
  insert into with_parent (parentid, code, name) values (idEarth, 'SA', 'Sud América') returning id into idSA;
  insert into with_parent (parentid, code, name) values (idEarth, 'EU', 'Europa');
  insert into with_parent (parentid, code, name) values (idSA, 'AR', 'Argentina') returning id into idAR;
  insert into with_parent (parentid, code, name) values (idSA, 'UY', 'Uruguay') returning id into idUY;
  insert into with_parent (parentid, code, name) values (idUY, 'M', 'Montevideo');
  insert into with_parent (parentid, code, name) values (idAR, 'B', 'Provincia de Buenos Aires') returning id into idAR_B;
  insert into with_parent (parentid, code, name) values (idAR, 'C', 'Ciudad Autónoma de Buenos Aires') returning id into idAR_C;
  insert into with_parent (parentid, code, name) values (idAR, 'L', 'La Pampa');
  insert into with_parent (parentid, code, name) values (idAR, 'M', 'Mendoza');
end;
$do$;

do language plpgsql  
$test$
declare 
  result text;
  idAR text;
  idMERCOSUR text;
begin
  begin
    insert into with_parent (code) values ('sfdasdf|asdfasdf');
    raise 'must raise an error, must reject |' using ERRCODE = 'assert_failure';
  exception
    when others then
      if sqlstate <> 'P0001' then
        raise;
      end if;
  end;
  select to_json(x.*) into result from with_parent x where name='Earth';
  if result <> '{"parentid":null,"id":"♁","code":"♁","name":"Earth"}' then
    raise 'Not equal %', result;
  end if;
  update with_parent set code = 'AdelS' where code = 'SA';
  select id into idAR from with_parent where code='AR';
  insert into with_parent (parentid, code, name) values ('♁|AdelS', 'MERCOSUR', 'Mercado Común del Sur') returning id into idMERCOSUR;
  update with_parent set parentid = idMERCOSUR where code in ('AR','UY');
end;
$test$;

select *, regexp_replace(id,'[^|]*\|', '  ', 'g')
  from with_parent
  order by id;

