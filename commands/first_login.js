const database = require('../database.js');
const {timeToText} = require("../utils");


this.command_name = ['firstlogin', 'joindate', 'jd']
this.call = function (username, args, callback) {
  if (args.length !== 0) {
    username = args[0]
  }
  database.getFirstLogin(username, (res) => {
    if (res === null) {
      callback(`I have never seen someone named ${username}!`);
    } else {
      let text_ago = timeToText(Math.floor(Date.now() / 1000 - res));
      callback(`${username} first joined ${text_ago} ago!`);
    }
  })
};

