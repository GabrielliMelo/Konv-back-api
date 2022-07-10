        const knex = require("../db/connection");
        const isValidCPF = require("../utills/isValidCPF")
        const accountant = require("../utills/accountant")
        const TransactionService = require("../services/TransactionService");

        async function deposit(req, res) {
            const {
                cpf,
                value,
                description
            } = req.body;

            await TransactionService.deposit({
                cpf,
                value,
                description,
            });

            return res.json({
                status: 200,
                mensagem: "Deposito realizado com sucesso!",
            });
        }

        async function withdraw(req, res) {
            await TransactionService.withdraw(req.body);

            return res.json({
                status: 200,
                mensagem: "Saque realizado com sucesso!",
            });
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

                    if (!verificarCPFExiste) {
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