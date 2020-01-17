require('dotenv').config({ path: __dirname + './../.env'})
const { Pool } = require('pg')
const log = require('./logger')

console.log(process.env.PG_HOST)
console.log(process.env.PG_USER)
console.log(process.env.PG_PASSWORD)
console.log(process.env.PG_DATABASE)
console.log(process.env.PG_PORT)
console.log(process.env.PG_SSL)

const pool = new Pool({
    host:       process.env.PG_HOST,
    user:       process.env.PG_USER,
    password:   process.env.PG_PASSWORD,
    database:   process.env.PG_DATABASE,
    port:       process.env.PG_PORT,
    ssl:        process.env.PG_SSL,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  })

  pool.connect().then(() => {
    log.info(`Conectado a la base de datos: ${process.env.PG_DATABASE} en el servidor: ${process.env.PG_HOST}:${process.env.PG_PORT}`)
  }).catch(log.error)

/* 
  pool.end(() => {
    console.log('pool has ended')
  })
 */
  module.exports = {
    pool
  }
  
