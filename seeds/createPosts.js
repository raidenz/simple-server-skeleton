
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  let now = (Math.round(+new Date()/1000));
  return knex('posts').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('posts').insert({ id: 1, user_id: 1, category_id: 1, title: 'Title 1',slug: 'title-1', html: '<p>Lorem ipsum dolor sit amet, graeco efficiendi ne nec, no cibo possit vix</p>', created_at: now, updated_at: now }),
        knex('posts').insert({ id: 2, user_id: 1, category_id: 1, title: 'Title 2',slug: 'title-2', html: '<p>Lorem ipsum dolor sit amet, graeco efficiendi ne nec, no cibo possit vix</p>', created_at: now, updated_at: now }),
        knex('posts').insert({ id: 3, user_id: 1, category_id: 1, title: 'Title 3',slug: 'title-3', html: '<p>Lorem ipsum dolor sit amet, graeco efficiendi ne nec, no cibo possit vix</p>', created_at: now, updated_at: now }),
        knex('posts').insert({ id: 4, user_id: 1, category_id: 1, title: 'Title 4',slug: 'title-4', html: '<p>Lorem ipsum dolor sit amet, graeco efficiendi ne nec, no cibo possit vix</p>', created_at: now, updated_at: now })
      ]);
    });
};
