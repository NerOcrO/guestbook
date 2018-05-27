import mysql from 'mysql'

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'guestbook',
  debug: process.env.DEBUG === 'gb' ? ['ComQueryPacket', 'RowDataPacket'] : false,
})

connection.connect((error) => {
  if (error) {
    console.error(`[MySQL] Error connecting: ${error.stack}`)
    return
  }

  console.log(`[MySQL] Connected as id ${connection.threadId}`)
})

export default connection
