const config = require('../config.json')

this.command_name = ['report', 'wdr', 'chatreport']
this.call = function (username, args, callback) {
  if (args.length !== 0) {
    username = args[0];
  } else {
    callback(`Do ${config.prefix}wdr <username>`);
    return;
  }
  callback(`Player ${username} had been reported. This will be reviewed ASAP by server staff.`)
};

