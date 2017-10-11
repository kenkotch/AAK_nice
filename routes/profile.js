const express = require('express')
const router = express.Router()
const knex = require('../knex')
const jwt = require('jsonwebtoken')
const boom = require('boom')

let guest_profile
// RENDERS EVERYTHING FROM THIS OWNER'S SPECIFIC PROFILE

// router.get('/', (req, res, next) => {
//   res.render('profile', { guest_profile, _layoutFile: 'layout.ejs' })
// })
//
router.get('/:id', function(req, res, next) {
  // const id = Number(req.params.id)
  res.render('profile', {
    guest_profile,
    _layoutFile: 'layout.ejs'
  })
})


// HANDLES CREATION OF GUEST USERNAME AND PASSWORD - ADAM M.
router.post('/', (req, res, next) => {
  // const { item } = req.body
  jwt.verify(req.cookies.token, process.env.JWT_KEY, (err, payload) => {
    if (err) {
      return res.send(false)
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
        .catch((err) => next(err))
    }
  })
})

router.patch('/:id', (req, res, next) => {
  const id = Number(req.params.id)

  if (Number.isNaN(id)) {
    return next()
  }

  knex('acount')
    .where('id', id)
    .then((rows) => {
      if (!rows) {
        throw boom.create(404, 'Not Found')
      }

      const {
        email,
        password,
        first_name_1,
        last_name_1,
        first_name_2,
        last_name_2,
        wedding_date
      } = req.body
      const updateRow = {}
      if (email) {
        updateRow.email = email
      }

      if (password) {
        updateRow.password = password
      }

      if (first_name_1) {
        updateRow.first_name_1 = first_name_1
      }

      if (last_name_1) {
        updateRow.last_name_1 = last_name_1
      }

      if (first_name_2) {
        updateRow.first_name_2 = first_name_2
      }

      if (first_name_2) {
        updateRow.first_name_2 = first_name_2
      }

      if (wedding_date) {
        updateRow.wedding_date = wedding_date
      }

      knex('account')
        .update(updateRow, '*')
        .where('id', id)
        .then((row) => {
          res.send(row[0])
        })
    })
    .catch((err) => next(err))
})
//
router.delete('/:id', (req, res, next) => {
  const id = Number(req.params.id)
  if (Number.isNaN(id)) {
    return next()
  }
  let event
  knex('account')
    .where('id', id)
    .then((row) => {
      if (!row) {
        throw boom.create(404, 'Not Found')
      }
      event = row

      return knex('account')
        .del()
        .where('id', id)
    })
    .then(() => {
      delete event.id
      res.send(event)
    })
    .catch((err) => next(err))
})

module.exports = router
