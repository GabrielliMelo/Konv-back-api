const TransactionRepository = require("../repositories/TransactionRepository");
const AccountService = require("./AccountService");
const accountant = require("../utills/accountant");

async function deposit({ cpf, value_transaction, description }) {
  let clientExists = await TransactionRepository.getClientByCpf(cpf);

  if (!clientExists) {
    clientExists = await AccountService.createAccount({ cpf });
  }

  const { rowCount } = await TransactionRepository.updateBalance({
    clientId: clientExists.id,
    value_transaction: clientExists.balance + value_transaction,
  });

  if (rowCount === 0) {
    throw new Error("Erro ao depositar!");
  }

  await TransactionRepository.createTransaction({
    clientId: clientExists.id,
    type: "deposito",
    value_transaction,
    description,
  });
}

async function withdraw({ cpf, value_transaction, description, option_transaction }) {
  let clientExists = await TransactionRepository.getClientByCpf(cpf);

  if (!clientExists) {
    clientExists = await AccountService.createAccount({ cpf });
  }

  if (clientExists.balance <= 0 || clientExists.balance < value_transaction) {
    throw new Error("Saldo insuficiente!");
  }

  const { rowCount } = await TransactionRepository.updateBalance({
    clientId: clientExists.id,
    value_transaction: clientExists.balance - value_transaction,
  });

  if (rowCount === 0) {
    throw new Error("Erro ao sacar!");
  }

  await TransactionRepository.createTransaction({
    clientId: clientExists.id,
    type: "saque",
    option_transaction,
    value_transaction,
    description,
  });
}

async function extract({ cpf }) {
  let clientExists = await TransactionRepository.getClientByCpf(cpf);

  if (!clientExists) {
    clientExists = await AccountService.createAccount({ cpf });
  }

  const allTransactionsCpf =
    await TransactionRepository.getAllTransactionsByCpf(cpf);

  const transactionswithdraw =
    await TransactionRepository.getTransactionsByType({
      type: "saque",
      clientId: clientExists.id,
    });

  const transactionDeposit = await TransactionRepository.getTransactionsByType({
    type: "deposito",
    clientId: clientExists.id,
  });

  return {
    allTransactionsCpf,
    transactionswithdraw,
    transactionDeposit,
  };
}

function getWithdrawOptions(withdrawValue) {
  return {
    opcoes: [
      {
        opcao: accountant(withdrawValue, 2),
      },
      {
        opcao: accountant(withdrawValue, 3),
      },
      {
        opcao: accountant(withdrawValue, 4),
      },
      {
        opcao: accountant(withdrawValue, 5),
      },
      {
        opcao: accountant(withdrawValue, 6),
      },
      {
        opcao: accountant(withdrawValue, 7),
      },
    ],
  };
}

module.exports = {
  deposit,
  withdraw,
  extract,
  getWithdrawOptions,
};
