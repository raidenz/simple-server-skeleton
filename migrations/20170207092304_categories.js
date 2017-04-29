
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('categories', function(table){
      table.increments('id').unsigned().primary();
      table.string('name');
      table.timestamps();
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('categories')
  ])
};
