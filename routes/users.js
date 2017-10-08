const express = require('express')
const router = express.Router()
const knex = require('../knex')

// READ for User
router.get('/', (req, res) => {
  let id = 1 // id will eventually come from cookie
  knex('owner')
    .select('first_name_1', 'first_name_2', 'template.template_name', 'schedule.*')
    .where('owner.id', id)
    .innerJoin('schedule', 'owner_id', 'owner.id')
    .innerJoin('template', 'template.id', 'owner.template_id')
    .then((data) => {
      // let newObj =  {
      //   data.first_name_1,
      //   data.first_name_2,
      //   data.template_name
      // }

      for (let i = 0; i < data.length; i++) {
        delete data[i].created_at
        delete data[i].updated_at
        var fName_1 = data[i].first_name_1
        var fName_2 = data[i].first_name_2
      }
      console.log(fName_1, fName_2)

      res.render('./users', { title: fName_1, _layoutFile: 'layout.ejs' })
    })
})


module.exports = router
