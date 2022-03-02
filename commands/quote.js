const {cyrb53, timeToText} = require('../utils');
const {getRandomTextMessage} = require("../database");

this.command_name = ['quote', 'qt']
this.call = function (username, args, callback) {
  if (args.length !== 0) {
    username = args[0]
  }

  getRandomTextMessage(username, (res)=>{
    if (res === undefined || res === null) {
      callback('I don\'t think ' + username + ' ever said anything!')
    } else {
      callback(res.user + ' ' + timeToText(Date.now() / 1000 - res.time) + ' ago: "' + res.message_text + '"')
    }
  })
};

