const express = require('express')
const router = express.Router()
const alunosDao = require('../database/alunos-dao')

router.get('/', (req, res) => {
  alunosDao.list().then(([rows]) => {
      res.render('alunos/list', { alunos: rows })
      console.log(rows)
    }).catch(err =>{
      console.error(err.message)
      res.render('alunos/list', { alunos: [] })
    })
})

router.post('/delete', (req, res) => {
  alunosDao.remove(req.body.id)
    .then(([result]) =>{
      if(result.affectedRows > 0) {
        req.flash('success', 'Aluno excluído com sucesso.')
      }else{
        req.flash('success', `O regitro com o id ${req.body.id} não foi encontrado no bando.`)
      }
      res.redirect('/alunos')
    }).catch( err => {
      console.log(err.message)
      req.flash('error', 'Ocorreu um erro na exclusão do aluno.')
      res.redirect('/alunos')
    })
})

router.get('/form', async (req, res) => {

  let row = {
    id: '',
    nome: '',
    email: '',
    curso: ''
  }

  if(req.query.id) {
    [result] = await alunosDao.findById(req.query.id)
    console.log(result)
    row = result[0]
    console.log(row)
  }
  
  res.render('alunos/form', { aluno: row })
})

router.post('/save', (req, res) => {
  console.log(req.body)
  
  // switch(req.body.id) {
  //   case true:
  //     operacao = alunosDao.update
  //     success = 'Dados atualizados com sucesso.'
  //   break

  //   case false:
  //     operacao = alunosDao.save
  //     success = 'Dados salvos com sucesso.'
  //   break
  // }
  
  if(req.body.id) {
    operacao = alunosDao.update
    success = 'Dados atualizados com sucesso.'
  }else{
    operacao = alunosDao.save
    success = 'Dados salvos com sucesso.'
  }

  operacao(req.body)
    .then(([result]) => {
      console.log(req.body)
      req.flash('success', success)
      res.redirect('/alunos')
  }).catch( err => {
    console.log(err)
    req.flash('error', `Não foi possível cadastrar o aluno.`)
    res.redirect('/alunos')
  }) 
})

router.get('/search', (req, res) => {

  if(req.query.nome) {  
    alunosDao.search(req.query.nome)
      .then(([rows]) => {
        res.render('alunos/list', { alunos: rows })
      }).catch( err => {
        console.log(err.message)
        req.flash('error', 'Não foi possível efetuar a busca por nome')
        res.redirect('/alunos')
      })
  }else{
    res.redirect('/')
  }
  
})

module.exports = router