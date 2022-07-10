require("express-async-errors");
const express = require('express');
const routes = require('./routes');
const cors = require('cors')

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use((error, request, response, next) => {
  console.log(error)

  response.status(400).json({message: error.message})
});

module.exports = app;