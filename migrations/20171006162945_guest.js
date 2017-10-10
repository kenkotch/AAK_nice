exports.up = (knex, Promise) => {
  return knex.schema.createTable('guest', (table) => {
    table.increments()

    table.varchar('username', 63)
      .notNullable()
      .defaultTo('')
      .unique()

    table.specificType('password', 'CHAR(60)')
      .notNullable()

    table.integer('owner_id')
      .references('id')
      .inTable('owner')
      .onDelete('CASCADE')
      .notNullable()
      .unique()

    table.timestamps(true, true)
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTableIfExists('guest')
}
