const express = require('express')
const router = express.Router()
const knex = require('../knex')
const jwt = require('jsonwebtoken')
const boom = require('boom')
const secret = process.env.JWT_KEY
const bcrypt = require('bcrypt')

let role
// let guest_profile
// RENDERS EVERYTHING FROM THIS OWNER'S SPECIFIC PROFILE

const auth = (req, res, next) => {
  jwt.verify(req.cookies.token, secret, (err, payload) => {
    if (err) {
      res.status(401)
      return res.send('Not Authorized')
    }
    req.claim = payload.accountId
    next()
  })
}

const checkRole = (req, res, next) => {
  knex('account')
    .select('role')
    .first()
    .where('id', req.claim)
    .then((data) => {
      role = data.role
      next()
    })
}

// router.get('/', (req, res, next) => {
//   res.render('profile', { guest_profile, _layoutFile: 'layout.ejs' })
// })
//
router.get('/', auth, checkRole, (req, res, next) => {
  // const id = req.params.id
  let id = req.claim
  console.log("id is:", id)
  if (typeof id !== 'undefined') {
    knex('account')
      .select()
      .where('id', id)
      .first()
      .then((data) => {
        res.render('profile', {
          title: `${data.first_name_1} and ${data.first_name_2}'s profile page`,
          id,
          first_name_1: data.first_name_1,
          first_name_2: data.first_name_2,
          last_name_1: data.last_name_1,
          last_name_2: data.last_name_2,
          wedding_date: data.wedding_date,
          _layoutFile: 'layout.ejs'
        })
      })
  } else {
    res.status(500)
    res.render('error', {
      message: 'something went wrong'
    })
  }
  // res.render('profile', {
  //   guest_profile,
  //   _layoutFile: 'layout.ejs'
  // })
})


// HANDLES CREATION OF GUEST USERNAME AND PASSWORD - ADAM M.
router.post('/', auth, checkRole, (req, res, next) => {
  // const { item } = req.body
  let id = req.claim
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
    bcrypt.hash(req.body.password, 5, (err, hash) => {
      knex('account')
        .insert({
          email: req.body.username,
          hashed_password: hash,
          account_id: id,
          role: 3
        }, '*')
        .then((data) => {
          guest_profile = data
          res.status(200)
          // res.send(guest_profile[0])
          res.redirect('/profile')
        })
        .catch((err) => next(err))
    })
  }

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
