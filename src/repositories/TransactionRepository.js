const knex = require("../db/connection");

async function getClientByCpf(cpf) {
  const client = await knex("clientes")
    .where({
      cpf,
    })
    .first();

  return client;
}

async function updateBalance({ clientId, value }) {
  return await knex("clientes").where("id", clientId).update("saldo", value);
}

async function createTransaction({
  clientId,
  type,
  value,
  description,
  option = 0,
}) {
  let date = new Date();
  await knex("transactions").insert({
    cliente_id: clientId,
    date_transaction: `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`,
    hora: `${
      String(date.getHours()).length === 1
        ? "0" + date.getHours()
        : date.getHours()
    }:${
      String(date.getMinutes()).length === 1
        ? "0" + date.getMinutes()
        : date.getMinutes()
    }:${
      String(date.getSeconds()).length === 1
        ? "0" + date.getSeconds()
        : date.getSeconds()
    }`,
    type_transaction: type,
    opcao: option,
    valor: value,
    description,
  });
}

async function getAllTransactionsByCpf(cpf) {
  const transactions = await knex("transactions")
    .join("clientes", "transactions.cliente_id", "=", "clientes.id")
    .where("clientes.cpf", cpf)
    .select(
      "clientes.name",
      "clientes.cpf",
      "clientes.saldo",
      "transactions.*"
    );

  return transactions;
}

async function getTransactionsByType({ clientId, type }) {
  const transactions = await knex("transactions")
    .join("clientes", "transactions.cliente_id", "=", "clientes.id")
    .where({
      type_transaction: type,
      cliente_id: clientId,
    })
    .select(
      "clientes.name",
      "clientes.cpf",
      "clientes.saldo",
      "transactions.*"
    );

  return transactions;
}

module.exports = {
  getClientByCpf,
  updateBalance,
  createTransaction,
  getAllTransactionsByCpf,
  getTransactionsByType
};