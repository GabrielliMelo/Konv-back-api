const Yup = require("yup");
const isValidCPF = require("../utills/isValidCPF");

exports.makeDepositSchema = Yup.object({
  cpf: Yup.string("Deve ser uma string")
    .min(11, "CPF Deve ter no mínimo 11 caracteres")
    .max(14, "CPF Deve ter no máximop 14 caracteres")
    .required("É necessário informar o cpf")
    .test({
      message: "Cpf inválido",
      test: (value) => isValidCPF(value),
    }),
  value_transaction: Yup.number("Deve ser um número")
    .min(1, "Deve ser no mínimo 1")
    .required("É necessário informar o valor"),
  description: Yup.string("Deve ser uma string").required(
    "É necessário informar uma descrição"
  ),
});

exports.makeWithdrawSchema = Yup.object({
  cpf: Yup.string("Deve ser uma string")
    .min(11, "CPF Deve ter no mínimo 11 caracteres")
    .max(14, "CPF Deve ter no máximop 14 caracteres")
    .required("É necessário informar o cpf")
    .test({
      message: "Cpf inválido",
      test: (value) => isValidCPF(value),
    }),
  value_transaction: Yup.number("Deve ser um número")
    .min(1, "o valor Deve ser no mínimo 2 reais")
    .required("É necessário informar o valor"),
  description: Yup.string("Deve ser uma string").required(
    "É necessário informar uma descrição"
  ),
  option_transaction: Yup.number("Deve ser um número")
    .min(2, "opcoes entre 2 - 7")
    .required({
      status:400,
      error:"É necessário informar o valor"
    }),
});

exports.generateExtractSchema = Yup.object({
  cpf: Yup.string("Deve ser uma string")
    .min(11, "CPF Deve ter no mínimo 11 caracteres")
    .max(14, "CPF Deve ter no máximop 14 caracteres")
    .required("É necessário informar o cpf")
    .test({
      message: "Cpf inválido",
      test: (value) => isValidCPF(value),
    }),
});

exports.getWithdrawOptionsSchema = Yup.object({
  withdrawValue: Yup.number("Deve ser um número")
    .min(2, "Deve ser no mínimo 2")
    .required("É necessário informar o valor"),
});

exports.makeTransferSchema = Yup.object({
  cpf: Yup.string("Deve ser uma string")
    .min(11, "CPF Deve ter no mínimo 11 caracteres")
    .max(14, "CPF Deve ter no máximop 14 caracteres")
    .required("É necessário informar o cpf")
    .test({
      message: "Cpf inválido",
      test: (value) => isValidCPF(value),
    }),
  value_transaction: Yup.number("Deve ser um número")
    .min(1, "Deve ser no mínimo 1")
    .required("É necessário informar o valor"),
  description: Yup.string("Deve ser uma string").required(
    "É necessário informar uma descrição"
  ),
  cpf_transfer: Yup.string("Deve ser uma string")
    .min(11, "CPF Deve ter no mínimo 11 caracteres")
    .max(14, "CPF Deve ter no máximop 14 caracteres")
    .required("É necessário informar o cpf de quem irá receber")
    .test({
      message: "Cpf inválido",
      test: (value) => isValidCPF(value),
    }),
});