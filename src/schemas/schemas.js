const Yup = require('yup');

const makeDepositSchema = Yup.object({
  cpf: Yup.string('Deve ser uma string')
          .min(11, 'Deve ter no mínimo 11 caracteres')
          .max(14, 'Deve ter no máximop 14 caracteres')
          .required('É necessário informar o cpf'),
  value: Yup.number('Deve ser um número')
            .min(1, 'Deve ser no mínimo 1')
            .required('É necessário informar o valor'),
  description: Yup.string('Deve ser uma string')
                  .required('É necessário informar uma descrição'),
});

module.exports = {
  makeDepositSchema
}
