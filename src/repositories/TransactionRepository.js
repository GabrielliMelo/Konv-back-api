const knex = require("../db/connection");

async function getClientByCpf(cpf) {
  const client = await knex("clients")
    .where({
      cpf,
    })
    .first();

  return client;
}

async function updateBalance({ clientId, value_transaction }) {
  return await knex("clients").where("id", clientId).update("balance", value_transaction);
}

async function createTransaction({
  clientId,
  type,
  value_transaction,
  description,
  option_transaction = 0,
  cpf_transfer
}) {
  let date = new Date();
  await knex("transactions").insert({
    cliente_id: clientId,
    date_transaction: `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`,
    hour: `${
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
    option_transaction,
    value_transaction,
    description,
    cpf_transfer
  });
}

async function getAllTransactionsByCpf(cpf) {
  const transactions = await knex("transactions")
    .join("clients", "transactions.cliente_id", "=", "clients.id")
    .where("clients.cpf", cpf)
    .select(
      "clients.name",
      "clients.cpf",
      "clients.balance",
      "transactions.*"
    );

  return transactions;
}

async function getTransactionsByType({ clientId, type }) {
  const transactions = await knex("transactions")
    .join("clients", "transactions.cliente_id", "=", "clients.id")
    .where({
      type_transaction: type,
      cliente_id: clientId,
    })
    .select(
      "clients.name",
      "clients.cpf",
      "clients.balance",
      "transactions.*"
    );

  return transactions;
}

module.exports = {
  getClientByCpf,
  updateBalance,
  createTransaction,
  getAllTransactionsByCpf,
  getTransactionsByType,
};