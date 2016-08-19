create function throw1e() returns text 
  language plpgsql as 
$body$
begin
  raise 'an error';
end;
$body$;

create function call_with_perform() returns text
  language plpgsql as 
$body$
begin
  perform throw1e();
  return 'all is ok';
end;
$body$;

select call_with_perform();