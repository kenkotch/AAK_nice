const express = require('express')
const router = express.Router()
const knex = require('../knex')

// READ for User
router.get('/', (req, res) => {
  let id = 1 // id will eventually come from cookie
  knex('owner')
    .select('first_name_1', 'first_name_2', 'wedding_date', 'template.template_name', 'schedule.*')
    .where('owner.id', id)
    .innerJoin('schedule', 'owner_id', 'owner.id')
    .innerJoin('template', 'template.id', 'owner.template_id')
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        delete data[i].created_at
        delete data[i].updated_at
        var fName1 = data[i].first_name_1
        var fName2 = data[i].first_name_2
        var wedDate = data[i].wedding_date
        var template_name = data[i].template_name
        // slice is not working so its printing WAY too much .slice(0, 11)
      }
      console.log(wedDate)
      res.render('./users', { fName1, fName2, wedDate, _layoutFile: 'layout.ejs' })
    })
})


module.exports = router
