const express = require('express')
const router = express.Router()
const knex = require('../knex')

// READ for User
router.get('/', (req, res) => {
  // when authenticated, user can see owner, joined to schedule rendered on page
  knex('owner')
<<<<<<< HEAD
    .select('first_name_1', 'first_name_2', 'template_id')
=======
    .select('first_name_1', 'first_name_2' 'template_id')
>>>>>>> d907d9e3f5bb01389217dd441a042a945bbbc49f
    .innerJoin('schedule', 'owner_id')
})


module.exports = router
