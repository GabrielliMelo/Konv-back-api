        const TransactionService = require("../services/TransactionService");

        async function deposit(req, res) {
            const {
                cpf,
                value_transaction,
                description
            } = req.body;

            await TransactionService.deposit({
                cpf,
                value_transaction,
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

        async function transfer(req, res) {
          await TransactionService.transfer(req.body);

          return res.json({
              status: 200,
              mensagem: "Transferencia realizada com sucesso!",
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

          async function getWithdrawOptions(req, res) {
            let { withdrawValue } = req.params;
          
            const options = TransactionService.getWithdrawOptions(withdrawValue);
          
            return res.json(options);
          }
        
        module.exports = {
            deposit,
            withdraw,
            extract,
            getWithdrawOptions,
            transfer
        }