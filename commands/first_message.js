const database = require('../database.js');
const {timeToText} = require("../utils");


this.command_name = ['fm', 'firstmessage']
this.call = function (username, args, callback) {
  if (args.length !== 0) {
    username = args[0]
  }

  database.getFirstMessage(username, (res) => {
    if (res === null) {
      callback(username + ' haven\'t said anything yet!');
    } else {
      callback(`${username}\'s first words: ${res}`);
    }
  })
};

