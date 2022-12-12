const database = require('../database.js');
const { timeToText } = require("../utils");


this.command_name = ['playtime', 'pt'];
this.call = function (username, args, send_message_function) {
  if (args.length !== 0) {
    username = args[0]
  }
  database.getPlaytime(username, (res) => {
    if (res === null) {
      send_message_function(`I have never seen ${username}!`)
    } else {
      let text_ago = timeToText(Math.floor(res));
      send_message_function(`${username} had been playing for ${text_ago}!`)
    }
  })
};



