exports.up = (knex, Promise) => {
  return knex.schema.createTable('schedule', (table) => {
    table.increments()
    // should type be datetime? would be easier to convert from 12hr to 24hr and vice versa
    table.varchar('time', 63)
      .notNullable()
      .defaultTo('')

    table.text('event')
      .notNullable()
      .defaultTo('')

    table.text('description')
      .notNullable()
      .defaultTo('')

    table.integer('owner_id')
      .references('id')
      .inTable('owner')
      .onDelete('CASCADE')
      .notNullable()

    table.timestamps(true, true)
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTableIfExists('schedule')
}
