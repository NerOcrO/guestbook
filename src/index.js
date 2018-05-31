'use strict'

import bodyParser from 'body-parser'
import express from 'express'
import session from 'express-session'
import helmet from 'helmet'
import { join } from 'path'
import favicon from 'serve-favicon'
import flash from './middlewares/flash'
import router from './middlewares/router'

const app = express()
const port = process.env.PORT || 8080

// Select of view engine.
app.set('view engine', 'ejs')
// Views directory?
app.set('views', join(__dirname, '/views'))

/**
 * MIDDLEWARES.
 */

// Header protection.
app.use(helmet())
// Public directory.
app.use(express.static('public'))
// Body parser (POST).
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// Favicon.
app.use(favicon(join(__dirname, '../public', 'livre-dor.png')))
// Session.
const sess = {
  secret: 'guestbook nerocro',
  resave: false,
  saveUninitialized: true,
  cookie: {},
}
if (app.get('env') === 'production') {
  app.set('trust proxy', 1)
  sess.cookie.secure = true
}
app.use(session(sess))
// Message flash handler.
app.use(flash)
// Routing.
app.use(router)

// Listening port.
app.listen(port, () => console.log(`=> http://localhost:${port} !`))
