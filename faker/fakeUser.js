var db = require('./../knexfile');
var knex = require('knex')(db.development);
// var knex = require('knex')({
//   client: 'sqlite3',
//   connection: {
//     filename: './test_dev.db', // WARNING buggy switch to ./../test_dev.db for seeding
//     charset: 'utf8'
//   },
//   useNullAsDefault: true, //sqlite only
//   debug: true,
// });
var faker = require ('faker');

// knex('users').insert({
//   name: 'Sxofia Nitzsche',
//   email: 'testxfds@example.com',
//   password: '$2a$12$zB8iemyxFGJtjhSEIDomQuxegkxrjnDG7z5UmsasaW6qoP0gl6IkS',
//   created_at: (Math.round(+new Date()/1000)),
//   updated_at: (Math.round(+new Date()/1000)),
// })
// .then( function (result) {
//     console.log(result);    // respond back to request
//  })
// .catch(function(err){
//   console.log(err);
// });


let createRecord = (knex, id) => {
  return knex('users').insert({
    // id,
    name: faker.internet.userName(),
    email: faker.internet.exampleEmail().toLowerCase(),
    password: '$2a$12$zB8iemyxFGJtjhSEIDomQuxegkxrjnDG7z5UmsasaW6qoP0gl6IkS',
    created_at: new Date(),
    updated_at: new Date()
  })
}

let records = [];

for (let i = 0; i < 5; i++) {
  records.push(createRecord(knex, i))
}

return Promise.all(records)
.then(function(){
  console.log('done!');
  process.exit();
})
.catch(function(err){
  console.log(err);
});
