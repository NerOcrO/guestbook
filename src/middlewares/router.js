import express from 'express'
import Message from '../models/messages'

const router = express.Router()

// GET request.
router.get('/', (request, response) => {
  Message.loadAll((messages) => {
    response.locals.messages = messages
    response.render('layout', {
      view: 'home',
      title: 'Home',
      csrfToken: request.csrfToken(),
    })
  })
})

router.get('/message/:mid(\\d+)', (request, response) => {
  Message.load(request.params.mid, (message) => {
    if (message.length === 0) {
      response.status(404).render('layout', {
        view: 'error',
        title: 'Error 404',
        error: 'This message does not exist.',
      })
    }
    else {
      response.locals.message = message
      response.render('layout', {
        view: 'message',
        title: 'Message',
      })
    }
  })
})

router.get('/message/:mid(\\d+)/delete', (request, response) => {
  Message.delete(request.params.mid, (message) => {
    if (message) {
      request.flash('The message has been deleted', 'success')
      response.redirect('/')
    }
    else {
      response.status(404).render('layout', {
        view: 'error',
        title: 'Error 404',
        error: 'This message does not exist.',
      })
    }
  })
})

router.get('/message/:mid(\\d+)/update', (request, response) => {
  Message.load(request.params.mid, (message) => {
    if (message.length === 0) {
      response.status(404).render('layout', {
        view: 'error',
        title: 'Error 404',
        error: 'This message does not exist.',
      })
    }
    else {
      response.locals.message = message
      response.render('layout', {
        view: 'form',
        title: 'Your message',
        csrfToken: request.csrfToken(),
      })
    }
  })
})

// POST request.
router.post('/message/:mid(\\d+)/update', (request, response) => {
  if (request.body.message === undefined || request.body.message === '') {
    request.flash('There is no message :(', 'danger')
    response.redirect('/')
  }
  else {
    Message.update(request.params.mid, request.body.message, () => {
      request.flash('The message has been updated :)', 'success')
      response.redirect('/')
    })
  }
})

router.post('/', (request, response) => {
  if (request.body.message === undefined || request.body.message === '') {
    request.flash('There is no message :(', 'danger')
    response.redirect('/')
  }
  else {
    Message.create(request.body.message, () => {
      request.flash('Thank you for your message :)', 'success')
      response.redirect('/')
    })
  }
})

export default router
