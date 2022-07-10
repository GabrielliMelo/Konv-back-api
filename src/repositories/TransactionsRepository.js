class TransactionRepository {
  create(createTransactionDto){
    await knex('transactions').insert({
      cliente_id: verificarCPFExiste.id,
      date_transaction: `${date.getFullYear()}:${date.getMonth()}:${date.getDate()}`,
      hora: `${date.getHours()}:${date.getMinutes()}:${String(date.getSeconds()).length === 1? "0" + date.getSeconds() : date.getSeconds()}`,
      opcao,
      valor,
      description,
      type_transaction: "saque",
  });
  }
}

module.exports = new TransactionRepository();