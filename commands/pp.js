const { cyrb53 } = require('../utils');

this.command_name = ['pp', 'dick']
this.call = function (username, args, callback) {
  if (args.length !== 0) {
    username = args[0]
  }

  let number = cyrb53(username.toLowerCase()) % 100;
  let numberSqrt = Math.round(Math.sqrt(number));
  let dickSize = 10 - numberSqrt;
  let text = username + '\'s dick: 8=' + '='.repeat(dickSize) + 'D';
  if (dickSize > 6 && dickSize < 9) {
    // 7, 8
    text += ' Wow! That\'s really something huge this person has!'
  } else if (dickSize === 9) {
    text += ' WOW!!! ENORMOUS!!!!!!'
  }
  callback(text)

};

