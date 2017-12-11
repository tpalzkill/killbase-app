
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('contracts', function (table) {
    table.increments('contract_id').primary();
    table.integer('target_id').unsigned()
    .references('target_id')
    .inTable('targets')
    .onDelete('CASCADE')
    .index();
    table.integer('client_id').unsigned()
    .references('client_id')
    .inTable('clients')
    .onDelete('CASCADE')
    .index();
    table.integer('budget');
    table.boolean('completed');
    table.integer('completed_by_ass_id').unsigned()
    .references('assassin_id')
    .inTable('assassins')
    .onDelete('CASCADE')
    .index();
  })
  .then(function () {
    return knex.schema.createTableIfNotExists('ass_con', function (table) {
      table.integer('assassin_id').unsigned()
      .references('assassin_id')
      .inTable('assassins')
      .onDelete('CASCADE')
      .index();
      table.integer('contract_id').unsigned()
      .references('contract_id')
      .inTable('contracts')
      .onDelete('CASCADE')
      .index();
    });
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('ass_con')
    .then(function () {
      return knex.schema.dropTableIfExists('contracts');
    })
};
