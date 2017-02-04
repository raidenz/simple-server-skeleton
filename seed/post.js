var sequence = require('when/sequence');

// requires you to save your model in a seperate file
var PostModel = require('./../models/Model');
// import { Post } from './../models'; // es6

var posts = [
  {title: 'Title 5', html: '<p>Lorem ipsum dolor sit amet, graeco efficiendi ne nec, no cibo possit vix</p>'},
  {title: 'Title 6', html: '<p>Lorem ipsum dolor sit amet, graeco efficiendi ne nec, no cibo possit vix</p>'},
  {title: 'Title 7', html: '<p>Lorem ipsum dolor sit amet, graeco efficiendi ne nec, no cibo possit vix</p>'},
  {title: 'Title 8', html: '<p>Lorem ipsum dolor sit amet, graeco efficiendi ne nec, no cibo possit vix</p>'}
];


var operations = posts.map(function (post) {
  return function () {
    return PostModel.Post.forge(post).save();
    // console.log(post.title);
  }
});


sequence(operations).then(function (createdModels) {
  console.log(createdModels);
})
.otherwise(function (error) {
  console.error(error.stack);
});
