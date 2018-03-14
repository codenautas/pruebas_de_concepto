drop schema if exists test_multi_add cascade;
create schema test_multi_add;
set search_path = test_multi_add;

create table growing_table(
  id serial primary key,
  factor double precision,
  adder double precision,
  field_0 double precision
);

insert into growing_table(id, factor, adder, field_0) values
  (1, 1  , 1, 0),
  (2, 1.1, 0, 1),
  (3, 0.9, 1, 1);

create function grow_table(p_max integer) returns text
  language plpgsql
as
$body$
declare
  i integer:=1;
  v_sql text;
  v_new_col text;
  v_del_col text;
begin
  for i in 1..p_max loop
    v_new_col:=quote_ident('field_'||i);
    v_del_col:=quote_ident('field_'||i-1);
    execute 'alter table growing_table add column '||v_new_col||' double precision';
    execute 'update growing_table set '||v_new_col||'='||v_del_col||'*factor+adder';
    execute 'alter table growing_table drop column '||v_del_col;
  end loop;
  return 'ok';
end;
$body$;

/* RUNS ok
select grow_table(10);
select * from growing_table;
-- */

select grow_table(2000);
select * from growing_table;
