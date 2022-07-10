const Yup = require("yup");
const isValidCPF = require("../utills/isValidCPF");

exports.makeDepositSchema = Yup.object({
  cpf: Yup.string("Deve ser uma string")
    .min(11, "Deve ter no mínimo 11 caracteres")
    .max(14, "Deve ter no máximop 14 caracteres")
    .required("É necessário informar o cpf")
    .test({
      message: "Cpf inválido",
      test: (value) => isValidCPF(value),
    }),
  value: Yup.number("Deve ser um número")
    .min(1, "Deve ser no mínimo 1")
    .required("É necessário informar o valor"),
  description: Yup.string("Deve ser uma string").required(
    "É necessário informar uma descrição"
  ),
});

exports.makeWithdrawSchema = Yup.object({
  cpf: Yup.string("Deve ser uma string")
    .min(11, "Deve ter no mínimo 11 caracteres")
    .max(14, "Deve ter no máximop 14 caracteres")
    .required("É necessário informar o cpf")
    .test({
      message: "Cpf inválido",
      test: (value) => isValidCPF(value),
    }),
  value: Yup.number("Deve ser um número")
    .min(1, "Deve ser no mínimo 1")
    .required("É necessário informar o valor"),
  description: Yup.string("Deve ser uma string").required(
    "É necessário informar uma descrição"
  ),
  option: Yup.number("Deve ser um número")
    .min(2, "Deve ser no mínimo 2")
    .required("É necessário informar o valor"),
});