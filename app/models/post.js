import DB from './orm';

const Post = DB.Model.extend({

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


export default Post;
