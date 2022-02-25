const bot = require('./bot')


exports.addTextMessage = (user, text, time) => {
  bot.dbi.createOrIgnoreUser(user)
  bot.dbi.addChatMessage(user, text, time)
}


exports.getRandomTextMessage = (user, callback) => {
  bot.dbi.getChatMessages(user, (result) => {
    if (result.length === 0) {
      callback(null)
    } else {
      let random_index = Math.floor(Math.random() * result.length);
      callback(result[random_index].text);
    }
  })
}


exports.addPlaytime = (user, value) => {
  bot.dbi.getOrCreateUser(user, (user_obj)=>{
    bot.dbi.updateUser(user, 'playtime', user_obj.playtime + value)
  })
}


exports.addTotalLogins = (user, value) => {
  bot.dbi.getOrCreateUser(user, (user)=> {
    if (user.total_logins === 0) {
      bot.dbi.updateUser(user, 'first_login', Date.now() / 1000)
    }
    bot.dbi.updateUser(user, 'total_logins', user.total_logins + value)
  })

}


exports.setLastLogin = (user, value) => {
  bot.dbi.createOrIgnoreUser(user)
  bot.dbi.updateUser(user, 'last_login', value)
}

//
exports.setFirstLogin = (user, value) => {
  bot.dbi.createOrIgnoreUser(user)
  bot.dbi.updateUser(user, 'first_login', value)
}


//
exports.getPlaytime = (user = '', callback) => {
  this.checkuser(user)
  userdata.query('SELECT playtime FROM userdata WHERE user = ?', user, (err, result) => {
    if (err) throw err
    callback(result[0].playtime)
  })
}


//
exports.getLastLogin = (user = '', callback) => {
  this.checkuser(user)
  userdata.query('SELECT lastlogin FROM userdata WHERE user = ?', user, (err, result) => {
    if (err) throw err
    callback(result[0].lastlogin)
    // hope this works and doesn't crash, is .lastlogin even a property? nvm its js it probably is
  })
}


//
exports.getTotalLogins = (user = '', callback) => {
  this.checkuser(user)
  userdata.query('SELECT totallogins FROM userdata WHERE user = ?', user, (err, result) => {
    if (err) throw err
    callback(result[0].totallogins)
  })
}


//
exports.getFirstMessage = (user = '', callback) => {
  this.checkuser(user)
  userdata.query('SELECT firstmessage FROM userdata WHERE user = ?', user, (err, result) => {
    if (err) throw err
    callback(result[0].firstmessage)
  })
}


//
exports.getFirstLogin = (user = '', callback) => {
  this.checkuser(user)
  userdata.query('SELECT firstlogin FROM userdata WHERE user = ?', user, (err, result) => {
    if (err) throw err
    callback(result[0].firstlogin)
  })
}
