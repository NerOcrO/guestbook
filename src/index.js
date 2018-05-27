'use strict'

import bodyParser from 'body-parser'
import express from 'express'
import session from 'express-session'
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
// No x-powered-by.
app.set('x-powered-by', false)

/**
 * MIDDLEWARES.
 */

// Public directory.
app.use(express.static('public'))
// Body parser (POST).
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// Favicon.
app.use(favicon(join(__dirname, '../public', 'livre-dor.png')))
// Session.
app.use(session({
  secret: 'guestbook nerocro',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
}))
// Message flash handler.
app.use(flash)
// Routing.
app.use(router)

// Listening port.
app.listen(port, () => console.log(`=> http://localhost:${port} !`))
