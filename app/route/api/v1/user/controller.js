// var PostModel = require('./../../models/Model');
// import PostModel from './../../models/Model';
// console.log(__dirname);
import PostModel from 'models';
// import PostModel from './../../../../models';

exports.list = function(req, res){
  PostModel.Users.forge()
  .fetch()
  .then(function (collection) {
    res.json({error: false, data: collection.toJSON()});
  })
  .catch(function (err) {
    res.status(500).json({error: true, data: {message: err.message}});
  });
};

exports.create = function(req, res){
  PostModel.User.forge({
    name: req.body.name,
    email: req.body.email
  })
  .save()
  .then(function (user) {
    res.json({error: false, data: {id: user.get('id')}});
  })
  .otherwise(function (err) {
    res.status(500).json({error: true, data: {message: err.message}});
  });
};
exports.getId = function(req, res){
  PostModel.User.forge({id: req.params.id})
    .fetch()
    .then(function (user) {
      if (!user) {
        res.status(404).json({error: true, data: {}});
      }
      else {
        res.json({error: false, data: user.omit('password')});
      }
    })
    .catch(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
  });
};

//put
exports.update = function(req, res){
  PostModel.User.forge({id: req.params.id})
    .fetch({require: true})
    .then(function (user) {
      user.save({
        name: req.body.name || user.get('name'),
        email: req.body.email || user.get('email')
      })
      .then(function () {
        res.json({error: false, data: {message: 'User details updated'}});
      })
      .catch(function (err) {
        res.status(500).json({error: true, data: {message: err.message}});
      });
    })
    .catch(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
  });
};

//delete
exports.delete = function(req, res){
  PostModel.User.forge({id: req.params.id})
    .fetch({require: true})
    .then(function (user) {
      user.destroy()
      .then(function () {
        res.json({error: true, data: {message: 'User successfully deleted'}});
      })
      .catch(function (err) {
        res.status(500).json({error: true, data: {message: err.message}});
      });
    })
    .catch(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
  });
};
