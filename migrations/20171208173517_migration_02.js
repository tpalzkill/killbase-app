
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('assassins', function (table) {
    table.integer('person_id').unsigned()
    .references('person_id')
    .inTable('people')
    .onDelete('CASCADE')
    .index();
    table.increments('assassin_id').primary();
    table.string('weapon', 50);
    table.string('contact_info');
    table.integer('age');
    table.integer('min_price');
    table.float('rating');
    table.integer('kills');
  })
  .then(function () {
    return knex.schema.createTableIfNotExists('targets', function (table) {
      table.integer('person_id').unsigned()
      .references('person_id')
      .inTable('people')
      .onDelete('CASCADE')
      .index();
      table.increments('target_id').primary();
      table.string('location');
      table.string('photo');
      table.float('sec_level');
    });
  })
  .then(function () {
    return knex.schema.createTableIfNotExists('clients', function (table){
      table.integer('person_id').unsigned()
      .references('person_id')
      .inTable('people')
      .onDelete('CASCADE')
      .index();
      table.increments('client_id').primary();
    })
  })
  .then(function () {
    return knex.schema.createTableIfNotExists('codenames', function (table){
      table.integer('assassin_id').unsigned()
      .references('assassin_id')
      .inTable('assassins')
      .onDelete('CASCADE')
      .index();
      table.string('code_name');
    })
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('codenames')
    .then(function () {
      return knex.schema.dropTableIfExists('clients')
      .then( function () {
        return knex.schema.dropTableIfExists('targets')
        .then(function () {
        return knex.schema.dropTableIfExists('assassins')
      })
      })
    })
};
