var sequence = require('when/sequence');

// requires you to save your model in a seperate file
var PostModel = require('./../models/Model');
var faker = require('faker/locale/de');
// import { Post } from './../models'; // es6

PostModel.User.forge({
  email: faker.internet.email(),
  name: faker.name.findName()
}).save().then(function(){
  console.log("ok");
  process.exit();
});
