if (process.argv.length < 3 || process.argv.length > 6) {
  console.log('Usage: node bot.js [-flag1, -flag2] <host> <port> [<name>] [<password>]')
  process.exit(1)
}
const bindManager = require('./bindManager')
const config = require('./config.json')
const Discord = require('./discord')
const mineflayer = require('mineflayer')
const DBInterface = require('./DBInterface')


console.log("Starting up!")

let flags = []

for (let i in process.argv) {
  if (i[0] === '-' && i.length >= 1) {
    flags.push(i)
  } else {
    process.argv.slice(flags.length)
    break;
  }
}

let options = {
  username: process.argv[4] ? process.argv[4] : 'testbot',
  verbose: true,
  port: parseInt(process.argv[3]),
  host: process.argv[2],
  password: process.argv[5] ? process.argv[5] : undefined,
  auth: flags.includes('-microsoft') ? 'microsoft' : 'mojang'
}

exports.login = () => {
  console.log("Trying to log in...")
  exports.bot = mineflayer.createBot(options)
  // this.bot = exports.bot

  setTimeout(()=>{
    // Discord.bindDiscord(this.bot)
    exports.sendMessage = (message) => {
      this.bot.chat(message)
    }
    bindManager.bind(this.bot)
    this.bot.chat(config.welcoming_message)
    this.waitforrelog()
  }, 2000)
}

// process.on('uncaughtException', function (err) {
//   console.log(err)
  // Discord.sendMessage(`Bot has encountered an error: ` + String(err))
// })

process.on('exit', function (code) {
  // pretty sure this makes the thing inescapable but whatever
  console.log(code)
})

exports.sendMessage = (text) => {
  this.bot.chat(text)
}

exports.getPlayers = () => {
  return this.bot.players
}

exports.sleep = (time) => {
  return new Promise((resolve) => setTimeout(resolve, time))
}

exports.waitforrelog = async () => {
}


exports.dbi = new DBInterface.DBInterface();
this.login()

