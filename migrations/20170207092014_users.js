// var schema = function(t) {
//   t.increments().primary();
//   t.string('first_name');
//   t.string('last_name');
//   t.timestamps();
// };

exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', function(table){
      table.increments('id').unsigned().primary();
      table.string('name');
      table.string('email');
      table.string('password');
      table.timestamps();
    })
    // knex.schema.createTable('users', schema)
    // .then(function() {
    //   console.log('User table created.');
    // });
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users')
    // .then(function() {
    //   console.log('User table Dropped.');
    // });
  ])
};
