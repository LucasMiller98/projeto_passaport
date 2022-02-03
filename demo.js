const bcrypt = require('bcryptjs')
const dao = require('./database/dao')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

let strategyConfig = {
  passwordField: 'password'
}

passport.use(new LocalStrategy(strategyConfig, (password, done) => {
  dao.findByUsers(password)
    .then(([rows]) => {
      console.log(rows[0])

      // let users = rows[0]
      // console.log('BD' + users)
      
      // let salt = bcrypt.genSaltSync(10);
      // let hash = bcrypt.hashSync(users.userpassword, salt);
      // console.log(hash)
      
      // console.log(bcrypt.compareSync("abcde", hash)); // true
      // console.log(bcrypt.compareSync(users.userpassword, hash)); // false
    }).catch(err => {
      console.log(err.message)
    })
}))
