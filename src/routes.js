const { Router } = require("express");
const {
  deposit,
  withdraw,
  extract,
  getWithdrawOptions,
} = require("./controllers/transaction");
const validateSchemaMiddleware = require("./middlewares/valideSchemaMiddleware");
const {
  makeDepositSchema,
  makeWithdrawSchema,
  generateExtractSchema,
  getWithdrawOptionsSchema,
} = require("./schemas/schemas");

const routes = Router();

routes.get("/servidor", (req, res) => {
  res.status(200).json({ message: "Servidor ok!!" });
});

routes.post("/deposit", validateSchemaMiddleware(makeDepositSchema), deposit);
routes.post(
  "/withdraw",
  validateSchemaMiddleware(makeWithdrawSchema),
  withdraw
);
routes.get(
  "/extract/:cpf",
  validateSchemaMiddleware(generateExtractSchema),
  extract
);
routes.get(
  "/options/:withdrawValue",
  validateSchemaMiddleware(getWithdrawOptionsSchema),
  getWithdrawOptions
);

module.exports = routes;