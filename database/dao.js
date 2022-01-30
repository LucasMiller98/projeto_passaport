const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'login'
});

module.exports = {
  findById: (id) => { // buscar o user pelo id
    return connection.promise().query('select * from users where id=?', [id])
  },

  findByUserName: (userName) => { // buscar o user por nome
    return connection.promise().query('select * from users where login=?', [userName])
  }
}