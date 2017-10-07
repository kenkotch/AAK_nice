exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex('owner').del()
    .then(() => {
      // Inserts seed entries
      return knex('owner').insert([{
        id: 1,
        username: 'testing',
        hashed_password: "hashed_pass",
        email: 'test@gmail.com',
        names: 'Adam and Lisa',
        template_id: 1
      }

      ])
        .then(() => {
          return knex.raw("SELECT setval('owner_id_seq',(SELECT MAX(id) FROM owner));")
        })
    })
}
