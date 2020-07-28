const mysql = require('mysql');
var chatlog = null
var con = null


exports.init = async(host="localhost", user="root", password="", textlog="textlog", userdatabase="minedata") => {
   chatlog = mysql.createConnection({
    host: host,
    user: user,
    password: password,
    database: textlog
  });
  chatlog.end // Because of some reason database needs to be eneded before connectiing
  chatlog.connect(function(err) {
    if (err) throw err;
  });
  con = mysql.createConnection({
    host: host,
    user: user,
    password: password,
    database: userdatabase
  });
  con.end // Because of some reason database needs to be eneded before connectiing
  con.connect(function(err) {
    if (err) throw err;
  });
    con.query('CREATE TABLE IF NOT EXISTS userdata(user varchar(255), playtime integer, lastlogin bigint, totallogins integer, kills integer, deaths integer, firstmessage varchar(255), PRIMARY KEY (user))')
  return
}

exports.checkusertextlog = async(user) => {
  chatlog.query(`CREATE TABLE IF NOT EXISTS _`+user+`(text longtext, time bigint)`)
}

exports.addTextmessage = async(user, text) => {
    this.checkusertextlog(user)
    chatlog.query('INSERT INTO _'+user+'(text, time) VALUES(?, ?)', [text, Date.now()])
}

exports.getRandomTextmessage = (user="", callback) => {
  chatlog.query('SELECT * FROM _'+user, function(err, result) {
    if(err) throw err
    if(!result){
      console.log('Error: User not found')
      callback(null)
      return
    }
    count = 0
    for(row in result){
      count++;
    }
    rand = Math.floor((Math.random() * count) + 1);
    if(!result[rand]){
      console.log('Error: No messages found from user!')
      callback(null)
      return
    }
    callback(result[rand]);
   });
}

exports.addPlayertime = async(user, value) => {
    this.checkuser(user)
    con.query('SELECT playtime FROM userdata WHERE user = ?', user, (err, result) => {
      if(err) throw err
      setPlaytime(user, result[0].playtime + value)
    })
  }
  
  exports.addTotalLogins = async(user, value) => {
    this.checkuser(user)
    con.query('SELECT totallogins FROM userdata WHERE user = ?', user, (err, result) => {
      if(err) throw err
      setPlaytime(user, result[0].totalloogins + value)
    })
  }
  
  exports.checkuser = async(user="") => {
    con.query(`INSERT IGNORE INTO userdata(user, playtime, lastlogin, totallogins, kills, deaths, firstmessage) Values(?, ?, ?, ?, ?, ?, ?)`, [user, 0, 0, 0, 0, 0, ''])
  }
  
  exports.setPlaytime = async(user="", value=1) => {
    con.query('UPDATE userdata SET playtime = ? WHERE user LIKE ?', [value, user])
  }
  
  exports.setLastlogin = async(user="", value=1) => {
    con.query('UPDATE userdata SET lastlogin = ? WHERE user LIKE ?', [value, user], (err) => {if(err) throw err})
  }
  
  exports.setTotallogins = async(user="", value=1) => {
    con.query('UPDATE userdata SET totallogins = ? WHERE user LIKE ?', [value, user])
  }
  
  exports.setFirstmessage = async(user="", value="") => {
    con.query('UPDATE userdata SET firstmessage = ? WHERE user LIKE ?', [value, user])
  }

  exports.getPlaytime = async(user="", callback) => {
    this.checkuser(user)
    con.query('SELECT playtime FROM userdata WHERE user = ?', user, (err, result) => {
        if(err) throw err
        callback(result[0].playtime)
      })
 }

 exports.getLastlogin = async(user="", callback) => {
    this.checkuser(user)
    con.query('SELECT lastlogin FROM userdata WHERE user = ?', user, (err, result) => {
        if(err) throw err
        callback(result[0].lastlogin)
      })
 }

 exports.getTotalLogins = async(user="", callback) => {
    this.checkuser(user)
    con.query('SELECT totallogins FROM userdata WHERE user = ?', user, (err, result) => {
        if(err) throw err
        callback(result[0].totallogins)
      })
 }

 exports.getFirstmessage = async(user="", callback) => {
    this.checkuser(user)
    con.query('SELECT firstmessage FROM userdata WHERE user = ?', user, (err, result) => {
        if(err) throw err
        callback(result[0].firstmessage)
      })
 }