const express = require('express')
const router = express.Router()
const knex = require('../knex')

// GET all lines of schedule
router.get('/', (req, res, next) => {

  // knex('owner')
  //   .where('')

})
// CREATE a new schedule
router.post('/', (req, res, next) => {
  const { item } = req.body
  // code goes here
})

// UPDATE an existing schedule, line by line
router.patch('/:id', (req, res, next) => {
  const id = Number(req.params.id)
  const { item } = req.body
  // code goes here
})

// Future Expansion: UPDATE an existing schedule, all of it

// DELETE an existing schedule, line by line
router.delete('/:id', (req, res, next) => {
  const id = Number(req.params.id)
  // code goes here
})

// Future Expansion: DELETE an entire schedule


module.exports = router
