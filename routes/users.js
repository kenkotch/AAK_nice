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
        var fName1 = data[0].first_name_1
        var fName2 = data[0].first_name_2
        var wedDate = data[0].wedding_date.toString().slice(0, 15)

        // need to loop through these in ejs to show all of schedule
        var scheduleTime = data[i].time
        var scheduleItem = data[i].item
        var scheduleDescripton = data[i].description

        // console.log(wedDate)
      }
      res.render('./users', {
        fName1,
        fName2,
        wedDate,
        scheduleTime,
        scheduleItem,
        scheduleDescripton,
        _layoutFile: 'layout.ejs'
      })
    })
})


module.exports = router
