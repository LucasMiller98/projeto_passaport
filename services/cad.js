module.exports = function(passport) {
  const bcrypt = require('bcryptjs')
  const LocalStrategy = require('passport-local').Strategy
  const dao = require('../database/alunos-dao')
  const toastify = require('toastify-js')

  // passport.serializeUser((user, done) => {
  //   done(null, user.id)   
  // })

  // passport.deserializeUser((id, done) => {
  //   dao.findById(id)
  //     .then(([rows]) => {
  //       let user = rows[0]
  //       return done(null, user)
  //     }).catch(error => {
  //       return done(error, null)
  //     })
  // })

  let strategyConfig = {
    username: 'username', 
    password: 'password',
    login: 'login'
  }

  passport.use(new LocalStrategy(strategyConfig, function(username, password, login, done){
    dao.saveOnDatabase(username)
      .then(([rows]) => {
        if(rows.length == 0) return done(null, false)

        let user = rows[0] 
        console.log(user)

        // switch(bcrypt.compareSync(password, user.userpassword)) {
        //   case true:
        //     done(null, user)
        //   break

        //   case false:
        //     done(null, false)
        //   break
        // }

        if(bcrypt.compareSync(password, user.userpassword) 
          && bcrypt.compareSync(login, user.login) 
          && bcrypt.compareSync(username, user.username)) {
            return done(null, user)
        }

        return done(null, false)
        
      }).catch(error => {
        toastify({
          text: error.message,
          duration: 3000
        }).showToast()
        console.log(error.message)

        return done(error, null)
      })
  }))
  
  // let salt = bcrypt.genSaltSync(10)
  // let hash = bcrypt.hashSync('', salt)
}