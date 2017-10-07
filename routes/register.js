const express = require('express')
const router = express.Router()
const knex = require('../knex')
const bcrypt = require('bcrypt')

router.post('/', function (req, res, next) {
  //now these must all be required fields in the request body/form input
  const {username, email, password, first_name_1, last_name_1, first_name_2, last_name_2} = req.body

  bcrypt.hash(password, 5, function(err, hash) {

    knex('owner')
      .insert({username: username, email: email, hashed_password: hash, first_name_1: first_name_1, last_name_1: last_name_1, first_name_2: first_name_2, last_name_2: last_name_2})
      .then(() =>{
        res.send(200)
      })
  })
  .catch((err) => next(err))
  }
})
