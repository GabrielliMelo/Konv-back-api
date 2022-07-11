const knex = require("../db/connection");

async function createAccount({ name, cpf }) {
  const [row] = await knex("clients")
    .insert({
      name,
      cpf,
    })
    
  const clientNow = await knex("clients").select("*").where({id: row}).first();
  return clientNow;
}

module.exports = {
  createAccount,
};