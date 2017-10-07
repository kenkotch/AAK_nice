const express = require('express')
const router = express.Router()
const knex = require('../knex')

// READ for User
router.get('/', (req, res) => {
  // when authenticated, user can see owner, joined to schedule rendered on page
  knex('owner')
    .select('first_name_1', 'first_name_2', 'template_id', 'schedule.owner_id', 'template.template_name')
    .innerJoin('schedule', 'owner_id', 'owner.id')
    .innerJoin('template', 'template.id', 'owner.template_id')
    .then((data) => {
      console.log(data)
      res.send(data)
    })
})


module.exports = router
