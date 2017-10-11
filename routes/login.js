ownerconst express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
  res.render('login', {
    _layoutFile: 'layout.ejs'
  })
})

router.post('/', function(req, res, next) {
  const {
    email,
    password
  } = req.body

  if (!email || !password) {
    res.status(400)
    res.send('Bad email or password')
    return
  }

  knex('account')
    .where('email', email)
    .first()
    .then((data) => {
      let match = bcrypt.compare(password, data.hashed_password)
      if (!match) {
        res.sendStatus(404)
        return
      }
      const token = jwt.sign({
        accountId: data.id
      }, secret)

      res.cookie('token', token, {
        httpOnly: true
      })
      console.log(res.cookie)
      res.status(200)
      res.render('login', {
        _layoutFile: 'layout.ejs'
      })
    })
    .catch((err) => next(err))
})

router.get('/', (req, res, next) => {
  jwt.verify(req.cookies.token, process.env.JWT_KEY, (err, payload) => {
      if (err) {
        return res.send(false)
      }
      res.render('login')
      res.send(true)
    })
    .catch((err) => next(err))
})

router.delete('/', (req, res, next) => {
  res.clearCookie('token')
  res.sendStatus(200)
})

module.exports = router
