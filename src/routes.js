const { Router } = require("express");
const {
  deposit,
  withdraw,
  extract,
  transfer,
  getWithdrawOptions
} = require("./controllers/transaction");
const validateSchemaMiddleware = require("./middlewares/valideSchemaMiddleware");
const {
  makeDepositSchema,
  makeWithdrawSchema,
  generateExtractSchema,
  getWithdrawOptionsSchema,
  makeTransferSchema
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

routes.post(
  "/transfer",
  validateSchemaMiddleware(makeTransferSchema),
  transfer
);

module.exports = routes;