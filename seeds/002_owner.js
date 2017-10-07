
exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex('owner').del()
    .then(() => {
      // Inserts seed entries
      return knex('owner').insert([
        { id: 1, colName: 'rowValue1' },
        { id: 2, colName: 'rowValue2' },
        { id: 3, colName: 'rowValue3' }
      ])
      .then(() => {
        return knex.raw("SELECT setval('owner_id_seq',(SELECT MAX(id) FROM owner));")
      })
  })
}
