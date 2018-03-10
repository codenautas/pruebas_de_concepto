drop schema if exists test_multi_add cascade;
create schema test_multi_add;
set search_path = test_multi_add;

create table growing_table(
  id integer primary key,
  factor double precision,
  adder double precision,
  field_0 double precision
);

create table dependent_table(
  id_growing integer,
  constraint "dependent from growing" foreign key (id_growing) references growing_table (id)
);


insert into growing_table(id, factor, adder, field_0) values
  (1, 1  , 1, 0),
  (2, 1.01,0, 1),
  (3, 0.9, 1, 1),
  (4, 1.01,-1,1),
  (5, 0.7, 2, 1);

insert into dependent_table select id from growing_table;

create view view_table as
  select id, factor, adder, id+factor+adder as sum_pam
    from growing_table;

create function grow_table(p_max integer) returns text
  language plpgsql
as
$body$
declare
  i integer:=1;
  v_sql text;
  v_new_col text;
  v_del_col text;
  only_once_per_i integer:=0;
begin
  i:=1;
  while i<=p_max loop
    begin
      v_new_col:=quote_ident('field_'||i);
      v_del_col:=quote_ident('field_'||i-1);
      execute 'alter table growing_table add column '||v_new_col||' double precision';
      execute 'update growing_table set '||v_new_col||'='||v_del_col||'*factor+adder';
      execute 'alter table growing_table drop column '||v_del_col;
      i:=i+1;
    exception
      when too_many_columns then
        if only_once_per_i = i then
          raise 'once_per_i %', i;
        end if;
        only_once_per_i:=i;
        raise notice 'altering %',i;
        alter table growing_table rename to renaming_table;
        create table growing_table as select * from renaming_table;
        alter table growing_table add primary key (id);
        drop view view_table;
        alter table dependent_table drop constraint "dependent from growing";
        alter table dependent_table add constraint "dependent from growing" foreign key (id_growing) references growing_table (id);
        create view view_table as
          select id, factor, adder, id+factor+adder as sum_pam
            from growing_table;
        drop table renaming_table;
    end;
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
