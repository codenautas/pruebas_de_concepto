create table "contratos" (
 "contract_id" integer,
 "employee_id" integer,
 "start_date" character varying(10),
 "end_date" character varying(10),
 primary key ("contract_id")
);

insert into "contratos" ("contract_id", "employee_id", "start_date", "end_date") values
 ( 40, 1234, '2005-06-01', '2009-06-01'),
 ( 45, 1234, '2009-06-01', null        ),
 ( 60, 5678, '2006-03-01', '2010-03-01'),
 (100, 5678, '2010-03-01', null        ),
 (458, 9012, '2015-10-01', '2016-10-01'),
 (500, 9012, '2016-10-01', null        );