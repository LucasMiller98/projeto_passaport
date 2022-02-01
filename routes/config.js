module.exports = function(app) {

  const usersRouter = require('./users');
  const login = require('./login');
  const alunos = require('./alunos')
  
  const middlewareAutorization = (req, res, next) => {
    if(req.isAuthenticated()) return next()
    
    return res.redirect('/login')
  }

  app.use('/login', login)
  app.use('/', alunos)
  app.use('/form', alunos)
  app.use('/users', middlewareAutorization, usersRouter);
}