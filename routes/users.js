const express = require('express')
const router = express.Router()
const knex = require('../knex')

// READ for User
router.get('/', (req, res) => {
  // when authenticated, user can see owner, joined to schedule rendered on page
  knex('owner')
    .select('first_name_1', 'first_name_2' 'template_id')
    .innerJoin('schedule', 'owner_id')
})


module.exports = router
