
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('people', function (table) {
    table.increments('person_id').primary();
    table.string('full_name', 50);
    table.boolean('deceased');
  })
  .then(function () {
    return knex.schema.createTableIfNotExists('role', function (table) {
      table.integer('person_id').references('people.person_id')
      .onDelete('CASCADE');
      table.boolean('Assassin').defaultTo(false);
      table.boolean('Target').defaultTo(false);
      table.boolean('Client').defaultTo(false);
    });
  });
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('role')
    .then(function () {
      return knex.schema.dropTableIfExists('people');
    })
};
