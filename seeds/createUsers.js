
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        // knex('users').insert({id: 1, name: 'Sofia Nitzsche', email: 'sofia_nitzsche@example.com', password: '$2a$12$zB8iemyxFGJtjhSEIDomQuxegkxrjnDG7z5UmsasaW6qoP0gl6IkS', created_at: (knex.fn.now()), updated_at: (knex.fn.now())}),
        knex('users').insert({id: 1, name: 'Sofia Nitzsche', email: 'sofia_nitzsche@example.com', password: '$2a$12$zB8iemyxFGJtjhSEIDomQuxegkxrjnDG7z5UmsasaW6qoP0gl6IkS', created_at: (Math.round(+new Date()/1000)), updated_at: (Math.round(+new Date()/1000))}),
        knex('users').insert({id: 2, name: 'Jon Zinser', email: 'jon_zinser@example.com', password: '$2a$12$zB8iemyxFGJtjhSEIDomQuxegkxrjnDG7z5UmsasaW6qoP0gl6IkS', created_at: (Math.round(+new Date()/1000)), updated_at: (Math.round(+new Date()/1000))}),
        knex('users').insert({id: 3, name: 'Laurens Harnapp', email: 'laurens_harnapp@example.com', password: '$2a$12$zB8iemyxFGJtjhSEIDomQuxegkxrjnDG7z5UmsasaW6qoP0gl6IkS', created_at: (Math.round(+new Date()/1000)), updated_at: (Math.round(+new Date()/1000))}),
        knex('users').insert({id: 4, name: 'Juliane Diezel', email: 'juliane_diezel@example.com', password: '$2a$12$zB8iemyxFGJtjhSEIDomQuxegkxrjnDG7z5UmsasaW6qoP0gl6IkS', created_at: (Math.round(+new Date()/1000)), updated_at: (Math.round(+new Date()/1000))})
      ]);
    });
};
