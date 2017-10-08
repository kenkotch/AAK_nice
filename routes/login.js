const express = require('express')
const router = express.Router()
const knex = require('../knex')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const secret = process.env.JWT_KEY

router.post('/', function (req, res, next) {
  const { email, password } = req.body

  knex('owners')
    .where('email', email)
    .first()
    .then((data) => {
      let match = bcrypt.compare(password, data.hashed_password,(err, res) => {
        if(!match) {
          return res.sendStatus(404)
        }
      })
        const token = jwt.sign({userId: data.id}, secret)

        res.cookie('token', token,
      {httpOnly: true})
      res.sendStatus(200)
    })
})

router.get('/', (req, res, next) => {
  jwet.verify(req.cookies.token, process.env.JWT_KEY, (err, payload) => {
    if(err){
      return res.send(false)
    }
    res.send(true)
  })
  .catch((err) => next(err))
})

router.delete('/', (req, res, next) => {
  res.clearCooke('token')
  res.sendStatus(200)
})

module.exports = router
