if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const engine = require('ejs-mate')

// Adam N. add 10/9/17 - trying to get our app to route to a homepage, then we can navigate from there
// const index = require('./routes/index')
const register = require('./routes/register')
const login = require('./routes/login')
const token = require('./routes/token')
// const users = require('./routes/users')
const schedule = require('./routes/schedule')
const profile = require('./routes/profile')

const app = express()

// view engine setup
app.set('view engine', 'ejs')
app.engine('ejs', engine)

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', login)
app.use('/register', register)
app.use('/login', login)
app.use('/token', token)
app.use('/schedule', schedule)
app.use('/profile', profile)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
