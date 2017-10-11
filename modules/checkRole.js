let role

const checkRole = (req, res, next) => {
  knex('account')
    .select('role')
    .first()
    .where('id', req.claim)
    .then((data) => {
      role = data.role
      next()
    })
}

module.exports = checkRole
