const knex = require("../db/connection");

async function createAccount({ name, cpf }) {
  const [row] = await knex("clientes")
    .insert({
      name,
      cpf,
    })
    
  const clientNow = await knex("clientes").select("*").where({id: row}).first();
  return clientNow;
}

module.exports = {
  createAccount,
};