begin transaction;
 
drop table if exists pr_1;

create table pr_1(
  id serial primary key,
  value text
);

insert into pr_1 (value) values ('este');

do language plpgsql
$do$
begin
  insert into pr_1 select * from pr_1;
exception
  when unique_violation then -- https://www.postgresql.org/docs/current/static/errcodes-appendix.html
    raise notice 'llave duplicada, esto podia pasar no me molesta';
  when others then  
    raise notice 'codigo % - %',SQLSTATE,SQLERRM;
    raise;
end;
$do$;

commit;

select * from pr_1;