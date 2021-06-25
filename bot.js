if (process.argv.length < 3 || process.argv.length > 5) {
  console.log('Usage: node bot.js <host> <port> [<name>] [<password>]')
  process.exit(1)
}
const database = require('./database')
const bindManager = require('./bindManager')
const config = require('./config.json')
const Discord = require('./discord')
const mineflayer = require('mineflayer')

console.log("Starting up!")

options = {
  username: process.argv[4] ? process.argv[4] : 'testbot',
  verbose: true,
  port: parseInt(process.argv[3]),
  host: process.argv[2],
  password: process.argv[5] ? process.argv[5] : undefined,
}
exports.allowedToRelog = true
exports.login = () => {
  if (this.allowedToRelog) {
    console.log("Trying to log in...")
    this.allowedToRelog = false
    exports.bot = mineflayer.createBot(options)
    this.bot = exports.bot

    setTimeout(()=>{
      Discord.bindDiscord(this.bot)
      exports.sendMessage = (message) => {
        this.bot.chat(message)
      }
      bindManager.bind(this.bot)
      this.bot.chat(config.welcoming_message)
      this.waitforrelog()
    }, 2000)
  } else {
    console.log("Tried to re-log, but didn't since too fast")
  }
}

lastTimeUsed = 0
lastTimeMessage = 0

process.on('uncaughtException', function (err) {
  console.log(err)
  Discord.sendMessage(`Bot has encountered an error: ` + String(err))
})

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
  await this.sleep(1000)
  this.allowedToRelog = true
}


database.init(config.database.ip, config.database.port, config.database.user, config.database.password, 'textlog', 'minedata')
this.login()

