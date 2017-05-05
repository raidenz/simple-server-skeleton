// var PostModel = require('./../../models/Model');

import _ from 'lodash';
import PostModel from 'models';

exports.list = function(req, res){
  let defQuery = (req.query.page) ? (req.query.page) : 1;
  console.log(defQuery)
  PostModel.Post
  // .query(function(qb){
  //   // qb.where(knex.raw('`tableName`.`columnName`'), conditionValue);
  // })
  .forge()
  .fetchPage({page: defQuery, pageSize: 10})
  .then(function (cooll) {
    res.jsend.success({
      // results: cooll,
      results: cooll.models,
      pagination: cooll.pagination
    });
  })
  .catch(function (err) {
    res.jsend.error({code: 500, message: err.message});
  });
};

exports.getId = function(req, res){
    PostModel.Post.findOne({ id: req.params.id }, { require: true, withRelated: ['category', 'tags'] })
    .then(function (post) {
      res.jsend.success(post.toJSON())
    })
    .catch(function (err) {
      res.jsend.error({code: 500, message: err.message});
    });
  };

//post
exports.create = function(req, res){
  // let tags = req.body.tags;
  let {user_id, category_id, title, html, tags} = req.body;
  // process.exit();
  // parse tags variable
  if (tags) {
    tags = tags.split(',').map(function (tag){
      return tag.trim();
    });
  }
  else {
    tags = ['uncategorized'];
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
  PostModel.Post.forge({
    user_id,
    category_id,
    title,
    html
  })
  .save()
  .then(function (post) {
    /**
     * Post saved then save tags
     * console.log('tag before save', tags);
     */
    console.log('tag before save', tags);
    saveTags(tags)
    .then(function (ids) {

      post.load(['tags'])
      .then(function (model) {
        /**
         * attach tags to post
         */
        model.tags().attach(ids);
        res.jsend.success({message: 'post and tags saved', results: post});
      })
      .catch(function (err) {
        res.status(400).jsend.error({code: 400, message: err.message});
      });
    })
    .catch(function (err) {
      res.status(400).jsend.error({code: 400, message: err.message});
    });
  })
  .catch(function (err) {
    res.status(400).jsend.error({code: 400, message: err.message});
  });
};


// router.route('/posts/category/:id')
exports.getCatbyId = function(req, res){
    PostModel.Category.forge({id: req.params.id})
    .fetch({withRelated: ['posts']})
    .then(function (category) {
      let posts = category.related('posts');
      res.jsend.success(posts.toJSON());
    })
    .catch(function (err) {
      res.jsend.error({code: 500, message: err.message});
    });
};

// router.route('/posts/tag/:slug')
exports.getTagBySlug = function(req, res){
  PostModel.Tag.forge({slug: req.params.slug})
  .fetch({withRelated: ['posts']})
  .then(function (tag) {
    let posts = tag.related('posts');
    res.jsend.success(posts.toJSON());
  })
  .catch(function (err) {
    res.jsend.error({code: 500, message: err.message});
  });
};

function saveTags(tags) {
  console.log('tag inside save', tags);
  let tagObjects = tags.map(function (tag) {
    return {
      name: tag,
      slug: tag.replace(/ /g, '-').toLowerCase()
    };
  });
  // console.log("object", tagObjects);
  return PostModel.Tags.forge()
  .query('whereIn', 'slug', _.map(tagObjects, 'slug'))
  .fetch()
  .then(function (existingTags) {
    let doNotExist = [];

    existingTags = existingTags.toJSON();
    console.log('tag exist', existingTags);
    if (existingTags.length > 0) {
      let existingSlugs = _.map(existingTags, 'slug');
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

//delete
exports.delete = function(req, res){
  PostModel.Post.destroy({ id: req.params.id })
  .then(function (post){
    // console.log(post)
    res.jsend.success({results: `Post ${req.params.id} successfully deleted`});
  })
  .catch(function(err){
    res.status(404).jsend.error({code: 404, message: err.message});
  })
};

// pluck solution
// http://colintoh.com/blog/lodash-10-javascript-utility-functions-stop-rewriting
