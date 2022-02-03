const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.render('cadastro', {
    title: 'Cadastro'
  })
}) 

router.post('/', (req, res) => {
  console.log(req.body)
  res.redirect('/login')
})

module.exports = router