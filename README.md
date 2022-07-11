# Konv-back-api

## Sobre o projeto

Foi construido o caixa eletrônico do Konv Mini Bank. A aplicação consiste em três aplicacões principais: 
- Depositos
- Saques
- Extratos
## extra
- Transferencias
Projeto seguindo modelo de arquitetura em camadas controller, service e repository, decompondo o projeto para facilitar a compreensão e sua manuntenção, aplicando as boas praticas de clean code.
Todo cpf valido é cadastrado no banco para futuras transações.
Todas transações são salvas no banco de dados com as respectivas informacões:
- Id do cliente
- data 
- hora
- descrição 
- tipo da transação
- opcao de saque
- valor

## Tecnologias utilizadas:

- JavaScript
- NodeJs
- Express
- Knex
- Nodemon
- Yup
- MySQL
- dotenv
- express-async-errors
## Instrucoes para utilizar a api localmente

- Primeiro: clone o repositorio:

```shell
$ git clone git@github.com:GabrielliMelo/Konv-back-api.git
```

- Segundo: va para a pasta src
```
$ cd ./src
```

- Terceiro: instale as dependencias

```shell
$ yarn
```
Or:

```shell
$ npm install
```
## Configurando

Essa aplicação usa o [MySQL](https://www.mysql.com/
) database.

### .env
Nesse arquivo você configura as variaveis de ambiente. Utilize os nomes das keys e coloque os valores referente ao que esta configurado na sua maquina.

|key|description|default
|---|---|---
|PORT|porta| 3008
|USER_DB|user db | -
|PASSWORD_DB|password db | -
|HOST_DB|host db | localhost
|DATABASE| name data base | konv_transactions
## Configurando banco de dados  
- Configure a conexão com o banco de dados, pasta db -> seu user, password e database - konv_transactions.

- Configure o banco de dados colando a query disponivel no arquivo schema.sql (Utilizei o Beekeeper, segunda sugestao: MySQL workbench).

## Usando
Para iniciar a execução do aplicativo:
```
$ yarn dev
```
Or:
```
$ npm run dev
```

- Utilize Insomnia ou Postman (Utilizei o insomnia) para testar as requisicões.

- A aplicação será iniciada na porta 3008

http://localhost:3008/deposit - rota para cadastrar deposito
http://localhost:3008/withdraw - rota para cadastrar saque
http://localhost:3008/extract/:cpf - rota para retornar extrato referente ao cpf 
http://localhost:3008/options/:valor_transaction - rota para retornar opcoes de saque

# Status code

- 200 (success) 😀
- 201 (created) 😀 
- 400 (bad request) 😱

```json
// exemplo de resposta de erro
{
	"message": {
		"status": 400,
		"error": "É necessário informar o valor"
	}
}
```

```
 🚩 NÃO É OBRIGATÓRIO O TOKEN NO HEADER DAS REQUISIÇÕES - AUTENTICAÇÃO NAO NECESSÁRIA!
```

# Endpoints

## Deposito 

## POST: /deposit

**Requisitos:**

- body
  - cpf
  - value_transaction
  - description

```json
// Exemplo de requisição

{
	"cpf": "718.223.498-00",
	"value_transaction": 1500,
	"description":"Testando deposito"
}
```

```js
Exemplo de resposta - Sucesso

{
	status: 200,
	mensagem: "Saque realizado com sucesso!"
}

// erros 

{
	message: "Cpf inválido"
}

{
	message: "o valor Deve ser no mínimo 2 reais"
}

{
	message: "É necessário informar uma descrição"
}

```

## Saque

## POST: /withdraw

**Requisitos:**

- body
  - cpf
  - value_transaction
  - description
  - option_transaction

```json
// Exemplo de requisição

{
	"cpf": "718.223.498-00",
	"value_transaction": 100,
	"option_transaction": 2, 
	"description":"Testando saque"
}
```
```js
// Exemplo de resposta - Sucesso

{
	status: 200,
	mensagem: "Saque realizado com sucesso!"
}

// erros 

{
	message: "Cpf inválido"
}

{
	message: "o valor Deve ser no mínimo 2 reais"
}

{
	message: "opcoes entre 2 - 7"
}

{
	message: "É necessário informar uma descrição"
}
```

## Consulta extrato

## Get: /extract/:cpf

**Requisitos:**

- path variable
  - cpf

```js
// Exemplo de resposta
{
allTransactionsCpf: [
	{
		"name": "teste",
		"cpf": "718.223.498-00",
		"balance": 1200,
		"id": 1,
		"cliente_id": 2,
		"date_transaction": "2022-06-10T03:00:00.000Z",
		"hour": "13:23:04",
		"description": "mm",
		"type_transaction": "deposito",
		"option_transaction": 0,
		"value_transaction": 1500,
		"cpf_transfer": null
	},
	{
		"name": "teste",
		"cpf": "718.223.498-00",
		"balance": 1200,
		"id": 2,
		"cliente_id": 2,
		"date_transaction": "2022-06-10T03:00:00.000Z",
		"hour": "13:23:08",
		"description": "Texto qualquer",
		"type_transaction": "saque",
		"option_transaction": 2,
		"value_transaction": 100,
		"cpf_transfer": null
	},
	{
		"name": "teste",
		"cpf": "718.223.498-00",
		"balance": 1200,
		"id": 3,
		"cliente_id": 2,
		"date_transaction": "2022-06-10T03:00:00.000Z",
		"hour": "14:24:52",
		"description": "Texto qualquer",
		"type_transaction": "saque",
		"option_transaction": 2,
		"value_transaction": 100,
		"cpf_transfer": null
	},
	{
		"name": "teste",
		"cpf": "718.223.498-00",
		"balance": 1200,
		"id": 4,
		"cliente_id": 2,
		"date_transaction": "2022-06-10T03:00:00.000Z",
		"hour": "14:25:02",
		"description": "Texto qualquer",
		"type_transaction": "saque",
		"option_transaction": 2,
		"value_transaction": 100,
		"cpf_transfer": null
	}
],
transactionswithdraw: [
	{
		"name": "teste",
		"cpf": "718.223.498-00",
		"balance": 1200,
		"id": 2,
		"cliente_id": 2,
		"date_transaction": "2022-06-10T03:00:00.000Z",
		"hour": "13:23:08",
		"description": "Texto qualquer",
		"type_transaction": "saque",
		"option_transaction": 2,
		"value_transaction": 100,
		"cpf_transfer": null
	},
	{
		"name": "teste",
		"cpf": "718.223.498-00",
		"balance": 1200,
		"id": 3,
		"cliente_id": 2,
		"date_transaction": "2022-06-10T03:00:00.000Z",
		"hour": "14:24:52",
		"description": "Texto qualquer",
		"type_transaction": "saque",
		"option_transaction": 2,
		"value_transaction": 100,
		"cpf_transfer": null
	},
	{
		"name": "teste",
		"cpf": "718.223.498-00",
		"balance": 1200,
		"id": 4,
		"cliente_id": 2,
		"date_transaction": "2022-06-10T03:00:00.000Z",
		"hour": "14:25:02",
		"description": "Texto qualquer",
		"type_transaction": "saque",
		"option_transaction": 2,
		"value_transaction": 100,
		"cpf_transfer": null
	}
],
transactionDeposit: [
	{
		"name": "teste",
		"cpf": "718.223.498-00",
		"balance": 1200,
		"id": 1,
		"cliente_id": 2,
		"date_transaction": "2022-06-10T03:00:00.000Z",
		"hour": "13:23:04",
		"description": "mm",
		"type_transaction": "deposito",
		"option_transaction": 0,
		"value_transaction": 1500,
		"cpf_transfer": null
	}
]
}

// erro 

{
	message: "Cpf inválido"
}
```

## Opções de saque

## GET: /options/:withdrawValue

**Requisitos:**

- path variable
  - withdrawValue

 Exemplo de resposta
```js
{
opcoes: [
{
  opcao: " 69 nota(s) de R$ 2,00 | OPÇÃO INDISPONIVEL Em Falta R$1,00 ----------- | "
},
{
  opcao: " 27 nota(s) de R$ 5,00,\n 2 nota(s) de R$ 2,00"
},
{
  opcao: " 13 nota(s) de R$ 10,00, 1 nota(s) de R$ 5,00, 2 nota(s) de R$ 2,00"
},
{
  opcao: " 6 nota(s) de R$ 20,00, 1 nota(s) de R$ 10,00, 1 nota(s) de R$ 5,00, 2 nota(s) de R$ 2,00"
},
{
  opcao: " 2 nota(s) de R$ 50,00, 1 nota(s) de R$ 20,00, 1 nota(s) de R$ 10,00, 1 nota(s) de R$ 5,00, 2 nota(s) de R$ 2,00"
},
{
  opcao: " 1 nota(s) de R$ 100,00, 0 nota(s) de R$ 50,00, 1 nota(s) de R$ 20,00, 1 nota(s) de R$ 10,00, 1 nota(s) de R$ 5,00, 2 nota(s) de R$ 2,00"
}
	]
}
```
## Pontos de melhoria
- Testes automatizados.
- Autenticação.
- Apresentação das tabelas dos tipos de transações separadas.
- Utilizar o Migrations para versionamento do banco de dados.
- Utilizar variaveis de ambiente.


## extra
- Rota de transferencias.
## Desenvolvedora 

``` js
{
nome: "Gabrielli Melo da silva Borges",
Idade: 23,
Nivel Atual: "Júnior",
Competências: [
	"HTLM", "CSS","JavaScript", "NodeJs", 
	"ReactJs", "Java", "Spring Boot", 
	"Docker", "AWS", "PostgreSQL", 
	"MySQL", "Redis", "API Rest", 
	"Scrum", "Kanbam", "Git/GitFlow"
],
Habilidades: [
	"Comunicação", "Empatia", "Trabalho em equipe", 
	"Positividade", "Proatividade", 
	"Resolução de problemas", "...etc"
],
Linkdln: "https://www.linkedin.com/in/gabriellimeloborges/",
GitHub: "https://github.com/GabrielliMelo/"
}
```
