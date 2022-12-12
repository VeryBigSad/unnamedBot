const database = require('./database.js');
const botManager = require('./bot.js');
const handlers = require('./handlers.js');
const config = require('./config.json');
const utils = require("./utils");

let isConnected = false

exports.bind = (bot) => {
  internalBind(bot)
}

function internalBind(bot) {
  // Command management
  let lastTimeUsed = 0;
  bot.on('chat', function (username, message) {
    let time = new Date()
    console.log('[' + time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds() + '] <' + username + '> ' + message)
    if (username === bot.username) return

    if (message[0] === config.prefix) {
      // TODO: make it so that not only 1-letter prefixes are allowed.
      if (Date.now() - lastTimeUsed <= config.commandInterval * 1000) return
      lastTimeUsed = Date.now()
      handlers.commandHandler(username, message, bot.chat)

    } else {
      handlers.messageHandler(username, message)
    }
  })

  // kicked event
  bot.on('kicked', function (reason) {
    // Discord.sendMessage(`BOT HAD BEEN KICKED FOR ` + reason["text"] + ' :crab:')
    let time = new Date()
    console.log('[' + (String(time.getHours()).length === 1 ? "0" + String(time.getHours()) : time.getHours()) + ':' +
      (String(time.getMinutes()).length === 1 ? "0" + String(time.getMinutes()) : time.getMinutes()) + ':' +
      (String(time.getSeconds()).length === 1 ? "0" + String(time.getSeconds()) : time.getSeconds()) + '] Bot has been kicked!')
    isConnected = false
  })

  // spam messages
  const spamMessages = config.spammer.messages

  // spammer
  setTimeout(async function () {
    while (true) {
      await utils.sleep(config.spammer.min_spam_wait * 1000 + Math.random() * (config.spammer.max_spam_wait - config.spammer.min_spam_wait) * 1000).then(async function () {
        let randomIndex
        if (bot.players.length >= 3) {
          randomIndex = Math.floor(Math.random() * (spamMessages.length - 1))
          bot.chat(spamMessages[randomIndex])
        }
      })
    }
  }, 10)

  // playtime and database handlers
  setTimeout(async () => {
    setInterval(async function () {
      for (let player in bot.players) {
        if (player !== bot.username) {
          database.addPlaytime(player, 30)
        }
      }
    }, 30000)
  }, 1000)

  //player join handler
  bot.on('playerJoined', (player) => {
    botManager.dbi.createOrIgnoreUser(player.username)
    database.addTotalLogins(player.username, 1)
    database.setLastLogin(player.username, Date.now())
  })

  console.log('Event binding done!')
}
