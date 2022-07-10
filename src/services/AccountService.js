
async function createAccount({
    name,
    cpf
}) {
    const {
        rowCount
    } = await knex('clientes').insert({
        name,
        cpf,
    });

    if (rowCount === 0) {
        throw new Error("Erro ao cadastrar cpf")
    }
}

module.exports = createAccount;