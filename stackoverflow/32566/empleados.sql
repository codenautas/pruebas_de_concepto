create table "empleados" (
 "employee_id" integer,
 "nombre" character varying(5),
 "apellido" character varying(8),
 "citi_id" integer,
 primary key ("employee_id")
);

insert into "empleados" ("employee_id", "nombre", "apellido", "citi_id") values
 (1234, 'José' , 'Pérez'   , 30),
 (5678, 'Juan' , 'González', 25),
 (9012, 'David', 'López'   ,  1);