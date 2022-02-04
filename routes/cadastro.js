const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const cadastroDao = require('../database/cad-dao')

router.get('/', (req, res) => {
  res.render('cadastro', {
    title: 'Cadastro'
  })
}) 

router.post('/', (req, res) => {
  
  let salt = bcrypt.genSaltSync(10)
  let hash = bcrypt.hashSync(req.body.password, salt)
  
  req.body.password = hash
  
  cadastroDao.save(req.body)
  console.log(req.body)
  res.redirect('/')

})

module.exports = router