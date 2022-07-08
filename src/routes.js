const express = require('express');
const {cpfRegister, deposit, withdraw, extract } = require("./controllers/transaction")

const routes = express();

routes.get('/servidor', (req, res)=>{
    res.status(200).json({message: "Servidor ok!!"})
})

routes.post('/register', cpfRegister);
routes.post('/deposit', deposit);
routes.post('/withdraw', withdraw );
routes.get('/extract', extract );

module.exports = routes