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

module.exports = {
  deposit,
};