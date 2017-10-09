const express = require('express')
const router = express.Router()
const knex = require('../knex')

// index
router.get('/', (req, res) => {
  res.render('index', { title: 'Couple', _layoutFile: 'layout.ejs' })
})



module.exports = router
