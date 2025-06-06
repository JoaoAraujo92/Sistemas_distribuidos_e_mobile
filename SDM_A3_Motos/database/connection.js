const knex = require('knex')

const connection = knex({
  client: 'mysql',
  connection: {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sdm_a3_motos'
  }
})

module.exports = connection