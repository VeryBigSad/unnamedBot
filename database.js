const mysql = require('mysql')
const textLog = require('./caches/textlogcache.js')
const cacheManager = require('./caches/cachemanager.js')
const discord = require('./discord.js')
let chatlog = null
let userdata = null


exports.init = async (ip, port, user, password, textlog, userdatabase) => {
  chatlog = mysql.createConnection({
    host: ip,
    port: port,
    user: user,
    password: password,
    database: textlog
  })
  chatlog.end // Because of some reason database needs to be ended before connecting
  chatlog.connect(function (err) {
    if (err) {
      console.log('Could not connect to the TEXTLOG database.')
      discord.sendMessage('Could not connect to the textlog database, no messages are logged.')
      throw err
    }
  })
  userdata = mysql.createConnection({
    host: ip,
    user: user,
    password: password,
    database: userdatabase,
    port: port
  })
  userdata.end // Because of some reason database needs to be ended before connecting
  userdata.connect(function (err) {
    if (err) {
      console.log('Could not connect to the MINEDATA database.')
      discord.sendMessage('Could not connect to the user data database, no data about players is logged (playtime, last seen, etc).')
      throw err
    }
  })
  await userdata.query('CREATE TABLE IF NOT EXISTS userdata(user varchar(255), playtime integer, lastlogin bigint, totallogins integer, kills integer, deaths integer, firstmessage varchar(255), firstlogin bigint, PRIMARY KEY (user))')
  exports.userdata = userdata
  cacheManager.dumpDB()
  console.log("Database initialization finished!")
}


exports.checkusertextlog = async (user) => {
  chatlog.query('CREATE TABLE IF NOT EXISTS _' + user + '(text longtext, time bigint)')
}


exports.addTextmessage = async (user, text, time) => {
  this.checkusertextlog(user)
  chatlog.query('INSERT INTO _' + user + '(text, time) VALUES(?, ?)', [text, time])
}


exports.getRandomTextmessage = (user, callback) => {
  this.checkusertextlog(user)
  chatlog.query('SELECT * FROM _' + user, function (err, result) {
    if (err) throw err
    if (!result) {
      console.log('Error: User not found')
      callback(null)
      return
    }
    let resultlist = []
    let count = 0
    for (let value in textLog.getCacheValue(user)) {
      // TODO: check whether this works or not
      resultlist.push(value.key)
      count++
    }
    for (let row in result) {
      // TODO: check whether this works or not
      resultlist.push(row.text)
      count++
    }
    if (count === 0) {
      console.log('Error: No messages found from user!')
      callback(null)
      return
    }
    let rand = Math.floor(Math.random() * count)
    callback(resultlist[rand])
  })
}


exports.addPlayertime = async (user, value) => {
  this.checkuser(user)
  userdata.query('SELECT playtime FROM userdata WHERE user = ?', user, (err, result) => {
    if (err) throw err
    this.setPlaytime(user, result[0].playtime + value)
  })
}


exports.addTotalLogins = async (user, value) => {
  this.checkuser(user)
  userdata.query('SELECT totallogins FROM userdata WHERE user = ?', user, (err, result) => {
    if (err) throw err
    this.setTotallogins(user, result[0].totallogins + value)
  })
}


exports.checkuser = async (user = '') => {
  userdata.query(`INSERT IGNORE INTO userdata(user, playtime, lastlogin, totallogins, kills, deaths, firstmessage, firstlogin) Values(?, ?, ?, ?, ?, ?, ?, ?)`, [user, 0, 0, 0, 0, 0, '', 0])
}


exports.setPlaytime = async (user = '', value = 1) => {
  userdata.query('UPDATE userdata SET playtime = ? WHERE user LIKE ?', [value, user])
}


exports.setLastlogin = async (user = '', value = 1) => {
  userdata.query('UPDATE userdata SET lastlogin = ? WHERE user LIKE ?', [value, user], (err) => {if (err) throw err})
}


exports.setTotallogins = async (user = '', value = 1) => {
  userdata.query('UPDATE userdata SET totallogins = ? WHERE user LIKE ?', [value, user])
}


exports.setFirstmessage = async (user = '', value = '') => {
  userdata.query('UPDATE userdata SET firstmessage = ? WHERE user LIKE ?', [value, user])
}


exports.setFirstlogin = async (user = '', value = '') => {
  userdata.query('UPDATE userdata SET firstlogin = ? WHERE user LIKE ?', [value, user])
}


exports.getPlaytime = async (user = '', callback) => {
  this.checkuser(user)
  userdata.query('SELECT playtime FROM userdata WHERE user = ?', user, (err, result) => {
    if (err) throw err
    callback(result[0].playtime)
  })
}


exports.getLastlogin = async (user = '', callback) => {
  this.checkuser(user)
  userdata.query('SELECT lastlogin FROM userdata WHERE user = ?', user, (err, result) => {
    if (err) throw err
    callback(result[0].lastlogin)
    // hope this works and doesn't crash, is .lastlogin even a property? nvm its js it probably is
  })
}


exports.getTotalLogins = async (user = '', callback) => {
  this.checkuser(user)
  userdata.query('SELECT totallogins FROM userdata WHERE user = ?', user, (err, result) => {
    if (err) throw err
    callback(result[0].totallogins)
  })
}


exports.getFirstmessage = async (user = '', callback) => {
  await this.checkuser(user)
  userdata.query('SELECT firstmessage FROM userdata WHERE user = ?', user, (err, result) => {
    if (err) throw err
    callback(result[0].firstmessage)
  })
}


exports.getFirstlogin = async (user = '', callback) => {
  this.checkuser(user)
  userdata.query('SELECT firstlogin FROM userdata WHERE user = ?', user, (err, result) => {
    if (err) throw err
    callback(result[0].firstlogin)
  })
}
