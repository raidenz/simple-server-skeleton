
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('posts_tags', function(table){
      table.integer('post_id');
      table.integer('tag_id');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('posts_tags')
  ])
};
