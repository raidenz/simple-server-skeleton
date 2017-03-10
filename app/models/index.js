import Orm from './orm';
import User from './user';
import Post from './post';
import Category from './category';
import Tag from './tag';

const Users = Orm.Collection.extend({
  model: User
});

const Posts = Orm.Collection.extend({
  model: Post
});

const Categories = Orm.Collection.extend({
  model: Category
});

const Tags = Orm.Collection.extend({
  model: Tag
});

export default {
  Orm: Orm,
  User: User,
  Users: Users,
  Post: Post,
  Posts: Posts,
  Category: Category,
  Categories: Categories,
  Tag: Tag,
  Tags: Tags,
};
