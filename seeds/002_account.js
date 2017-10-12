exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex('account').del()
    .then(() => {
      // Inserts seed entries
      return knex('account').insert([{
          id: 1,
          username: 'adamN',
          hashed_password: "$2a$05$q/QusSnYKdQqu/hzrO7uE.ILNFmfc.rOdljX9uqEkO6QkgQagQRP.",
          email: 'test@gmail.com',
          first_name_1: 'Adam',
          last_name_1: 'Neef',
          first_name_2: 'Lisa',
          last_name_2: 'the Magnificent',
          wedding_date: '2018-07-24',
          account_id: 1,
          role: 2,
          template_id: 1
        }, {
          id: 2,
          username: 'Bananas',
          hashed_password: "$2a$05$q/QusSnYKdQqu/hzrO7uE.ILNFmfc.rOdljX9uqEkO6QkgQagQRP.",
          email: 'test2@gmail.com',
          first_name_1: 'Adam',
          last_name_1: 'Neef',
          first_name_2: 'Lisa',
          last_name_2: 'the Magnificent',
          wedding_date: '2018-07-24',
          account_id: 1,
          role: 3,
          template_id: 1
        }, {
          id: 3,
          username: 'survivor',
          hashed_password: "$2a$05$q/QusSnYKdQqu/hzrO7uE.ILNFmfc.rOdljX9uqEkO6QkgQagQRP.",
          email: 'super@gmail.com',
          first_name_1: 'Kelsier',
          last_name_1: 'Survivor',
          first_name_2: 'Mare',
          last_name_2: 'Hathsin',
          wedding_date: '2018-07-24',
          account_id: 3,
          role: 1,
          template_id: 1
        }])
        .then(() => {
          return knex.raw("SELECT setval('account_id_seq',(SELECT MAX(id) FROM account));")
        })
    })
}
