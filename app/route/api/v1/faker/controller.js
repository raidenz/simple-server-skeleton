// let PostModel = require('./../../models/Model');
import PostModel from 'models';
import faker from 'faker';
const { populate, saveDb } = require('./helper');
const {
  fakeCategory,
  fakeTag,
  fakeUser,
  fakePost,
} = require('./schema');


exports.fakerPost = function(req, res){
  let fakepost = populate(req.params.num, fakePost);
  // console.log(req.params.num)

  Promise.all([fakepost]).then(([fakepost]) => {
    // console.log(fakecat)
    let post = PostModel.Posts.forge(fakepost)
    post.invokeThen('save').then(function() {
      res.jsend.success({hasil: 'save post oke'});
    });
  });
}
exports.fakerUser = function(req, res){
  let fakeuser = populate(req.params.num, fakeUser);
  // console.log(req.params.num)

  Promise.all([fakeuser]).then(([fakeuser]) => {
    // console.log(fakecat)
    let category = PostModel.Users.forge(fakeuser)
    category.invokeThen('save').then(function() {
      res.jsend.success({hasil: 'save user oke'});
    });
  });
}
exports.fakerCategory = function(req, res){
  let fakecat = populate(req.params.num, fakeCategory);
  // console.log(req.params.num)

  Promise.all([fakecat]).then(([fakecat]) => {
    // console.log(fakecat)
    let category = PostModel.Categories.forge(fakecat)
    category.invokeThen('save').then(function() {
      res.jsend.success({hasil: 'save category oke'});
    });
  });

}
exports.fakerTag = function(req, res){
    Promise.all([faketag]).then(([faketag]) => {
    // console.log(faketag)
    let tag = PostModel.Tags.forge(faketag)
    tag.invokeThen('save').then(function() {
      res.jsend.success({hasil: 'save tag oke'});
    });
  });
}
