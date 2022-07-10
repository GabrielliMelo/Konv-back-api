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
            const { cpf } = req.params;
          
            const { allTransactionsCpf, transactionDeposit, transactionswithdraw } =
              await TransactionService.extract({
                cpf,
              });
          
            return res.json({
              allTransactionsCpf,
              transactionswithdraw,
              transactionDeposit,
            });
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