const database = require('../database');
const {timeToText} = require("../utils");
const bot = require('../bot')


this.command_name = ['seen', 'lastseen', 'lastonline']
this.call = function (username, args, callback) {
  if (args.length !== 0) {
    username = args[0];
  } else {
    callback('Do !seen <username>!');
    return;
  }

  for (let pl in bot.getBot().players) {
    if (pl.toLowerCase() === username.toLowerCase()) {
      callback(`${pl} is online right now!`);
      return;
    }
  }

  database.getLastLogin(username, (res) => {
    if (res === null) {
      callback(`I haven\'t seen ${username} yet!`);
    } else {
      callback(`${username} was online ${timeToText(Date.now() / 1000 - res)} ago.`);
    }
  })
};

