import DB from './orm';

const Tag = DB.Model.extend({

  tableName: 'tags',
  slug: ['name'],

  posts: function () {
    return this.belongsToMany('Tag');
  }
});

// export default Tag;
export default DB.model('Tag', Tag);
