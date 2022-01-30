module.exports = function(passport) {
  const toastify = require('toastify-js')
  const bcrypt = require('bcryptjs')
  
  const LocalStrategy = require('passport-local').Strategy

  let dao = require('../database/dao')

  passport.serializeUser(function(user, done) {
    done(null, user.id)   
  })

  passport.deserializeUser(function(id, done) {
    dao.findById(id)
      .then(([rows]) => {
        let user = rows[0]
        return done(null, user)
      }).catch(error => {
        return done(error, null)
      })
  })

  let strategyConfig = {
    usernameField: 'username', 
    passwordField: 'password'
  }

  passport.use(new LocalStrategy(strategyConfig, function(username, password, done){
    dao.findByUserName(username)
      .then(([rows]) => {
        if(rows.length == 0) return done(null, false)

        let user = rows[0] 
        console.log(user)

        switch(bcrypt.compareSync(password, user.userpassword)) {
          case true:
            done(null, user)
          break

          case false:
            done(null, false)
          break
        }

        // if(bcrypt.compareSync(password, user.userpassword)) {
        //   return done(null, user)
        // }else{
        //   return done(null, false)
        // } 

      }).catch(error => {
        toastify({
          text: error.message,
          duration: 3000
        }).showToast()
        console.log(error.message)

        return done(error, null)
      })
  }))
}