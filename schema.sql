
CREATE DATABASE konv_transactions;
drop table clientes
drop table transactions

create table clientes (
  	id serial primary key,
  	name text not null,
    password text not null,
	cpf VARCHAR(15) unique not null,
  	saldo integer DEFAULT 0 not null
  );
  
create table transactions (
  	id serial primary key,
    cliente_id BIGINT UNSIGNED not null,
  	date_transaction date not null,
  	hora text not null,
  	description text not null,
    type_transaction text not null,
	opcao integer DEFAULT '0' not null,
  	valor BIGINT DEFAULT 0 not null,
    CONSTRAINT FK_cliente_id FOREIGN KEY (cliente_id)REFERENCES clientes(id)
 );  

delete from transactions





