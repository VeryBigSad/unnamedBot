const commands = require('./commands.js')
const database = require('./database.js')
const Discord = require('./discord.js')
const playtimecache = require('./caches/playtimecache.js')
const cacheManager = require('./caches/cachemanager.js')
const totallogincache = require('./caches/totallogincache.js')
const botManager = require('./bot.js')
const cmdhandler = require('./commandhandler.js')
const config = require('./config.json')

let isConnected = false
let curr_conn_test_interval = null

function startConnectionTestInterval(bot) {
  if (curr_conn_test_interval != null) {
    clearInterval(curr_conn_test_interval)
  }
  curr_conn_test_interval = setInterval(() => {
    if (!isConnected) {
      botManager.login()
    }
    connectionTest(bot)
  }, 3000)

}

exports.bind = (bot) => {
  connectionTest(bot)
  startConnectionTestInterval(bot)
  internalBind(bot)
}

function internalBind (bot) {
  // Kills all intervals running (hopefully)
  // let killId = setInterval(() => {}, 10000)
  // for (let i = killId; i > 0; i--) clearInterval(i)
  // console.log('Killed all the intervals currently alive')
  // console logging
  bot.on('message', function (jsonMsg) {
    let time = new Date()
    console.log('[' + time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds() + '] ' + jsonMsg)
  })

  let lastTimeUsed = 0;
  // Command management
  bot.on('chat', function (username, message) {
    if (username === bot.username) return

    if (message[0] === config.prefix) {
      if (Date.now() - lastTimeUsed <= config.commandInterval * 1000) return
      lastTimeUsed = Date.now()
      cmdhandler.commandHandler(username, message).then(toSend => {
        if (toSend !== null ) {
          bot.chat(toSend)
        }
      })

    } else {
      cmdhandler.messageHandler(username, message)
    }
  })

  // kicked event
  bot.on('kicked', function (reason) {
    Discord.sendMessage(`BOT HAD BEEN KICKED FOR ` + reason["text"] + ' :crab:')
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
        await botManager.sleep((Math.random() * config.spammer.min_spam_wait * 1000) + config.spammer.random_time_max * 1000).then(async function () {
          let randomIndex
          if (botManager.getPlayers().length >= 3) {
            randomIndex = Math.floor(Math.random() * (spamMessages.length - 1))
            if (Math.random() <= config.spammer.fact_chance) {
              bot.chat(commands.randomFact())
              return
            }
            bot.chat(spamMessages[randomIndex])
          }
      })
    }
  }, 10)

  // playtime and database handlers
  setTimeout(async () => {
    setInterval(async function () {
      for (let player in bot.players) {
        playtimecache.addToCacheValue(player, 1)
      }
    }, 1000)
  }, 1000)

  setTimeout(() => {
    setInterval(async function () {
      cacheManager.dumpCache()
    }, config.cacheDumpFrequency * 60 * 1000)
  }, 25000)

  //player join handler
  bot.on('playerJoined', (player) => {
    database.checkuser(player.username)
    let logins = totallogincache.getCacheValue(player)
    if (logins == undefined || logins == 0) {
      // TODO: pretty sure its bugged, fix it
      totallogincache.setCacheValue(player.username, 1)
    }
    database.getFirstlogin(player.username, (result) => {
      if (result === null || result === 0)
        database.setFirstlogin(player.username, Date.now())
    })
    totallogincache.addToCacheValue(player.username, 1)
    database.setLastlogin(player.username, Date.now())
  })

  console.log('Event binding done!')

}

// check if player is acctualy connected to the server
function connectionTest (bot) {
  isConnected = bot.player !== undefined;
}
