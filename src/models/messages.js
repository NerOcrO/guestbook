import Debug from 'debug'
import { format, distanceInWordsToNow } from 'date-fns'
import connection from '../config/connection'

const debug = Debug('gb')

/**
 * Message class.
 */
class Message {
  constructor(row) {
    this.row = row
    this.displayCreated = format(this.created, 'MMMM Do YYYY, h:mm:ss a')
    this.displayFromNow = distanceInWordsToNow(this.created, new Date())
  }

  get mid() {
    return this.row.mid
  }

  get created() {
    return this.row.created * 1000
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
  static async create(message, callback) {
    await connection('messages').insert({ content: message, created: Message.getTimestamp() })

    try {
      callback()
    }
    catch (error) {
      debug(error)
    }
  }

  /**
   * Load all the message.
   *
   * @param {Function} callback
   *   Callback.
   */
  static async loadAll(callback) {
    const results = await connection.select('*').from('messages').orderBy('created', 'desc')

    try {
      callback(results.map(result => new Message(result)))
    }
    catch (error) {
      debug(error)
    }
  }

  /**
   * Load a message.
   *
   * @param {Integer} mid
   *   Message identifier.
   * @param {Function} callback
   *   Callback.
   */
  static async load(mid, callback) {
    const result = await connection.select('*').from('messages').where('mid', '=', mid)

    try {
      if (result.length === 0) {
        callback([])
      }
      else {
        callback(new Message(result[0]))
      }
    }
    catch (error) {
      debug(error)
    }
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
  static async update(mid, message, callback) {
    await connection('messages').update({ content: message }).where('mid', '=', mid)

    try {
      callback()
    }
    catch (error) {
      debug(error)
    }
  }

  /**
   * Delete a message.
   *
   * @param {Integer} mid
   *   Message identifier.
   * @param {Function} callback
   *   Callback.
   */
  static async delete(mid, callback) {
    const result = await connection('messages').where('mid', '=', mid).del()

    try {
      callback(result)
    }
    catch (error) {
      debug(error)
    }
  }
}

export default Message
