// var PostModel = require('./../../models/Model');
import PostModel from './../../models/Model';

// router.route('/categories')
//   // fetch all categories
//   .get(function (req, res) {
exports.list = function(req, res){
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

  // create a new category
  // .post(function (req, res) {
exports.create = function(req, res){
    PostModel.Category.forge({name: req.body.name})
    .save()
    .then(function (category) {
      res.json({error: false, data: {id: category.get('id')}});
    })
    .catch(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });
  // });
};

// router.route('/categories/:id')
//   // fetch all categories
//   .get(function (req, res) {
exports.getId = function(req, res){
    PostModel.Category.forge({id: req.params.id})
    .fetch()
    .then(function (category) {
      if(!category) {
        res.status(404).json({error: true, data: {}});
      }
      else {
        res.json({error: false, data: category.toJSON()});
      }
    })
    .catch(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });
  // })
  };

  // update a category
  // .put(function (req, res) {
exports.update = function(req, res){
    PostModel.Category.forge({id: req.params.id})
    .fetch({require: true})
    .then(function (category) {
      category.save({name: req.body.name || category.get('name')})
      .then(function () {
        res.json({error: false, data: {message: 'Category updated'}});
      })
      .catch(function (err) {
        res.status(500).json({error: true, data: {message: err.message}});
      });
    })
    .catch(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });
  // })
  };

  // delete a category
  // .delete(function (req, res) {
exports.delete = function(req, res){
    PostModel.Category.forge({id: req.params.id})
    .fetch({require: true})
    .then(function (category) {
      category.destroy()
      .then(function () {
        res.json({error: true, data: {message: 'Category successfully deleted'}});
      })
      .catch(function (err) {
        res.status(500).json({error: true, data: {message: err.message}});
      });
    })
    .catch(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });
// });
};
