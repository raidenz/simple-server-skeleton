import DB from './orm';

const Category = DB.Model.extend({

  tableName: 'categories',

  posts: function () {
    return this.hasMany(Post);
  }
});


export default Category;
