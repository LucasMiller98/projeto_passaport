const express = require('express')
const router = express.Router()

router.get('/', (req, res) => { // rederiza a tela com o user
  res.render('login', { message: null })
})

router.post('/', (req, res) => { // Submição do form
  console.log(req.body)
  res.redirect('/login')
})

module.exports = router