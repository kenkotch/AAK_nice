const express = require('express')
const router = express.Router()
const knex = require('../knex')

// GET a list of all TODOS

// SELECT id, item FROM owner ORDER BY id
router.get('/', (req, res, next) => {
  knex('owner')
    .select('id', 'item')
    .orderBy('id')
    .then((items) => {
      res.setHeader('Content-Type', 'application/json')
      res.send(JSON.stringify(items))
    })
    .catch((err) => next(err))
})

// GET a single to do
// SELECT id, item FROM owner WHERE id = ? ORDER BY id
router.get('/:id', (req, res, next) => {
  const id = req.params.id

  knex('owner')
    .select('id', 'item')
    .orderBy('id')
    .where('id', id)
    .then((items) => {
      if (items.length < 1) {
        return res.sendStatus(404)
      }

      res.setHeader('Content-Type', 'application/json')
      res.send(JSON.stringify(items[0]))
    })
    .catch((err) => next(err))
})

// POST a new item to do
// INSERT INTO owner(item) VALUES(?)
router.post('/', (req, res, next) => {
  const { item } = req.body

  knex('owner')
    .insert({item: item}, 'id')
    .then((id) => {
      res.sendStatus(200)
    })
    .catch((err) => next(err))
})

// PATCH and existing to do
// UPDATE owner SET item = ? WHERE id = ?
router.patch('/:id', (req, res, next) => {
  const { item } = req.body
  const id = req.params.id

  knex('owner')
    .update({item: item})
    .where('id', id)
    .then((rowsAffected) => {
      if (rowsAffected !== 1) {
        return res.sendStatus(404)
      }

      res.sendStatus(200)
    })
    .catch((err) => next(err))
})

// DELETE something that you have done with satisfaction
// DELETE FROM owner WHERE id = ?
router.delete('/:id', (req, res, next) => {
  const id = req.params.id

  knex('owner')
    .del()
    .where('id', id)
    .then((rowsAffected) => {
      if (rowsAffected !== 1) {
        return res.sendStatus(404)
      }

      res.sendStatus(200)
    })
    .catch((err) => next(err))
})

module.exports = router
