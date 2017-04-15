// var ld = require( 'lodash' );
// var _ = ld.noConflict();
// var PostModel = require('./../../models/Model');

import _ from 'lodash';
import PostModel from './../../../../models';

exports.list = function(req, res){
  PostModel.Posts.forge()
  .fetch()
  .then(function (collection) {
    res.jsend.success(collection.toJSON());
  })
  .catch(function (err) {
    // res.status(500).json({error: true, data: {message: err.message}});
    res.jsend.error({code: 500, message: err.message});
  });
};

exports.getId = function(req, res){
    PostModel.Post.forge({id: req.params.id})
    .fetch({withRelated: ['category', 'tags']})
    .then(function (post) {
      if (!post) {
        res.jsend.error({code: 404, message: 'error'});
      }
      else {
        // res.json({error: false, data: post.toJSON()});
        res.jsend.success(post.toJSON());
      }
    })
    .catch(function (err) {
      // res.status(500).json({error: true, data: {message: err.message}});
      res.jsend.error({code: 500, message: err.message});
    });
  };


//post
exports.create = function(req, res){
    var tags = req.body.tags;
    console.log(tags);
    // process.exit();

   // parse tags variable
    if (tags) {
      tags = tags.split(',').map(function (tag){
        return tag.trim();
      });
    }
    else {
      tags = ['uncategorized'];
      // tags = ['uncategorised'];
    }

    // save post variables
    /**
     * Todo:
     * Pick Variable from body
     * or get all body with mass asign protection
     * _.pick(req.body, ['a', 'c']);
     * let {user_id, category_id, title} = req.body;\
     * ...req.body >> ganti post ke html >> input table set
     */
    let {user_id, category_id, title, html} = req.body;
    PostModel.Post.forge({
      // cek
      // user_id: req.body.user_id,
      // category_id: req.body.category_id,
      // title: req.body.title,
      // // slug: req.body.title.replace(/ /g, '-').toLowerCase(),
      // html: req.body.html
      user_id,
      category_id,
      title,
      html
    })
    .save()
    .then(function (post) {

      // post successfully saved
      // save tags
      console.log('tag before save', tags);
      saveTags(tags)
      .then(function (ids) {

        post.load(['tags'])
        .then(function (model) {

          // attach tags to post
          model.tags().attach(ids);

          res.jsend.success({message: 'Tags saved'});
        })
        .catch(function (err) {
          res.jsend.error({code: 500, message: err.message});
        });
      })
      .catch(function (err) {
        res.jsend.error({code: 500, message: err.message});
      });
    })
    .catch(function (err) {
      res.jsend.error({code: 500, message: err.message});
    });
  };


// router.route('/posts/category/:id')
  // .get(function (req, res) {
exports.getCatbyId = function(req, res){
    PostModel.Category.forge({id: req.params.id})
    .fetch({withRelated: ['posts']})
    .then(function (category) {
      var posts = category.related('posts');

      res.jsend.success(posts.toJSON());
    })
    .catch(function (err) {
      res.jsend.error({code: 500, message: err.message});
    });
  // });
};

// router.route('/posts/tag/:slug')
//   .get(function (req, res) {
exports.getTagBySlug = function(req, res){
    PostModel.Tag.forge({slug: req.params.slug})
    .fetch({withRelated: ['posts']})
    .then(function (tag) {
      var posts = tag.related('posts');

      res.jsend.success(posts.toJSON());
    })
    .catch(function (err) {
      res.jsend.error({code: 500, message: err.message});
    });
  // });
  };

function saveTags(tags) {
  console.log('tag inside save', tags);
  var tagObjects = tags.map(function (tag) {
    return {
      name: tag,
      slug: tag.replace(/ /g, '-').toLowerCase()
    };
  });
    // console.log("object", tagObjects);
  return PostModel.Tags.forge()
  // .query('whereIn', 'slug', _.pluck(tagObjects, 'slug'))
  .query('whereIn', 'slug', _.map(tagObjects, 'slug'))
  .fetch()
  .then(function (existingTags) {
    var doNotExist = [];

    existingTags = existingTags.toJSON();
    console.log('tag exist', existingTags);
    if (existingTags.length > 0) {
      var existingSlugs = _.map(existingTags, 'slug');
      // var existingSlugs = _.pluck(existingTags, 'slug');

      doNotExist = tagObjects.filter(function (t) {
        return existingSlugs.indexOf(t.slug) < 0;
      });
    }
    else {
      doNotExist = tagObjects;
    }

    return new PostModel.Tags(doNotExist).mapThen(function(model) {
      return model.save()
      .then(function() {
        return model.get('id');
      });
    })
    .then(function (ids) {
      return _.union(ids, _.map(existingTags, 'id'));
    });
  });
}

// pluck solution
// http://colintoh.com/blog/lodash-10-javascript-utility-functions-stop-rewriting
