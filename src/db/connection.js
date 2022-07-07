//Conexão
const knex = require('knex')({
    client: 'mysql2',
      connection: {
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'konv_transactions'
      },
      pool: {
         min: 2,
         max: 10 
        },
      migrations:{
        tableName: "knex_migrations"
      }   
    })

    module.exports = knex;