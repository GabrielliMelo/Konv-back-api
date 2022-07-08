        const knex = require("../db/connection");
        const isValidCPF = require("../utills/isValidCPF")

        async function cpfRegister(req, res) {

            const {
                name,
                cpf,
                password
            } = req.body;

            try {
                if (isValidCPF(cpf)) {
                    const verificarCPFExiste = await knex('clientes').where({
                        cpf
                    }).first();

                    if (verificarCPFExiste) {
                        return res.status(400).json({
                            status: 400,
                            message: "Já existe um cliente com estes dados!"
                        })
                    }

                    const {
                        rowCount
                    } = await knex('clientes').insert({
                        name,
                        cpf,
                        password
                    });


                    if (rowCount === 0) {
                        return res.status(404).json({
                            status: 404,
                            message: "Ocorreu um erro ao cadastrar o cliente!"
                        })
                    }

                    return res.status(201).json({
                        status: 201,
                        message: "cpf cadastrado com sucesso!"
                    });
                }

                res.status(404).json({
                    status: 404,
                    message: "cpf invalido!"
                });


            } catch (error) {
                return res.json(error.message);
            }
        };

        async function deposit(req, res) {
            const {
                cpf,
                valor_deposito,
                hora
            } = req.body;

            try {
                if (isValidCPF(cpf)) {
                    if (!cpf) {
                        return res.status(400).json({
                            status: 400,
                            mensagem: 'Preencha o cpf!'
                        });
                    }

                    if (valor_deposito <= 0 || !valor_deposito) {
                        return res.status(400).json({
                            mensagem: 'Valor de deposito invalido!',
                        });
                    }

                    const verificarCPFExiste = await knex('clientes').where({
                        cpf
                    }).first();

                    if (!verificarCPFExiste) {
                        return res.status(404).json({
                            mensagem: 'Cpf nao encontrado no banco de dados!'
                        });
                    }

                    const {
                        rowCount
                    } = await knex('clientes').where('id', verificarCPFExiste.id).update('saldo', verificarCPFExiste.saldo + valor_deposito);

                    if (rowCount === 0) {
                        return res.status(500).json({
                            status: 500,
                            message: 'Erro ao depositar!'
                        })
                    }
                       
                        let date = new Date()


                    await knex('transactions').insert({
                        cliente_id: verificarCPFExiste.id,
                        date_transaction: `${date.getFullYear()}:${date.getMonth()}:${date.getDate()}`,
                        hora : `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
                        type_transaction: "deposito",
                    });

                    return res.json({
                        status: 200,
                        mensagem: 'Deposito realizado com sucesso!'
                    });
                }
                res.status(404).json({
                    status: 404,
                    message: "cpf invalido!"
                });
            } catch (error) {
                return res.json(error.message);
            }
        }

        async function withdraw(req, res) {
            const {
                cpf,
                cliente_id,
                valor_saque,
                type_transaction,
                date_transaction
            } = req.body;

            try {
                if (isValidCPF(cpf)) {

                    if (!cpf) {
                        return res.status(400).json({
                            status: 400,
                            mensagem: 'Preencha o cpf!'
                        });
                    }

                    if (valor_saque <= 0 || !valor_saque) {
                        return res.status(400).json({
                            status: 400,
                            mensagem: 'Valor de saque invalido!',
                        });
                    }

                    const verificarCPFExiste = await knex('clientes').where({
                        cpf
                    }).first();

                    if (!verificarCPFExiste) {
                        return res.status(404).json({
                            status: 400,
                            mensagem: 'Cpf nao encontrado no banco de dados!'
                        });
                    }

                    if (verificarCPFExiste.saldo <= 0 || verificarCPFExiste.saldo < valor_saque) {
                        return res.status(404).json({
                            status: 400,
                            mensagem: 'Saldo insuficiente!'
                        });
                    }

                    const {
                        rowCount
                    } = await knex('clientes').where('id', verificarCPFExiste.id).update('saldo', verificarCPFExiste.saldo - valor_saque);

                    if (rowCount === 0) {
                        return res.status(500).json({
                            status: 500,
                            message: 'Erro ao sacar!'
                        })
                    }
                    let date = new Date()
                    await knex('transactions').insert({
                        cliente_id: verificarCPFExiste.id,
                        date_transaction: `${date.getFullYear()}:${date.getMonth()}:${date.getDate()}`,
                        hora : `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
                        type_transaction: "deposito",
                    });

                    return res.json({
                        status: 200,
                        mensagem: 'Saque realizado com sucesso!'
                    });
                }
                res.status(404).json({
                    status: 404,
                    message: "cpf invalido!"
                });
            } catch (error) {
                return res.json(error.message);
            }
        }

        async function extract(req, res) {
            const {
                cpf
            } = req.body
            try {
                if (isValidCPF(cpf)) {
                    if (!cpf) {
                        return res.status(400).json({
                            mensagem: 'Obrigatorio informar o cpf!'
                        });
                    }

                    const verificarCPFExiste = await knex('clientes').where({
                        cpf
                    }).first();

                    const allTransactions = await knex('transactions').join('clientes', 'transactions.cliente_id', '=', 'clientes.id').select('clientes.name', 'clientes.cpf', 'clientes.saldo', 'transactions.*');
                   
                    const allTransactionsCpf = await knex('transactions').join('clientes', 'transactions.cliente_id', '=', 'clientes.id').where('clientes.cpf', cpf).select('clientes.name', 'clientes.cpf',  'clientes.saldo','transactions.*');
                    
                    const transactionswithdraw = await knex('transactions')
                        .join('clientes', 'transactions.cliente_id', '=', 'clientes.id')
                        .where({
                            type_transaction: 'saque',
                            cliente_id: `${verificarCPFExiste.id}`
                        }).select('clientes.name', 'clientes.cpf','clientes.saldo', 'transactions.*')
                        .limit(4);

                    const transactionDeposit = await knex('transactions')
                    .join('clientes', 'transactions.cliente_id', '=', 'clientes.id')
                    .where({
                        type_transaction: 'deposito',
                        cliente_id: `${verificarCPFExiste.id}`
                    }).select('clientes.name', 'clientes.cpf','clientes.saldo', 'transactions.*')
                    .limit(4);

                    return res.json({
                        status: 200,
                        allTransactions,
                        allTransactionsCpf,
                        transactionswithdraw,
                        transactionDeposit
                    });
                }

                res.status(404).json({
                    status: 404,
                    message: "cpf invalido!"
                });
            } catch (error) {

            }

        }

        module.exports = {
            cpfRegister,
            deposit,
            withdraw,
            extract
        }