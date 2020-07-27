var mysql = require('mysql');
var currentvar;
var currentbool;

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "minedata"
});

init()

async function init(){
  con.end
  con.connect(function(err) {
    if (err) throw err;
  });
    con.query('CREATE TABLE IF NOT EXISTS userdata(user varchar(255), playtime integer, lastlogin bigint, totallogins integer, kills integer, deaths integer, firstmessage varchar(255), PRIMARY KEY (user))')
  }


async function incplayertime(user, value){
  createuser(user)
  con.query('SELECT playtime FROM userdata WHERE user = ?', user, (err, result) => {
    if(err) throw err
    setPlaytime(user, result[0].playtime + value)
  })
}

async function createuser(user){
  con.query(`INSERT IGNORE INTO userdata(user, playtime, lastlogin, totallogins, kills, deaths, firstmessage) Values(?, ?, ?, ?, ?, ?, ?)`, [user, 0, 0, 0, 0, 0, ''])
}

function setPlaytime(user, value){
  con.query('UPDATE userdata SET playtime = ? WHERE user LIKE ?', [value, user])
}

function setLastlogin(user, value){
  con.query('UPDATE userdata SET lastlogin = ? WHERE user LIKE ?', [value, user], (err) => {if(err) throw err})
}

function setTotallogins(user, value){
  con.query('UPDATE userdata SET totallogins = ? WHERE user LIKE ?', [value, user])
}

function setKills(user, value){
  con.query('UPDATE userdata SET kills = ? WHERE user LIKE ?', [value, user])
}

function setDeaths(user, value){
  con.query('UPDATE userdata SET deaths = ? WHERE user LIKE ?', [value, user])
}

function setFirstmessage(user, value){
  con.query('UPDATE userdata SET firstmessage = ? WHERE user LIKE ?', [value, user])
}


/*
function getPlaytime(user){
  con.query('SELECT playtime FROM userdata WHERE user = ?', user, (err, result) => {
    if(err) throw err
    setCurrent(result[0].playtime)
  })
  return new Promise((resolve, reject) => {
    setTimeout( function() {
      resolve(currentvar)
    }, 250) 
  })
}

function getLastlogin(user){
  con.query('SELECT lastlogin FROM userdata WHERE user = ?', user, (err, result) => {
    if(err) throw err
    setCurrent(result[0].lastlogin)
  })
  return new Promise((resolve, reject) => {
    setTimeout( function() {
      resolve(currentvar)
    }, 250) 
  })
}

function getTotallogins(user){
  con.query('SELECT totallogins FROM userdata WHERE user = ?', user, (err, result) => {
    if(err) throw err
    setCurrent(result[0].totallogins)
  })
  return new Promise((resolve, reject) => {
    setTimeout( function() {
      resolve(currentvar)
    }, 250) 
  })
}

function getKills(user){
  con.query('SELECT kills FROM userdata WHERE user = ?', user, (err, result) => {
    if(err) throw err
    setCurrent(result[0].kills)
  })
  return new Promise((resolve, reject) => {
    setTimeout( function() {
      resolve(currentvar)
    }, 250) 
  })
}

function getDeaths(user){
  con.query('SELECT deaths FROM userdata WHERE user = ?', user, (err, result) => {
    if(err) throw err
    setCurrent(result[0].deaths)
  })
  return new Promise((resolve, reject) => {
    setTimeout( function() {
      resolve(currentvar)
    }, 250) 
  })
}

function getFirstmessage(user){
  con.query('SELECT firstmessage FROM userdata WHERE user = ?', user, (err, result) => {
    if(err) throw err
    setCurrent(result[0].firstmessage)
  })
  return new Promise((resolve, reject) => {
    setTimeout( function() {
      resolve(currentvar)
    }, 250) 
  })
}*/

function setCurrent(val){
  currentvar = val
}

function setBool(val){
  currentbool = val
}

module.exports.connection = con;
module.exports.init = init;
module.exports.incplayertime = incplayertime;
module.exports.createuser = createuser;
/*
module.exports.getPlaytime = getPlaytime;
module.exports.getLastlogin = getLastlogin;
module.exports.getDeaths = getDeaths;
module.exports.getKills = getKills;
module.exports.getTotalLogins = getTotallogins
module.exports.getFirstmessage = getFirstmessage;
*/
module.exports.setPlaytime = setPlaytime;
module.exports.setLastlogin = setLastlogin;
module.exports.setDeaths = setDeaths;
module.exports.setKills = setKills;
module.exports.setTotalLogins = setTotallogins;
module.exports.setFirstmessage = setFirstmessage;
