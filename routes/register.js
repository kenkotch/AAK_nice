const express = require('express')
const router = express.Router()
const knex = require('../knex')
const bcrypt = require('bcrypt')

let registered

router.post('/', (req, res, next) => {
  // now these must all be required fields in the request body/form input except wedding_date
  const {
    username,
    email,
    password,
    first_name_1,
    last_name_1,
    first_name_2,
    last_name_2,
    wedding_date
  } = req.body

  if (!username || !email || !password || !first_name_1 || !last_name_2 || !first_name_2 || !last_name_2) {
    res.status(400)
    res.send('Please complete all fields')
    return
  }

  bcrypt.hash(password, 5, (err, hash) => {
    knex('account')
      .returning(['first_name_1', 'first_name_2'])
      .insert({
        username,
        email,
        hashed_password: hash,
        first_name_1,
        last_name_1,
        first_name_2,
        last_name_2,
        wedding_date,
        role: 2
      })
      .then((data) => {
        registered = data
        res.status(200)
        res.send(registered[0])
      })
  .catch((err) => next(err))
  })
})

router.get('/', (req, res, next) => {
  res.render('register', { registered, _layoutFile: 'layout.ejs'})
})

module.exports = router
