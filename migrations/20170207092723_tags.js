
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('tags', function(table){
      table.increments('id').unsigned().primary();
      table.string('name');
      table.string('slug');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('tags')
  ])
};
