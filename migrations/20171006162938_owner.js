exports.up = (knex, Promise) => {
  return knex.schema.createTable('owner', (table) => {
    table.increments()
    // if we have a defaultTo here, does that mean a username can be an empty string?
    // same for email and names?
    /*This is a weird situation - we don't want the row to be blank, but if we want to set .notNullable(), we HAVE to set a default value.
    So I feel like setting .notNullable and .defaultTo('') is the lesser of both evils.  This way,
    the field can't be left blank, and we can put a check in later on to ensure our owner puts in their data.
    And if it's an empty string, we'll know it's blank - Heavily-Bearded Adam.
    */
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
