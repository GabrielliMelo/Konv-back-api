create table clients (
      id serial primary key,
      name text not null,
      cpf VARCHAR(15) unique not null,
      balance integer DEFAULT 0 not null
  );

create table transactions (
  	id serial primary key,
    cliente_id BIGINT UNSIGNED not null,
  	date_transaction date not null,
  	hour text not null,
  	description text not null,
    type_transaction text not null,
	  option_transaction integer DEFAULT '0' not null,
  	value_transaction BIGINT DEFAULT 0 not null,
  	cpf_transfer varchar(15),
    CONSTRAINT FK_cliente_id FOREIGN KEY (cliente_id)REFERENCES clientes(id)
 ); 
 
