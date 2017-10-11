const express = require('express')
const router = express.Router()
const knex = require('../knex')

// READ for User
router.get('/', (req, res, next) => {
  let id = 1 // id will eventually come from cookie

  let fName1
  let fName2
  let wedDate

  knex('account')
    .select('first_name_1', 'first_name_2', 'wedding_date', 'template.template_name', 'schedule.*')
    .where('account.id', id)
    .orderBy('time')
    .innerJoin('schedule', 'account_id', 'account.id')
    .innerJoin('template', 'template.id', 'account.template_id')
    .then((data) => {
      fName1 = data[0].first_name_1
      fName2 = data[0].first_name_2
      wedDate = data[0].wedding_date.toString().slice(0, 15)

      for (let i = 0; i < data.length; i++) {
        delete data[i].created_at
        delete data[i].updated_at
      }

      res.render(
        'users',
        {
          title: `Welcome to ${fName1} and ${fName2}'s wedding!`,
          data,
          wedDate,
          _layoutFile: 'layout.ejs'
        }
      )
    })
    .catch((err) => {
      next(err)
    })
})

module.exports = router
