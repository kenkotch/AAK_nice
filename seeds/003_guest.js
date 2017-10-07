exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex('guest').del()
    .then(() => {
      // Inserts seed entries
      return knex('guest').insert([{
        id: 1,
        username: 'test_user1',
        hashed_password: 'test_user1',
        owner_id: 1
      }])
        .then(() => {
          return knex.raw("SELECT setval('guest_id_seq',(SELECT MAX(id) FROM guest));")
        })
    })
}
