
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('posts', function(table){
      table.increments('id').unsigned().primary();
      table.integer('user_id').unsigned().references('users.id');
      table.integer('category_id').unsigned().references('categories.id');
      table.string('title');
      table.string('slug');
      table.text('html');
      table.timestamps();
    }).createTable('tags', function(table){
      table.increments('id').unsigned().primary();
      table.string('name');
      table.string('slug');
      table.timestamps();
    }).createTable('posts_tags', function(table){
      table.integer('post_id').unsigned().references('posts.id');
      table.integer('tag_id').unsigned().references('tags.id');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('posts')
      .dropTable('tags')
      .dropTable('posts_tags')
  ])
};
