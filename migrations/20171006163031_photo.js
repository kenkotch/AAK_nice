exports.up = (knex, Promise) => {
  return knex.schema.createTable('photo', (table) => {
    table.increments()

    table.integer('owner_id')
      .references('id')
      .inTable('owner')
      .onDelete('CASCADE')
      .notNullable()
      // base64 would mean there is a photo- so should we remove .notNullable and default to?
    table.text('base64')
      .notNullable()
      .defaultTo('')

    table.timestamps(true, true)
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTableIfExists('photo')
}
