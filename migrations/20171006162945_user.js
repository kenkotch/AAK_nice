exports.up = (knex, Promise) => {
  return knex.schema.createTable('user', (table) => {
    table.increments()

    table.varchar('username', 63)
      .notNullable()
      .defaultTo('')

    table.specificType('hashed_password', 'CHAR(60)')
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
  return knex.schema.dropTableIfExists('user')
}
