exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex('owner').del()
    .then(() => {
      // Inserts seed entries
      return knex('owner').insert([{
        id: 1,
        hashed_password: "hashed_pass",
        email: 'test@gmail.com',
        first_name_1: 'Adam',
        last_name_1: 'Neef',
        first_name_2: 'Lisa',
        last_name_2: 'the Magnificent',
        template_id: 1
      }

      ])
        .then(() => {
          return knex.raw("SELECT setval('owner_id_seq',(SELECT MAX(id) FROM owner));")
        })
    })
}
