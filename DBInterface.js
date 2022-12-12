const sqlite3 = require("sqlite3");

class DBInterface {
  // class which helps to talk to the database. Expects only having 2 tables, one for
  // chat logs, and one for user data.

  constructor() {
    console.log('Starting up Database stuff...')
    // TODO: export DB filename into config.json
    this.db = new sqlite3.Database('./database.db', () => {
      // TODO: comment down the information about these tables
      let createUserDataTable = 'CREATE TABLE IF NOT EXISTS user_data(user varchar(255) primary key, playtime integer, last_login bigint, total_logins integer, kills integer, deaths integer, first_message text, first_login bigint)';
      let createChatLogTable = 'CREATE TABLE IF NOT EXISTS chat_logs(id integer primary key autoincrement, user varchar(255), message_text text, time bigint)';
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
    this.db.run("INSERT INTO user_data VALUES(?, ?, ?, ?, ?, ?, ?, ?)", [user, 0, Date.now() / 1000, 0, 0, 0, null, Date.now() / 1000])
  }

  updateUser(user, key, value) {
    // updates 1 parameter of a user object.
    this.db.run("UPDATE user_data SET " + key + "=? WHERE user=?", [value, user])
  }

  getOrCreateUser(user, callback) {
    this.db.get('SELECT * FROM user_data WHERE lower(user)=lower(?)', [user], (err, row) => {
      if (row === undefined) {
        this.addUser(user);
        this.getUser(user, callback);
      } else {
        callback(row)
      }
    })
  }

  createOrIgnoreUser(user) {
    // same as .addUser(), but ignores if user can't be created
    this.db.run("INSERT OR IGNORE INTO user_data VALUES(?, ?, ?, ?, ?, ?, ?, ?)", [user, 0, Date.now() / 1000, 0, 0, 0, null, Date.now() / 1000])
  }

  getUser(user, callback) {
    // passes user object from the user_data database.
    this.db.get('SELECT * FROM user_data WHERE lower(user)=lower(?)', [user], (err, row) => {
      if (err) {
        console.log(err);
      }
      callback(row);
    });
  }

  getChatMessages(user, callback) {
    // passes all rows where user sent a message
    this.db.all('SELECT * FROM chat_logs WHERE lower(user)=lower(?)', [user], (err, rows) => {
      if (err) {
        console.log(err);
      }
      callback(rows);
    })
  }

  addChatMessage(user, text, time) {
    // adds a message to user's chat history
    this.db.run('INSERT INTO chat_logs (user, message_text, time) VALUES(?, ?, ?)', [user, text, time]);
    this.db.get('SELECT first_message FROM user_data WHERE lower(user)=lower(?)', [user], (err, row) => {
      if (row['first_message'] === null) {
        // if this is user's first message, set it as one.
        this.db.run('UPDATE user_data SET first_message=? WHERE user=?', [text, user])
      }
    });
  }
}

exports.DBInterface = DBInterface
