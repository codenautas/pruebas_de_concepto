create user test_user password 'test_pass';
create database test_db owner test_user;

create schema test_trans;
alter schema test_trans owner to test_user;

create table test_trans.table1(
  id integer primary key,
  text1 text check (text1<>'invalido')
);
  
alter table test_trans.table1 owner to test_user;
