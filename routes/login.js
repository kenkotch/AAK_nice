const express = require('express')
const knex = require('../knex')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const secret = process.env.JWT_KEY
const router = express.Router()

// added consts above
// where is SECRET defined on line 39

router.get('/', (req, res, next) => {
  res.render('login', {
    _layoutFile: 'layout.ejs',
    role: ''
  })
})

router.post('/', (req, res, next) => {
  const {
    email,
    password
  } = req.body

  if (!email || !password) {
    res.status(400)
    res.send('Bad email or password')
    return
  }

  knex('account')
    .where('email', email)
    .first()
    .then((data) => {
      let match = bcrypt.compare(password, data.hashed_password)
      if (!match) {
        res.status(400)
        res.send('Bad email or password')
        return
      }
      const token = jwt.sign({
        accountId: data.id
      }, secret)

      res.cookie('token', token, {
        httpOnly: true
      })
      console.log(res.cookie)
      res.status(200)
      res.render('login', {
        _layoutFile: 'layout.ejs'
      })
    })
    .catch((err) => next(err))
})

// router.get('/', (req, res, next) => {
//   jwt.verify(req.cookies.token, process.env.JWT_KEY, (err, payload) => {
//     if (err) {
//       return res.send(false)
//     }
//     res.render('login')
//     return res.send(true)
//   })
//   .catch((err) => next(err))
// })

router.delete('/', (req, res, next) => {
  res.clearCookie('token')
  res.sendStatus(200)
})

module.exports = router
