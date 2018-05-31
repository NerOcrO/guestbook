import moment from 'moment'
import connection from '../config/mysql'

/**
 * Message class.
 */
class Message {
  constructor(row) {
    this.row = row
  }

  get mid() {
    return this.row.mid
  }

  get created() {
    return moment(this.row.created * 1000)
  }

  get content() {
    return this.row.content
  }

  static getTimestamp() {
    return Math.floor(Date.now() / 1000)
  }

  /**
   * Create a message.
   *
   * @param {String} message
   *   Message to saved.
   * @param {Function} callback
   *   Callback.
   */
  static create(message, callback) {
    connection.query('INSERT INTO messages SET content = ?, created = ?', [message, Message.getTimestamp()], (error) => {
      if (error) {
        throw error
      }

      callback()
    })
  }

  /**
   * Load all the message.
   *
   * @param {Function} callback
   *   Callback.
   */
  static loadAll(callback) {
    connection.query('SELECT * FROM messages ORDER BY created DESC', (error, results) => {
      if (error) {
        throw error
      }

      callback(results.map(result => new Message(result)))
    })
  }

  /**
   * Load a message.
   *
   * @param {Integer} mid
   *   Message identifier.
   * @param {Function} callback
   *   Callback.
   */
  static load(mid, callback) {
    connection.query('SELECT * FROM messages WHERE mid = ?', [mid], (error, result) => {
      if (error) {
        throw error
      }

      if (result.length === 0) {
        callback([])
      }
      else {
        callback(new Message(result[0]))
      }
    })
  }

  /**
   * Update a message.
   *
   * @param {Integer} mid
   *   Message identifier.
   * @param {String} message
   *   Message to saved.
   * @param {Function} callback
   *   Callback.
   */
  static update(mid, message, callback) {
    connection.query('UPDATE messages SET content = ? WHERE mid = ?', [message, mid], (error) => {
      if (error) {
        throw error
      }

      callback()
    })
  }

  /**
   * Delete a message.
   *
   * @param {Integer} mid
   *   Message identifier.
   * @param {Function} callback
   *   Callback.
   */
  static delete(mid, callback) {
    connection.query('DELETE FROM messages WHERE mid = ?', [mid], (error, result) => {
      if (error) {
        throw error
      }

      callback(result.affectedRows)
    })
  }
}

export default Message
