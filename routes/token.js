const express = require('express')
const router = express.Router()
const knex = require('../knex')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const secret = process.env.JWT_KEY

// let role

// const auth = (req, res, next) => {
//   jwt.verify(req.cookies.token, secret, (err, payload) => {
//     if (err) {
//       res.status(401)
//       return res.send('Not Authorized')
//     }
//     req.claim = payload.accountId
//     next()
//   })
// }

// const checkRole = (req, res, next) => {
//   knex('account')
//     .select('role')
//     .first()
//     .where('id', req.claim)
//     .then((data) => {
//       role = data.role
//       next()
//     })
// }

router.post('/', (req, res, next) => {
  const { email, password } = req.body
  console.log('this is the error ken')

  if (!email || email.trim() === ('')) {
    res.status(400)
    res.send('Bad email or password')
    return
  }

  if (!password || password.trim() === ('')) {
    res.status(400)
    res.send('Bad email or password')
    return
  }

  knex('account')
    .where('email', email)
    .first()
    .then((data) => {
      let match = bcrypt.compareSync(password, data.hashed_password)
      if (!match) {
        res.sendStatus(404)
        return
      }
      const token = jwt.sign({ accountId: data.id }, secret)

      res.cookie(
        'token', token,
        { httpOnly: true }
      )
      res.status(200)
      delete data.hashed_password
      res.send(data)
    })
    .catch((err) => next(err))
})

// // test get route with auth - works
// router.get('/', auth, checkRole, (req, res, next) => {
//
//   console.log('role:', role)
//
//   res.redirect('/')
//
// })


router.delete('/', (req, res, next) => {
  console.log('cookie-cleared. logged out')
  res.clearCookie('token')
  res.sendStatus(200)
})

module.exports = router
