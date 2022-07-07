const express = require('express');
const {cpfRegister} = require("./controllers/transaction")

const routes = express();

routes.get('/servidor', (req, res)=>{
    res.status(200).json({message: "Servidor ok!!"})
})

routes.post('/register', cpfRegister);

module.exports = routes