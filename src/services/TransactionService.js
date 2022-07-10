const knex = require("../db/connection");
const TransactionRepository = require("../repositories/TransactionRepository");

async function deposit({ cpf, value, description }) {
  const clientExists = await TransactionRepository.getClientByCpf(cpf);

  if (!clientExists) {
    throw new Error("Cpf nao encontrado no banco de dados!");
  }

  const { rowCount } = await TransactionRepository.updateBalance({
    clientId: clientExists.id,
    value: clientExists.saldo + value,
  });

  if (rowCount === 0) {
    throw new Error("Erro ao depositar!");
  }

  await TransactionRepository.createTransaction({
    clientId: clientExists.id,
    type: "deposito",
    value,
    description,
  });
}

async function withdraw({ cpf, value, description, option }) {
  const clientExists = await TransactionRepository.getClientByCpf(cpf);

  if (!clientExists) {
    throw new Error("Cpf nao encontrado no banco de dados!");
  }

  if (clientExists.saldo <= 0 || clientExists.saldo < value) {
    throw new Error("Saldo insuficiente!");
  }

  const { rowCount } = await TransactionRepository.updateBalance({
    clientId: clientExists.id,
    value: clientExists.saldo - value,
  });

  if (rowCount === 0) {
    throw new Error("Erro ao sacar!");
  }

  await TransactionRepository.createTransaction({
    clientId: clientExists.id,
    type: "saque",
    option,
    value,
    description,
  });
}
module.exports = {
  deposit,
  withdraw
};