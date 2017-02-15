
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('tags').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('tags').insert({id: 1, name: 'Bookshelf', slug: 'bookshelf'}),
        knex('tags').insert({id: 2, name: 'NodeJS', slug: 'nodejs'}),
        knex('tags').insert({id: 3, name: 'Knex', slug: 'knex'})
      ]);
    });
};
