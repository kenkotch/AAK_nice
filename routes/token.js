const express = require('express')
const router = express.Router()
const knex = require('../knex')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const secret = process.env.JWT_KEY

const auth = (req, res, next) => {
  jwt.verify(req.cookies.token, secret, (err, payload) => {
    if(err) {
      res.status(401)
      return res.send('Not Authorized')
    }
    req.claim = payload.ownerId
    next()
  })
}

router.post('/', function (req, res, next) {
  const { email, password } = req.body

  if(!email || email.trim() === ('')){
    res.status(400)
    res.send('Bad email or password')
    return
  }

  if(!password || password.trim() === ('')){
    res.status(400)
    res.send('Bad email or password')
    return
  }

  knex('owner')
    .where('email', email)
    .first()
    .then((data) => {
      let match = bcrypt.compareSync(password, data.hashed_password)
        if(!match) {
          res.sendStatus(404)
          return
        }
        const token = jwt.sign({ownerId: data.id}, secret)

        res.cookie('token', token,
      {httpOnly: true})
      res.status(200)
      delete data.hashed_password
      res.send(data)
    })
    .catch((err) => next(err))
})

// test get route with auth - works
// router.get('/', auth, (req, res, next) => {
//
//   console.log('req.claim:', req.claim)
//
// })

router.delete('/', (req, res, next) => {
  console.log('cookie-cleared. logged out')
  res.clearCookie('token')
  res.sendStatus(200)
})

module.exports = router
