const axios = require('axios')
const bot = require('./bot')
const config = require('./config.json')

exports.welcomeMessage = config.welcoming_message

function checkIfCommandBanned(name) {
  for(let i in config.disabled_commands) {
    if (i === name.toString()) {
      return true;
    }
  }
  return false;
}
exports.checkIfCommandBanned = checkIfCommandBanned


exports.helpCommand = function (username, args) {
  return checkIfCommandBanned(exports.helpCommand) ? '' : config.static_text.help_command;
}


exports.reportCommand = function (username, args) {
  if (args.length < 2) {
    return 'Please, do ?report <name> <reason>'
  }
  return checkIfCommandBanned(exports.reportCommand) ? '' : config.static_text.report_command.replace("{player}", args[0]).replace("{reason}", args.slice(1).join(' '))
}


exports.discordCommand = function (username, args) {
  return checkIfCommandBanned(exports.discordCommand) ? '' : config.static_text.discord_command.replace("{link}", config.discord.discord_link)
}


exports.pingCommand = function (username, args) {
  if (args.length >= 1) username = args[0]
  const players = bot.getPlayers()

  // lmfao what how does this work and if it does why is it so inefficient
  for (let player in players) {
    if (player === username) {
      return checkIfCommandBanned(exports.pingCommand) ? '' : config.static_text.ping_command_online.replace("{username}", username).replace("{ping}", players[player].ping)
    }
  }
  return checkIfCommandBanned(exports.pingCommand) ? '' : config.static_text.ping_command_offline.replace("{username}", username)
}

exports.randomFact = function () {
  return new Promise(resolve => {
    axios.get('https://uselessfacts.jsph.pl/random.json?language=en').then(response => {
      resolve(checkIfCommandBanned(exports.randomFact) ? '' : config.static_text.random_fact.replace("{fact}", response.data.text))
    })
  })
}


function get_neko(type) {
  return new Promise(resolve => {
    axios.get('https://nekobot.xyz/api/image?type=' + type).then(response => {
      resolve(response.data.message)
    });
  })
}

//TODO: insert this text into config so it'd be changeable
exports.nekoCommand = function (username, args) {
  return new Promise(resolve => {
    if (checkIfCommandBanned(exports.nekoCommand)) {
      resolve('')
    }
    let pre_message;
    let type = args[0]
    if (type !== "hentai") {
      type = 'neko'
      pre_message = "Here's your neko, sir (you can also do ?neko hentai)! "
    }
    get_neko(type).then((link)=>{
      if (!pre_message) {
        resolve("Here's your hentai neko, sir: " + link)
      } else {
        resolve(pre_message + link)
      }
    })
  })
}
