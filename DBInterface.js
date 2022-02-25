const sqlite3 = require("sqlite3");

class DBInterface {
  // class which helps to talk to the database. Expects only having 2 tables, one for
  // chat logs, and one for user data.

  constructor() {
    console.log('Starting up Database stuff...')
    // TODO: export DB filename into config.json
    this.db = new sqlite3.Database('./unnamed_bot.db', ()=>{
      // TODO: comment down the information about these tables
      let createUserDataTable = 'CREATE TABLE IF NOT EXISTS user_data(user varchar(255), playtime integer, last_login bigint, total_logins integer, kills integer, deaths integer, first_message varchar(1023), first_login bigint, PRIMARY KEY (user))';
      let createChatLogTable = 'CREATE TABLE IF NOT EXISTS chat_logs(user varchar(255), text varchar(1023), time bigint, PRIMARY KEY (user))';
      this.db.run(createUserDataTable).run(createChatLogTable);
      console.log('Database ready to work!')
    });
  }

  async getAll(table, callback) {
    // returns the entire data of set table.
    this.db.all('SELECT * FROM ' + table, [], (err, rows) => {
      if (err) {
        console.log(err);
      }
      callback(rows);
    });
  }


  addUser(user) {
    this.db.run("INSET INTO user_data VALUES(" + user + ", 0, " + Date.now() / 1000 + ", 0, 0, 0, null, " + Date.now() / 1000 + ")")
    this.db.run("INSET INTO user_data VALUES(?, ?, ?, ?, ?, ?, ?, ?)", [user, 0, Date.now() / 1000, 0, 0, 0, null, Date.now() / 1000])
  }

  updateUser(user, value_list) {
    this.db.run("UPDATE user_data SET VALUES(?, ?, ?, ?, ?, ?, ?, ?) WHERE user=" + user, value_list)
  }

  getUser(user, callback) {
    // passes user object from the user_data database.
    this.db.get('SELECT * FROM user_data WHERE user=' + user, [], (err, row) => {
      if (err) {
        console.log(err);
      }
      callback(row);
    });
  }

  getChatMessages(user, callback) {
    // passes all rows where user sent a message
    this.db.get('SELECT * FROM chat_logs WHERE user=' + user, [], (err, rows)=>{
      if (err) {
        console.log(err);
      }
      callback(rows);
    })
  }

  addChatMessage (user, text, time) {
    // adds a message to user's chat history
    this.db.run('INSERT INTO chat_logs VALUES(?, ?, ?)', [user, text, time]);
    this.db.get('SELECT COUNT(*) FROM chat_logs WHERE user=' + user, [], (err, row)=> {
      console.log(row)
      if (row === 0) {
        // if this is user's first message, set it as one.
        this.db.run('UPDATE user_data SET first_message=? WHERE user=' + user, [text])
      }
    });
  }
}

exports.DBInterface = DBInterface
