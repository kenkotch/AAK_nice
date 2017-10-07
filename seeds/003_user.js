exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex('user').del()
    .then(() => {
      // Inserts seed entries
      return knex('user').insert([{
        id: 1,
        username: 'test_user1',
        hashed_password: 'test_user1',
        owner_id: 1
      }])
        .then(() => {
          return knex.raw("SELECT setval('user_id_seq',(SELECT MAX(id) FROM user));")
        })
    })
}
