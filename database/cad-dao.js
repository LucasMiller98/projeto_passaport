const pool = require('./config')

let operations = {
  save: (user) => {
    return pool.promise().execute('insert into users (username, login, userpassword) values (?, ?, ?)', [user.username, user.login, user.password])
  }
}

module.exports = operations