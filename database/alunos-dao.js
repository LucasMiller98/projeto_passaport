const pool = require('./config')

let operations = {
  list: function() {
    return pool.promise().query('select * from alunos')
  },

  findById(id) {
    return pool.promise().query('select * from alunos where id=?', [id])
  },
  
  save: function(aluno) {
    return pool.promise().execute('INSERT INTO alunos (nome, email, curso) VALUES (?, ?, ?)', [aluno.nome, aluno.email, aluno.curso])
  },
  
  update: function(aluno) {
    return pool.promise().execute('update alunos set nome=?, email=?, curso=? where id=?',
      [aluno.nome, aluno.email, aluno.curso, aluno.id]
    )
  },
  
  remove: function(id) {
    return pool.promise().execute('delete from alunos where id= ?', [id])
  },

  search: function(nome) {
    return pool.promise().query('select * from alunos where nome like ?', [ '%' + nome + '%' ])
  },

  // saveOnDatabase: (users) => {
  //   return pool.promise().execute('insert into users (username, login, userpassword) values (?, ?, ?)', [users.username, users.login, users.userpassword])
  // }
}

module.exports = operations