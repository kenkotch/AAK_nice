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
      }, {
        id: 2,
        hashed_password: "bananaPassword",
        email: 'hello@email.com',
        first_name_1: 'Bob',
        last_name_1: 'Dumbface',
        first_name_2: 'Wanda',
        last_name_2: 'the less than Magnificent',
        template_id: 1
      }, {
        id: 3,
        hashed_password: "applePassword",
        email: 'adamJustYelled@email.com',
        first_name_1: 'Balls',
        last_name_1: 'McSwarmy',
        first_name_2: 'Betty',
        last_name_2: 'Clarkerton',
        template_id: 1
      }

      ])
        .then(() => {
          return knex.raw("SELECT setval('owner_id_seq',(SELECT MAX(id) FROM owner));")
        })
    })
}
