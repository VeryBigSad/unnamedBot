if (process.argv.length < 3 || process.argv.length > 6) {
  console.log('Usage: node bot.js [-flag1, -flag2] <host> <port> [<name>] [<password>]')
  process.exit(1)
}
const bindManager = require('./bindManager')
const config = require('./config.json')
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

let bot = null;

exports.login = () => {
  console.log("Trying to log in...")
  bot = mineflayer.createBot(options);

  // wait for 2 seconds to allow for a successful login before we do anything else
  setTimeout(()=>{
    // Discord.bindDiscord(this.bot)
    bindManager.bind(bot)
    bot.chat(config.welcoming_message)
  }, 2000)
}

exports.getBot = function () {
  return bot
}


// process.on('uncaughtException', function (err) {
//   console.log(err)
  // Discord.sendMessage(`Bot has encountered an error: ` + String(err))
// })


exports.dbi = new DBInterface.DBInterface();
this.login()

