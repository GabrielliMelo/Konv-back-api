//Conexão
const knex = require('knex')({
    client: 'mysql2',
      connection: {
        host: process.env.HOST_DB,
        user: process.env.USER_DB,
        password: process.env.PASSWORD_DB,
        database: process.env.DATABASE
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