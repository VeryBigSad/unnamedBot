const axios = require('axios')
const bot = require('./bot')
const config = require('./config.json')
const neko_bot = require('./neko')

exports.welcomeMessage = 'Hi! I\'m a property of an unnamed group. Use ?help to find out about what I can do!'

exports.helpCommand = function (username, args) {
  return '?discord - discord server; ?quote - your random quote, ?playtime - your playtime, ?jd - joindate; ?fm - your first message, ?seen <player> - when a player was last seen. More commands in discord: ' + config.discord.discord_link
}

exports.reportCommand = function (username, args) {
  if (args.length < 2) {
    return 'Please, do ?report <name> <reason>'
  }
  return 'Reported ' + args[0] + ' for ' + args.slice(1).join(' ') + '! Staff will review this ASAP.'
}

exports.discordCommand = function (username, args) {
  let template = config.spammer.discord_command_message
  template.replace("LINK", config.discord.discord_link)
  return template
}

exports.pingCommand = function (username, args) {
  if (args.length >= 1) username = args[0]
  const players = bot.getPlayers()
  for (let player in players) {
    if (player === username) {
      return 'Ping of ' + username + ' is ' + players[player].ping
    }
  }
  return username + " is not online!"
}

exports.randomFact = function () {
  return new Promise(resolve => {
    axios.get('https://uselessfacts.jsph.pl/random.json?language=en').then(response => {
      resolve('Random fact: ' + response.data.text)
    })
  })
}

exports.nekoCommand = function (username, args) {
  return new Promise(resolve => {
    let type = args[0]
    if (type !== "hentai") {
      type = 'neko'
      var pre_message = "Here's your neko, sir (you can also do ?neko hentai)! "
    }
    neko_bot.get_neko(type).then((link)=>{
      if (!pre_message) {
        resolve("Here's your hentai neko, sir: " + link)
      } else {
        resolve(pre_message + link)
      }
    })
  })
}
