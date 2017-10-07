const express = require('express')
const router = express.Router()
const knex = require('../knex')
const bcrypt = require('bcrypt')

router.post('/', function (req, res, next) {
  const { email, password } = req.body

  knex('owners')
    .where('email', email)

})

router.get('/', function (req, res, next) {
  // code goes here
})
