# Konv-back-api

## Sobre o projeto

	Projeto seguindo modelo de arquitetura em camadas, decompondo o projeto para facilitar a compreensão e sua manuntenção, seguindo boas praticas para alcançar o clean code. 
	Foi construido o caixa eletrônico do Konv Mini Bank. A aplicação consiste em três aplicacões principais: 
		- Depositos
		- Saques
		- Extratos
			extra:
			  -Transferencias
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
## Instrucoes para utilizar a api localmente
    
	- Clone este repositorio na sua maquina
	- Abra-o (sugestao vsCode) -> code .
	- Instale as dependencias -> No terminal rode npm i
	- Configure a conexão com o banco de dados, pasta db -> seu user, password e database - konv_transactions.
    - Configure o banco de dados colando a query disponivel no arquivo schema.sql (Utilizei o Beekeeper, segunda sugestao: MySQL workbench).
	- Rode no terminal -> cd src ->  npx run .\index.js ou rode no modo dev -> npm run dev.
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

// Exemplo de resposta - Sucesso

{
	"status": 200,
	"mensagem": "Saque realizado com sucesso!"
}

// erros 

{
	"message": "Cpf inválido"
}

{
	"message": "o valor Deve ser no mínimo 2 reais"
}

{
	"message": "É necessário informar uma descrição"
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

// Exemplo de resposta - Sucesso

{
	"status": 200,
	"mensagem": "Saque realizado com sucesso!"
}

// erros 

{
	"message": "Cpf inválido"
}

{
	"message": "o valor Deve ser no mínimo 2 reais"
}

{
	"message": "opcoes entre 2 - 7"
}

{
	"message": "É necessário informar uma descrição"
}
```

## Consulta extrato

## Get: /extract/:cpf

**Requisitos:**

- path variable
  - cpf

```json
// Exemplo de resposta
{
	"allTransactionsCpf": [
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
	"transactionswithdraw": [
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
	"transactionDeposit": [
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
	"message": "Cpf inválido"
}
```

## Opções de saque

## GET: /options/:withdrawValue

**Requisitos:**

- path variable
  - withdrawValue


```json
// Exemplo de resposta

{
	"opcoes": [
		{
			"opcao": "\n 69 nota(s) de R$ 2,00 | OPÇÃO INDISPONIVEL Em Falta R$1,00 ----------- | "
		},
		{
			"opcao": "\n 27 nota(s) de R$ 5,00,\n 2 nota(s) de R$ 2,00"
		},
		{
			"opcao": " 13 nota(s) de R$ 10,00, 1 nota(s) de R$ 5,00, 2 nota(s) de R$ 2,00"
		},
		{
			"opcao": " 6 nota(s) de R$ 20,00, 1 nota(s) de R$ 10,00, 1 nota(s) de R$ 5,00, 2 nota(s) de R$ 2,00"
		},
		{
			"opcao": " 2 nota(s) de R$ 50,00, 1 nota(s) de R$ 20,00, 1 nota(s) de R$ 10,00, 1 nota(s) de R$ 5,00, 2 nota(s) de R$ 2,00"
		},
		{
			"opcao": " 1 nota(s) de R$ 100,00, 0 nota(s) de R$ 50,00, 1 nota(s) de R$ 20,00, 1 nota(s) de R$ 10,00, 1 nota(s) de R$ 5,00, 2 nota(s) de R$ 2,00"
		}
	]
}
```

## Desenvolvedora 

``` json
{
	"nome": "Gabrielli Melo da silva Borges",
	"Idade": "23",
	"Nivel Atual": "Júnior / Pleno",
	"Competências": ["HTLM", "CSS","JavaScript", "NodeJs", "ReactJs", "Java", "Spring Boot", "Docker", "AWS", "PostgreSQL", "MySQL", "Redis", "API Rest", "Scrum", "Kanbam", "Git/GitFlow"],
	"Habilidades": ["Comunicação", "Empatia", "Trabalho em equipe", "Positividade", "Proatividade", "Resolução de problemas", "...etc"],
	"Sobre_mim": "Olá, me chamo Gabrielli Melo, tenho 23 anos e fiz transição de carreira
da engenharia química para programação. Desde pequena apaixonada por jogos e
desenvolvimento de software, mais precisamente desenvolvimento web. Sempre tive
curiosidade em saber como tudo isso funciona por debaixo dos panos e por conta disso
decidi ser uma desenvolvedora. Hoje, após 1 ano na área, venho estudando e me
especializando no ecossistema javascript com foco no desenvolvimento fullStack utilizando nodeJs,
ReactJs, typescript e todas as suas ferramentas. tenho experiência também em
desenvolvimento de apis, utilizando spring boot, e banco de dados PostgreSQL e
MySQL.
"
}
```