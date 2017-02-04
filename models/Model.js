var Bookshelf = require('./../config/db').bookshelf;
Bookshelf.plugin(require('bookshelf-slug'))
/*
 *   Models
**/

// User model
var User = Bookshelf.Model.extend({
  tableName: 'users',
  // slug: {
  //   column: 'slug',
  //   items: ['title']
  // }
});

// Post model
var Post = Bookshelf.Model.extend({

  tableName: 'posts',
  slug: ['title'],
  hasTimestamps: true,

  category: function () {
    return this.belongsTo(Category, 'category_id');
  },

  tags: function () {
    return this.belongsToMany(Tag);
  },

  author: function () {
    return this.belongsTo(User);
  }
});

// Category model
var Category = Bookshelf.Model.extend({

  tableName: 'categories',

  posts: function () {
    return this.hasMany(Post);
  }
});

// Tag model
var Tag = Bookshelf.Model.extend({

  tableName: 'tags',
  slug: ['name'],

  posts: function () {
    return this.belongsToMany(Post);
  }
});


var Users = Bookshelf.Collection.extend({
  model: User
});

var Posts = Bookshelf.Collection.extend({
  model: Post
});

var Categories = Bookshelf.Collection.extend({
  model: Category
});

var Tags = Bookshelf.Collection.extend({
  model: Tag
});

module.exports = {
  User: User,
  Post: Post,
  Category: Category,
  Tag: Tag,
  Users: Users,
  Posts: Posts,
  Categories: Categories,
  Tags: Tags
};
