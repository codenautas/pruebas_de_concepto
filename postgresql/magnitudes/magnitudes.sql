-- magnitudes.sql

drop schema if exists magnitudes cascade;
create schema magnitudes;

set search_path = magnitudes;

create type magnitud;

CREATE FUNCTION magnitud_in_function(cstring) RETURNS magnitud 
  LANGUAGE plpgsql AS 
$BODY$
begin
  return null;
end;
$BODY$;

CREATE FUNCTION magnitud_out_function(magnitud) RETURNS cstring 
  LANGUAGE plpgsql AS 
$BODY$
begin
  return null;
end;
$BODY$;

create type magnitud(
    INPUT = magnitud_in_function,
    OUTPUT = magnitud_out_function
);

