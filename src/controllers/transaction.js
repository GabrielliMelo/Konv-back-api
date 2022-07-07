        const {
            restart
        } = require("nodemon");
        const knex = require("../db/connection");
        const isValidCPF = require("../utills/isValidCPF")

        const cpfRegister = async (req, res) => {
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
                valor_deposito
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

        module.exports = {
            cpfRegister,
            deposit
        }