/**
 * Message flash handler.
 *
 * @param {Object} request
 *   The request.
 * @param {Object} response
 *   The response.
 * @param {Function} next
 *   The callback.
 */
const flash = (request, response, next) => {
  if (request.session.flash) {
    response.locals.flash = request.session.flash
    request.session.flash = undefined
  }

  /**
   *
   * @param {String} content
   *   The message.
   * @param {String} type
   *   The type: success or danger.
   */
  request.flash = (content, type = 'success') => {
    if (request.session.flash === undefined) {
      request.session.flash = []
    }

    request.session.flash.push({ content, type })
  }

  next()
}

export default flash
