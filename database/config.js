const mysql = require('mysql2');

const pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  database: 'tutorial_web2',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

pool.promise().query('select * from alunos').then((result) => {
  console.log(result[0])
})

module.exports = pool