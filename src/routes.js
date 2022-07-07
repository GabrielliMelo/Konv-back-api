const express = require('express');
const {cpfRegister, deposit} = require("./controllers/transaction")

const routes = express();

routes.get('/servidor', (req, res)=>{
    res.status(200).json({message: "Servidor ok!!"})
})

routes.post('/register', cpfRegister);
routes.post('/deposit', deposit);

module.exports = routes