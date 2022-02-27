const bot = require("../bot");


this.command_name = ['ping']
this.call = function (username, args, callback) {
  if (args.length !== 0) {
    username = args[0]
  }
  try {
    callback(username + '\'s ping is ' + bot.getBot().players[username].ping + 'ms')
  } catch (e) {
    callback(username + ' is not online!')
  }
};

