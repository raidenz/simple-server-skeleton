
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  let now = (Math.round(+new Date()/1000));
  return knex('categories').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('categories').insert({id: 1, name: 'Uncategories' , created_at: now, updated_at: now }),
        knex('categories').insert({id: 2, name: 'news' , created_at: now, updated_at: now }),
        knex('categories').insert({id: 3, name: 'Tutorial' , created_at: now, updated_at: now }),
        knex('categories').insert({id: 4, name: 'Startup' , created_at: now, updated_at: now })

      ]);
    });
};
