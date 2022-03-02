const bot = require('./bot')


// set(or modify) functions


exports.addTextMessage = (user, text, time) => {
  bot.dbi.createOrIgnoreUser(user)
  bot.dbi.addChatMessage(user, text, time)
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


exports.setFirstLogin = (user, value) => {
  bot.dbi.createOrIgnoreUser(user)
  bot.dbi.updateUser(user, 'first_login', value)
}


// get functions


exports.getRandomTextMessage = (user, callback) => {
  bot.dbi.getChatMessages(user, (result) => {
    if (result === undefined || result.length === 0) {
      callback(null)
    } else {
      let random_index = Math.floor(Math.random() * result.length);
      callback(result[random_index]);
    }
  })
}


exports.getPlaytime = (user, callback) => {
  bot.dbi.getUser(user, (result) => {
    if (result === undefined) {
      callback(null)
    } else {
      callback(result.playtime)
    }
  })
}


exports.getLastLogin = (user = '', callback) => {
  bot.dbi.getUser(user, (result) => {
    if (result === undefined) {
      callback(null)
    } else {
      callback(result.last_login)
    }
  })
}


exports.getFirstLogin = (user = '', callback) => {
  bot.dbi.getUser(user, (result) => {
    if (result === undefined) {
      callback(null)
    } else {
      callback(result.first_login)
    }
  })
}


exports.getTotalLogins = (user = '', callback) => {
  bot.dbi.getUser(user, (result) => {
    if (result === undefined) {
      callback(null)
    } else {
      callback(result.total_logins)
    }
  })
}


//
exports.getFirstMessage = (user, callback) => {
  // TODO: instead of having first_message in user_info as a field, just search in chat_log table first by date.
  bot.dbi.getUser(user, (result) => {
    if (result === undefined) {
      callback(null)
    } else {
      callback(result.first_message)
    }
  })
}

