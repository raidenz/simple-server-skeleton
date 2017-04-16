var db = require('./../knexfile');
var knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: './test_dev.db', // WARNING buggy switch to ./../test_dev.db for seeding
    charset: 'utf8'
  },
  useNullAsDefault: true, //sqlite only
});
var faker = require ('faker');

// var telo = knex.select('*').from('users');
// var telo = knex.select().table('users');
// console.log(telo)
// var test = knex('users').insert({id: 6, name: 'Sofia Nitzsche', email: 'sofia_nitzsche@example.com', password: '$2a$12$zB8iemyxFGJtjhSEIDomQuxegkxrjnDG7z5UmsasaW6qoP0gl6IkS', created_at: (Math.round(+new Date()/1000)), updated_at: (Math.round(+new Date()/1000))})
var test = knex('users').insert({name: 'Sofia Nitzsche', email: 'sofia_nitzsche@example.com', password: '$2a$12$zB8iemyxFGJtjhSEIDomQuxegkxrjnDG7z5UmsasaW6qoP0gl6IkS', created_at: (Math.round(+new Date()/1000)), updated_at: (Math.round(+new Date()/1000))})
console.log(test)


// let createRecord = (knex, id) => {
//   return knex('users').insert({
//     // id,
//     name: faker.internet.userName(),
//     email: faker.internet.exampleEmail(),
//     created_at: new Date(),
//     updated_at: new Date()
//   })
// }

// let records = [];

// for (let i = 1; i < 2; i++) {
//   records.push(createRecord(knex, i))
// }

// return Promise.all(records);
// // .then(function(){
// //   console.log('done?')
// // })
// // .catch(function(err){
// //   console.log(err);
// // });
// console.log(records);
