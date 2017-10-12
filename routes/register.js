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
    last_name_2
  } = req.body
  console.log('req.body.wedding_date', req.body.wedding_date)

  if (!username || !email || !password || !first_name_1 || !last_name_2 || !first_name_2 || !last_name_2) {
    res.status(400)
    res.send('Please complete all fields')
    return
  }

  let wedding_date = req.body.wedding_date || "9999-09-09"

  bcrypt.hash(password, 5, (err, hash) => {
    knex('account')
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
      }, '*')
      .then((data) => {
        delete data.created_at
        delete data.updated_at
        delete data.hashed_password

        knex('account')
          .update({
            account_id: data[0].id
          })
          .where('id', data[0].id)
          .then(() => {

            knex('schedule')
              .insert({
                time: 'hide',
                item: '',
                description: '',
                account_id: data[0].id
              })
              .then(() => {
                registered = data
                res.status(200)
                res.send(registered[0])
                return
              })
          })
      })
    .catch((err) => next(err))
  })
})

router.get('/', (req, res, next) => {
  res.render('register', {
    registered,
    _layoutFile: 'layout.ejs',
    role: ''
  })
})

module.exports = router
