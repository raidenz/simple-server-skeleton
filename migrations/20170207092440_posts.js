
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('posts', function(table){
      table.increments('id').unsigned().primary();
      table.integer('user_id');
      table.integer('category_id');
      table.string('title');
      table.string('slug');
      table.text('html');
      table.timestamps();
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('posts')
  ])
};
