var sequence = require('when/sequence');

// requires you to save your model in a seperate file
var PostModel = require('./../app/models/Model');
// import { Post } from './../app/models'; // es6

var categories = [
  {name: 'Uncategories'},
  {name: 'News'},
  {name: 'Tutorial'},
  {name: 'Startup'}
];


var operations = categories.map(function (category) {
  return function () {
    return PostModel.Category.forge(category).save();
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
