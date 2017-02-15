
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('categories').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('categories').insert({id: 1, name: 'Uncategories'}),
        knex('categories').insert({id: 2, name: 'news'}),
        knex('categories').insert({id: 3, name: 'Tutorial'}),
        knex('categories').insert({id: 4, name: 'Startup'})

      ]);
    });
};
