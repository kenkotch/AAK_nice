const express = require('express')
const router = express.Router()
const knex = require('../knex')

router.get('/', (req, res, next) => {
  res.send('respond with a resource')
})

module.exports = router
