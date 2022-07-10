const AccountRepository = require("../repositories/AccountRepository");

async function createAccount({ name = "teste", cpf }) {
  const account = await AccountRepository.createAccount({ name, cpf });

  if (!account) {
    throw new Error("Erro ao criar conta");
  }

  return account;
}

module.exports = { createAccount };