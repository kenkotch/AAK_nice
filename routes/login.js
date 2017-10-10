const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
  res.render('login', {_layoutFile: 'layout.ejs'})
})

router.post('/', (req, res, next) => {
  //



})

module.exports = router
