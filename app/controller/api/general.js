var PostModel = require('./../../models/Model');
var _ = require('lodash');

exports.users = function(req, res){
  PostModel.Users.forge()
  .fetch()
  .then(function (collection) {
    // console.log(JSON.stringify(collection.toJSON()));
    // var usercol = JSON.stringify(collection.toJSON());
    // var usercol = (collection.toJSON());
    // var usercol = _.map(_.omit('password'));
    var usercol = _.map(collection.toJSON(), function(entry) {
      return _.omit(entry, 'password');
    });
    // console.log(yes);
    // console.log(_.omit(usercol, ['password']));
    // res.json({error: false, data: collection.toJSON()});
    res.json({error: false, data: usercol});
  })
  .catch(function (err) {
    res.status(500).json({error: true, data: {message: err.message}});
  });
};
exports.posts = function(req, res){
  PostModel.Posts.forge()
  .fetch()
  .then(function (collection) {
    res.json({error: false, data: collection.toJSON()});
  })
  .catch(function (err) {
    res.status(500).json({error: true, data: {message: err.message}});
  });
};
exports.categories = function(req, res){
    PostModel.Categories.forge()
    .fetch()
    .then(function (collection) {
      res.json({error: false, data: collection.toJSON()});
    })
    .catch(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });
  // });
}

