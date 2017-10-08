const express = require('express')
const router = express.Router()
const knex = require('../knex')

// READ for User
router.get('/', (req, res, next) => {
  let id = 1 // id will eventually come from cookie

  let fName1
  let fName2
  let wedDate

  // need to loop through these in ejs to show all of schedule
  let scheduleTime
  let scheduleItem
  let scheduleDescripton
  let newObj

  knex('owner')
    .select('first_name_1', 'first_name_2', 'wedding_date', 'template.template_name', 'schedule.*')
    .where('owner.id', id)
    .innerJoin('schedule', 'owner_id', 'owner.id')
    .innerJoin('template', 'template.id', 'owner.template_id')
    .then((data) => {
      // console.log('data', data)
      // console.log('length', data.length)
      fName1 = data[0].first_name_1
      fName2 = data[0].first_name_2
      wedDate = data[0].wedding_date.toString().slice(0, 15)

      for (let i = 0; i < data.length; i++) {
        delete data[i].created_at
        delete data[i].updated_at
      }

        // scheduleTime = data[i].time
        // scheduleItem = data[i].item
        // scheduleDescripton = data[i].description
        newObj = data
      res.render('./users', {
        // fName1,
        // fName2,
        // wedDate,
        // scheduleTime,
        // scheduleItem,
        // scheduleDescripton,
        data,
        _layoutFile: 'layout.ejs'
      })
      console.log(data)
    })
    .catch((err) => next(err))

})

module.exports = router
