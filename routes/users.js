const express = require('express')
const router = express.Router()
const knex = require('../knex')

// READ for User
router.get('/', (req, res, next) => {
  router.get('/', (req, res, next) => {
    jwt.verify(req.cookies.token, process.env.JWT_KEY, (err, payload) => {
      if (err) {
        return res.send(false)
      }
      let id = payload.ownerId

  let fName1
  let fName2
  let wedDate

  knex('owner')
    .select('first_name_1', 'first_name_2', 'wedding_date', 'template.template_name', 'schedule.*')
    .where('owner.id', id)
    .orderBy('time')
    .innerJoin('schedule', 'owner_id', 'owner.id')
    .innerJoin('template', 'template.id', 'owner.template_id')
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
