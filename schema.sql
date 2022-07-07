CREATE DATABASE konv_transactions;

create table clientes (
  	id serial primary key,
  	name text not null,
    password text not null,
	cpf VARCHAR(15) unique
  );