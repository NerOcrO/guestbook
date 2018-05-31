import Debug from 'debug'
import mysql from 'mysql'

const debug = Debug('gb')

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'guestbook',
  debug: process.env.DEBUG === 'gb' ? ['ComQueryPacket', 'RowDataPacket'] : false,
})

connection.connect((error) => {
  if (error) {
    debug(`[MySQL] Error connecting: ${error.stack}`)
    return
  }

  debug(`[MySQL] Connected as id ${connection.threadId}`)
})

export default connection
