import { readFileSync, writeFileSync } from 'fs'
import inquirer from 'inquirer'
import { join } from 'path'

const questions = [
  {
    type: 'input',
    name: 'host',
    message: "What's your host?",
  },
  {
    type: 'input',
    name: 'user',
    message: "What's your user?",
  },
  {
    type: 'input',
    name: 'password',
    message: "What's your password?",
  },
]
const createDataBase = async (answers) => {
  const replaceValue = (match, p1, p2, p3) => {
    if (p1) {
      return answers.host
    }
    if (p2) {
      return answers.user
    }
    if (p3) {
      return answers.password
    }
  }
  const database = readFileSync(join(__dirname, 'database-example.json'), 'utf8')
    .replace(/(localhost)|(root)|(azerty)/g, replaceValue)

  writeFileSync(join(__dirname, 'database-local.json'), database)

  const knex = require('knex')(JSON.parse(database))

  try {
    await knex.raw('DROP DATABASE IF EXISTS guestbook')
    await knex.raw('CREATE DATABASE IF NOT EXISTS guestbook')
    await knex.raw('USE guestbook')
    await knex.raw('CREATE TABLE `messages` (`mid` int(10) UNSIGNED NOT NULL, `created` int(11) NOT NULL, `content` longtext NOT NULL) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4')
    await knex.raw('ALTER TABLE `messages` ADD PRIMARY KEY (`mid`), ADD KEY `created` (`created`)')
    await knex.raw('ALTER TABLE `messages` MODIFY `mid` int(10) UNSIGNED NOT NULL AUTO_INCREMENT')
    console.info('Install database OK')
    process.exit()
  }
  catch (error) {
    console.error(error)
  }
}

inquirer
  .prompt(questions)
  .then(createDataBase)
