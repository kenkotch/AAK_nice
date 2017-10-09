exports.up = (knex, Promise) => {
  return knex.schema.createTable('guest', (table) => {
    table.increments()

    table.varchar('username', 63)
      .notNullable()
      .defaultTo('')
      .unique()

    table.varchar('password', 63)
      .notNullable()

    table.integer('owner_id')
      .references('id')
      .inTable('owner')
      .onDelete('CASCADE')
      .notNullable()

    table.timestamps(true, true)
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTableIfExists('guest')
}
