#!/usr/bin/env node

'use strict'

const emojis = require('node-emoji')
const inquirer = require('inquirer')
const minimist = require('minimist')
const opts = minimist(process.argv.slice(2))

let emoji = opts.emoji ? emojis.get(opts.emoji) : emojis.random().emoji

async function main () {
  if (!opts.name) {
    const askName = await inquirer.prompt([{
      type: 'input',
      name: 'name',
      message: `Please tell us your name: `,
      default: () => 'world',
      validate: (answer) => answer.length >= 2
    }])

    opts.name = askName.name
  }

  if (opts.emoji && !emojis.hasEmoji(opts.emoji)) {
    console.error(`${opts.emoji} is not a valid emoji, please check https://www.webfx.com/tools/emoji-cheat-sheet/`)
    const askEmoji = await inquirer.prompt([{
      type: 'input',
      name: 'emoji',
      message: `Please input a valid emoji: `,
      default: () => 'earth_americas',
      validate: (emoji) => emojis.hasEmoji(emoji)
    }])

    emoji = emojis.get(askEmoji.emoji)
  }

  const greeting = `${emoji}  Hello ${opts.name}!`

  if (opts.json) {
    console.log(JSON.stringify({
      greeting
    }))
  } else {
    console.log(greeting)
  }
}

main()