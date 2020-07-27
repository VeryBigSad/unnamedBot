var mysql = require('mysql');
var currentvar;
var currentbool;

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "textlog"
});

async function createuser(user){
	con.query(`CREATE TABLE IF NOT EXISTS _` + user + `(text longtext, time bigint)`)
}

async function addtextmessage(user, text) {
	createuser(user)
	con.query('INSERT INTO _' + user + '(text, time) VALUES(?, ?)', [text, Date.now()])
}

module.exports.createuser = createuser;
module.exports.addtextmessage = addtextmessage;
module.exports.connection = con;