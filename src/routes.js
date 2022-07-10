const { Router } = require("express");
const {
  deposit,
  withdraw,
  extract,
  options,
} = require("./controllers/transaction");
const validateSchemaMiddleware = require("./middlewares/valideSchemaMiddleware");
const { makeDepositSchema } = require("./schemas/schemas");

const routes = Router();

routes.get("/servidor", (req, res) => {
  res.status(200).json({ message: "Servidor ok!!" });
});

routes.post("/deposit", validateSchemaMiddleware(makeDepositSchema), deposit);
routes.post("/withdraw", withdraw);
routes.get("/extract/:cpf", extract);
routes.get("/options/:valor_saque", options);

module.exports = routes;