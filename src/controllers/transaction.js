        const knex = require("../db/connection");
        const isValidCPF = require("../utills/isValidCPF")
        const validacoes = require("../utills/validacoes")
        const accountant = require("../utills/accountant")

        async function deposit(req, res) {
            const {
                cpf,
                valor,
                description
            } = req.body;

            try {
                
                if (!cpf) {
                    return res.status(400).json({
                        mensagem: 'Preencha o cpf!'
                    });
                }
            
                if (!description) {
                    return res.status(400).json({
                        mensagem: 'Preencha a descricao!'
                    });
                }
            
                if (valor <= 0 || !valor) {
                    return res.status(400).json({
                        mensagem: 'Valor de deposito invalido!',
                    });
                }

                if (isValidCPF(cpf)) {

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
                    } = await knex('clientes').where('id', verificarCPFExiste.id).update('saldo', verificarCPFExiste.saldo + valor);

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
                        hora: `${String(date.getHours()).length === 1? "0" + date.getHours() : date.getHours()}:${String(date.getMinutes()).length === 1? "0" + date.getMinutes() : date.getMinutes()}: ${String(date.getSeconds()).length === 1? "0" + date.getSeconds() : date.getSeconds()}`,
                        type_transaction: "deposito",
                        valor,
                        description
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
                valor,
                type_transaction,
                date_transaction,
                opcao,
                description
            } = req.body;

            try {
                if (!cpf) {
                    return res.status(400).json({
                        mensagem: 'Preencha o cpf!'
                    });
                }
            
                if (!description) {
                    return res.status(400).json({
                        mensagem: 'Preencha a descricao!'
                    });
                }
            
                if (valor <= 0 || !valor) {
                    return res.status(400).json({
                        mensagem: 'Valor de deposito invalido!',
                    });
                }

                if (!opcao) {
                    return res.status(400).json({
                        mensagem: 'Escolha uma opcao!',
                    });
                }
                if (!isValidCPF(cpf)) {
                    res.status(404).json({
                        status: 404,
                        message: "cpf invalido!"
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

                if (verificarCPFExiste.saldo <= 0 || verificarCPFExiste.saldo < valor) {
                    return res.status(404).json({
                        status: 400,
                        mensagem: 'Saldo insuficiente!'
                    });
                }

                const {
                    rowCount
                } = await knex('clientes').where('id', verificarCPFExiste.id).update('saldo', verificarCPFExiste.saldo - valor);

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
                    hora: `${date.getHours()}:${date.getMinutes()}:${String(date.getSeconds()).length === 1? "0" + date.getSeconds() : date.getSeconds()}`,
                    opcao,
                    valor,
                    description,
                    type_transaction: "saque",
                });

                return res.json({
                    status: 200,
                    mensagem: 'Saque realizado com sucesso!'
                });
                
            } catch (error) {
                return res.json(error.message);
            }
        }

        async function extract(req, res) {
            
            const {
                cpf
            } = req.params;

            try {
                if (isValidCPF(cpf)) {

                    const verificarCPFExiste = await knex('clientes').where({
                        cpf
                    }).first();

                    if(!verificarCPFExiste){
                        throw new Error("Cpf nao cadastrado")
                    }

                    const allTransactionsCpf = await knex('transactions')
                        .join('clientes', 'transactions.cliente_id', '=', 'clientes.id')
                        .where('clientes.cpf', cpf)
                        .select('clientes.name', 'clientes.cpf', 'clientes.saldo', 'transactions.*');

                    const transactionswithdraw = await knex('transactions')
                        .join('clientes', 'transactions.cliente_id', '=', 'clientes.id')
                        .where({
                            type_transaction: 'saque',
                            cliente_id: `${verificarCPFExiste.id}`
                        }).select('clientes.name', 'clientes.cpf', 'clientes.saldo', 'transactions.*')
                        .limit(4);

                    const transactionDeposit = await knex('transactions')
                        .join('clientes', 'transactions.cliente_id', '=', 'clientes.id')
                        .where({
                            type_transaction: 'deposito',
                            cliente_id: `${verificarCPFExiste.id}`
                        }).select('clientes.name', 'clientes.cpf', 'clientes.saldo', 'transactions.*')
                        .limit(4);

                    return res.json({
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
                return res.json(error.message);
            }

        }

        async function options(req, res) {

            let {
                valor_saque
            } = req.params;
            try {

                return res.json({
                    opcoes: [{
                            opcao: accountant(valor_saque, 2)
                        },
                        {
                            opcao: accountant(valor_saque, 3)
                        },
                        {
                            opcao: accountant(valor_saque, 4)
                        },
                        {
                            opcao: accountant(valor_saque, 5)
                        },
                        {
                            opcao: accountant(valor_saque, 6)
                        },
                        {
                            opcao: accountant(valor_saque, 7)
                        },
                    ]
                });

            } catch (error) {
                return res.json(error.message);
            }
        }
        module.exports = {
            deposit,
            withdraw,
            extract,
            options
        }