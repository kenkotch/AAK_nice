exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex('schedule').del()
    .then(() => {
      // Inserts seed entries
      return knex('schedule').insert([{
        id: 1,
        time: "9:30",
        item: "test_event",
        description: "this event is a test",
        owner_id: 1
      }])
        .then(() => {
          return knex.raw("SELECT setval('schedule_id_seq',(SELECT MAX(id) FROM schedule));")
        })
    })
}
