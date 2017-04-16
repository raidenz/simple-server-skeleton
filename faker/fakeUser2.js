var sequence = require('when/sequence');

// requires you to save your model in a seperate file
var PostModel = require('./../app/models/Model');
var faker = require('faker/locale/de');
// import { Post } from './../models'; // es6

PostModel.User.forge({
  email: faker.internet.email().toLowerCase(),
  name: faker.name.findName(),
  password: 'secret'
}).save().then(function(){
  console.log("ok");
  process.exit();
});
