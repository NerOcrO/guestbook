import fs from 'fs'
import { join } from 'path'

const database = JSON.parse(fs.readFileSync(join(__dirname, 'database-local.json'), 'utf8'))

database.connection.database = 'guestbook'
database.connection.debug = process.env.DEBUG === 'gb'

const connection = require('knex')(database)

connection('messages')
  .catch((error) => {
    if (error.code === 'ER_BAD_DB_ERROR') {
      console.log('[Guestbook] Install your database before, see the README')
    }
  })

export default connection
