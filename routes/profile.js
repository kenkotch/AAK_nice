const express = require('express')
const router = express.Router()
const knex = require('../knex')
const jwt = require('jsonwebtoken')

let guest_profile
// GET a list of all TODOS

// SELECT id, item FROM owner ORDER BY id
router.get('/', (req, res, next) => {
  res.render('profile', { guest_profile, _layoutFile: 'layout.ejs'})
})
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
      console.log(false)
    }
    let id = payload.ownerId
    console.log(id)

    if (!req.body.username || req.body.username.trim() === '') {
      res.status(500)
      res.render('error', {
        message: 'Username cannot be blank'
      })
    } else if (!req.body.password || req.body.password.trim() === '') {
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
        .then((data) => {
          guest_profile = data
          res.status(200)
          // res.send(guest_profile[0])
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

module.exports = router
