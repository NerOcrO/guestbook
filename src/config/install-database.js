import { readFileSync } from 'fs'
import { join } from 'path'

const database = JSON.parse(readFileSync(join(__dirname, 'database-local.json'), 'utf8'))

const knex = require('knex')(database)

knex.raw('DROP DATABASE IF EXISTS guestbook')
  .then(() => knex.raw('CREATE DATABASE IF NOT EXISTS guestbook'))
  .then(() => knex.raw('USE guestbook'))
  .then(() => knex.raw('CREATE TABLE `messages` (`mid` int(10) UNSIGNED NOT NULL, `created` int(11) NOT NULL, `content` longtext NOT NULL) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4'))
  .then(() => knex.raw('ALTER TABLE `messages` ADD PRIMARY KEY (`mid`), ADD KEY `created` (`created`)'))
  .then(() => knex.raw('ALTER TABLE `messages` MODIFY `mid` int(10) UNSIGNED NOT NULL AUTO_INCREMENT'))
  .then(() => console.log('Install database OK'))
  .then(() => process.exit())
  .catch(error => console.log(error))
