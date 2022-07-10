const express = require('express');
const {deposit, withdraw, extract, options } = require("./controllers/transaction")

const routes = express();

routes.get('/servidor', (req, res)=>{
    res.status(200).json({message: "Servidor ok!!"})
})


routes.post('/deposit', deposit);
routes.post('/withdraw', withdraw );
routes.get('/extract/:cpf', extract );
routes.get('/options/:valor_saque', options );

module.exports = routes