const express = require('express')
const router = express.Router()
const knex = require('../knex')
const jwt = require('jsonwebtoken')

// GET a list of all TODOS

// SELECT id, item FROM owner ORDER BY id
// router.get('/', function (req, res, next) {
//   // code goes here
// })
//
// router.get('/:id', function (req, res, next) {
//   const id = Number(req.params.id)
//   // code goes here
// })

router.post('/', (req, res, next) => {
  // const { item } = req.body
  jwt.verify(req.cookies.token, process.env.JWT_KEY, (err, payload) => {
    if (err) {
      return res.send(false)
    }
    let id = payload.ownerId

    if (!req.body.username || !req.body.username.trim()) {
      res.status(500)
      res.render('error', {
        message: 'Username cannot be blank'
      })
    } else if (!req.body.password || !req.body.password.trim()) {
      res.status(500)
      res.render('error', {
        message: 'Password cannot be blank'
      })
    } else {
      knex('guest')
        .insert({
          username: req.body.username,
          password: req.body.password,
          owner_id: id
        }, '*')
        .then(() => {
          res.redirect('/profile')
        })
    }
  })
})

// router.patch('/:id', function (req, res, next) {
//   const id = Number(req.params.id)
//   const { item } = req.body
//   // code goes here
// })
//
// router.delete('/:id', function (req, res, next) {
//   const id = Number(req.params.id)
//   // code goes here
// })
