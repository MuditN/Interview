const { Client } = require('pg');
let config = require('../resource/environment.json');
const client = new Client({
    user:   config.user,
    host:   config.dbHost,
    database:   config.database,
    password:   config.password,
    port:   config.dbPort,
  })

  client.connect()

  module.exports = {
    executeQuery
  };
async function executeQuery(query, values, callback, error){
    console.log(query)
    console.log(values)
    await client.query(query, values).then(result => callback(result)).catch(e => error(e)).then(() => client.end)
}