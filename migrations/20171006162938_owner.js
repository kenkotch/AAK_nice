exports.up = (knex, Promise) => {
  return knex.schema.createTable('owner', (table) => {
    table.increments()
    // if we have a defaultTo here, does that mean a username can be an empty string?
    // same for email and names?
    table.varchar('username', 63)
      .notNullable()
      .defaultTo('')

    table.specificType('hashed_password', 'CHAR(60)')
      .notNullable()

    table.varchar('email', 63)
      .notNullable()
      .defaultTo('')

    table.varchar('names')
      .notNullable()
      .defaultTo('')

    table.integer('template_id')
      .references('id')
      .inTable('template')
      .onDelete('CASCADE')
      .notNullable()

    table.timestamps(true, true)
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTableIfExists('owner')
}
