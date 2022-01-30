module.exports = function(app) {

  const indexRouter = require('./index');
  const usersRouter = require('./users');
  const loginRouter = require('./login');
  
  const middlewareAutorization = (req, res, next) => {
    if(req.isAuthenticated()) return next()
    
    return res.redirect('/login')
  }

  app.use('/', indexRouter);
  app.use('/users', middlewareAutorization, usersRouter);
  app.use('/login', loginRouter)
}