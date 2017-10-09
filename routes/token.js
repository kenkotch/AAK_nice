const express = require('express')
const router = express.Router()
const knex = require('../knex')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const secret = process.env.JWT_KEY

router.post('/', function (req, res, next) {
  const { email, password } = req.body
  console.log(email)

  if(!email || !password){
    res.status(400)
    res.send('Bad email or password')
    return
  }

  knex('owner')
    .where('email', email)
    .first()
    .then((data) => {
      let match = bcrypt.compare(password, data.hashed_password)
        if(!match) {
          res.sendStatus(404)
          return
        }
        const token = jwt.sign({ownerId: data.id}, secret)

        res.cookie('token', token,
      {httpOnly: true})
      console.log(res.cookie.token)
      res.status(200)
      delete data.hashed_password
      res.send(data)
    })
    .catch((err) => next(err))
})

router.get('/', (req, res, next) => {
  jwt.verify(req.cookies.token, process.env.JWT_KEY, (err, payload) => {
    if(err){
      return res.send(false)
    }
    res.send(true)
  })
  .catch((err) => next(err))
})

router.delete('/', (req, res, next) => {
  res.clearCookie('token')
  res.sendStatus(200)
})

module.exports = router
