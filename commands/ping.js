const bot = require("../bot");


this.command_name = ['ping']
this.call = function (username, args, callback) {
  if (args.length !== 0) {
    username = args[0]
  }
  for (let p in bot.getBot().players) {
    if (p.toLowerCase() === username.toLowerCase()) {
      callback(p + '\'s ping is ' + bot.getBot().players[p].ping + 'ms')
      return;
    }
  }
  callback(username + ' is not online!')
};

