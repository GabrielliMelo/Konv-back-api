const express = require('express');

const routes = express();

routes.get('/servidor', (req, res)=>{
    res.status(200).json({message: "Servidor ok!!"})
})

module.exports = routes