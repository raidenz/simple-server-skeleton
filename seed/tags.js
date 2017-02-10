var sequence = require('when/sequence');

// requires you to save your model in a seperate file
var PostModel = require('./../models/Model');
// import { Post } from './../models'; // es6

var tags = [
  {name: 'Bookshelf'},
  {name: 'Nodejs'},
  {name: 'Knex'}
];


var operations = tags.map(function (tag) {
  return function () {
    return PostModel.Tag.forge(tag).save();
    // console.log(post.title);
  }
});

sequence(operations).then(function (createdModels) {
  console.log(createdModels);
  process.exit();
})
.otherwise(function (error) {
  console.error(error.stack);
  process.exit();
});
