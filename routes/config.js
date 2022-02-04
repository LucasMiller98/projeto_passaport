module.exports = function(app) {

  const login = require('./login');
  const alunos = require('./alunos')
  const cadastro = require('./cadastro')

  const middlewareAutorization = (req, res, next) => {
    if(req.isAuthenticated()) return next()
    
    return res.redirect('/')
  }

  app.use('/', login)
  app.use('/cadastro', cadastro)
  app.use('/alunos', middlewareAutorization,alunos)
  app.use('/alunos/form', alunos)
}