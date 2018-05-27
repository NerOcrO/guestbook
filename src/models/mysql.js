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
    return moment(this.row.created)
  }

  get content() {
    return this.row.content
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
    connection.query('INSERT INTO messages SET content = ?', [message], (error) => {
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
    connection.query('SELECT * FROM messages', (error, results) => {
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
