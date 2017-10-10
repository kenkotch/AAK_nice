exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex('schedule').del()
    .then(() => {
      // Inserts seed entries
      return knex('schedule').insert([{
        id: 1,
        time: "09:30",
        item: "test_event",
        description: "this event is a test",
        owner_id: 1
      }, {
        id: 2,
        time: "10:30",
        item: "another event",
        description: "this event is a mean",
        owner_id: 1
      }, {
        id: 3,
        time: "11:00",
        item: "mas event",
        description: "this event is a nice",
        owner_id: 1
      }, {
        id: 4,
        time: "8:27",
        item: "breakfast event",
        description: "why are we awake?",
        owner_id: 2
      }, {
        id: 5,
        time: "11:27",
        item: "brunch event",
        description: "No. Really. Why are we awake?",
        owner_id: 2
      }])
        .then(() => {
          return knex.raw("SELECT setval('schedule_id_seq',(SELECT MAX(id) FROM schedule));")
        })
    })
}
