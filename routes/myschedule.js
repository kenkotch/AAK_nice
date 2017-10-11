const express = require('express')
const boom = require('boom')
const router = express.Router()
const knex = require('../knex')
const jwt = require('jsonwebtoken')
const secret = process.env.JWT_KEY

console.log('\n\n\n\n\nin my Schdule\n\n\n\n\n')

const auth = (req, res, next) => {
  jwt.verify(req.cookies.token, secret, (err, payload) => {
    if(err) {
      res.status(401)
      return res.send('Not Authorized')
    }
    req.claim = payload.ownerId
    next()
  })
}

// C
router.post('/', auth, (req, res, next) => {

    let id = req.claim

    if (!req.body.time || !req.body.time.trim()) {
      res.status(500)
      res.render('error', { message: 'Time cannot be blank' })
    } else if (!req.body.item || !req.body.item.trim()) {
      res.status(500)
      res.render('error', { message: 'Item cannot be blank' })
    } else {
      knex('schedule')
        .insert({
          time: req.body.time,
          item: req.body.item,
          description: req.body.description,
          owner_id: id
        }, '*')
        .then(() => {
          console.log('should render')
          res.redirect('/myschedule')
        })
    }
})

// R info from db
router.get('/', auth, (req, res, next) => {

    let id = req.claim

    console.log('id', id)
    let fName1
    let fName2
    let wedDate

    knex('account')
      .select('first_name_1', 'first_name_2', 'wedding_date', 'template.template_name', 'schedule.*')
      .where('account.id', id)
      .orderBy('time')
      .innerJoin('schedule', 'acccount_id', 'account.id')
      .innerJoin('template', 'template.id', 'account.template_id')
      .then((data) => {
        fName1 = data[0].first_name_1
        fName2 = data[0].first_name_2
        wedDate = data[0].wedding_date.toString().slice(0, 15)

        for (let i = 0; i < data.length; i++) {
          delete data[i].created_at
          delete data[i].updated_at
        }

        res.render(
          'myschedule',
          {
            title: `Welcome to ${fName1} and ${fName2}'s wedding!`,
            data,
            wedDate,
            _layoutFile: 'layout.ejs'
          }
        )
      })
      .catch((err) => {
        next(err)
    })
})

// R to go to edit page
router.get('/:id/edit', (req, res) => {
  const id = req.params.id

  if (typeof id !== 'undefined') {
    knex('schedule')
      .select()
      .where('id', id)
      .first()
      .then((data) => {
        res.render('edit', {
          title: `something is working at id ${id}`,
          id,
          time: data.time,
          item: data.item,
          description: data.description,
          _layoutFile: 'layout.ejs'
        })
      })
  } else {
    res.status(500)
    res.render('error', { message: 'something went wrong' })
  }
})

// U
router.patch('/:id', (req, res, next) => {
  const id = Number(req.params.id)

  if (Number.isNaN(id)) {
    return next()
  }

  knex('schedule')
    .where('id', id)
    .then((rows) => {
      if (!rows) {
        throw boom.create(404, 'Not Found')
      }

      const { time, item, description } = req.body
      const updateRow = {}

      if (time) {
        updateRow.time = time
      }

      if (item) {
        updateRow.item = item
      }

      if (description) {
        updateRow.description = description
      }

      knex('schedule')
        .update(updateRow, '*')
        .where('id', id)
        .then((row) => {
          res.send(row[0])
        })
    })
    .catch((err) => {
      next(err)
    })
})

// D
router.delete('/:id', (req, res, next) => {
  const id = Number(req.params.id)

  if (Number.isNaN(id)) {
    return next()
  }

  let event

  knex('schedule')
    .where('id', id)
    .then((row) => {
      if (!row) {
        throw boom.create(404, 'Not Found')
      }
      event = row

      return knex('schedule')
        .del()
        .where('id', id)
    })
    .then(() => {
      delete event.id
      res.send(event)
    })
    .catch((err) => {
      next(err)
    })
})

module.exports = router
