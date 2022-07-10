# Konv-back-api

# Para utilizar a api
    
    A aplicação será iniciada na porta 3008

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
	"description":"Texto qualquer"
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