
exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex('schedule').del()
    .then(() => {
      // Inserts seed entries
      return knex('schedule').insert([
        { id: 1, colName: 'rowValue1' },
        { id: 2, colName: 'rowValue2' },
        { id: 3, colName: 'rowValue3' }
      ])
      .then(() => {
        return knex.raw("SELECT setval('user_id_seq',(SELECT MAX(id) FROM user));")
      })
  })
}
