/**
 * Created by greg on 27/04/15.
 */
// var Orm = require('./../../config/db').bookshelf;

import bcrypt from 'bcrypt';

import Knex from 'knex';
import Bookshelf from 'bookshelf';
import Config from '../../knexfile';

const Orm = new Bookshelf(new Knex(Config.development));
// const Orm = new Bookshelf;

// enable Bookshelf plugins
Orm.plugin(require('bookshelf-slug'));
Orm.plugin(require('bookshelf-bcrypt'));

Orm.plugin('registry');
Orm.plugin('virtuals');
Orm.plugin('visibility');

export default Orm;
