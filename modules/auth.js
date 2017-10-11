const auth = (req, res, next) => {
  jwt.verify(req.cookies.token, secret, (err, payload) => {
    if (err) {
      res.status(401)
      return res.send('Not Authorized')
    }
    req.claim = payload.accountId
    next()
  })
}

module.exports = auth
