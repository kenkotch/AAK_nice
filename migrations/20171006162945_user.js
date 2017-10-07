exports.up = (knex, Promise) => {
  return knex.schema.createTable('user', (table) => {
    table.increments()
    // if we have a defaultTo here, does that mean a username can be an empty string?
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
