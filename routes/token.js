const express = require('express')
const router = express.Router()
const knex = require('../knex')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const secret = process.env.JWT_KEY

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

router.delete('/', (req, res, next) => {
  console.log('cookie-cleared. logged out')
  res.clearCookie('token')
  res.sendStatus(200)
})

module.exports = router
