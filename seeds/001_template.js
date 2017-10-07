exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex('template').del()
    .then(() => {
      // Inserts seed entries
      return knex('template').insert([{
        id: 1,
        template_name: 'Bananas'
      }])
        .then(() => {
          return knex.raw("SELECT setval('template_id_seq',(SELECT MAX(id) FROM template));")
        })
    })
}
