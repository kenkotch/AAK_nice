exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex('photo').del()
    .then(() => {
      // Inserts seed entries
      return knex('photo').insert([{
        id: 1,
        colName: 'rowValue1'
      }])
        .then(() => {
          return knex.raw("SELECT setval('photo_id_seq',(SELECT MAX(id) FROM photo));")
        })
    })
}
