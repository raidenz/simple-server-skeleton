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

/**
 * Todo:
 * Add Modelbase
 * https://github.com/bsiddiqui/bookshelf-modelbase
 * Orm.plugin(require('bookshelf-modelbase').pluggable);
 *
 * add mass asignment
 * read https://github.com/tanbrian/bookshelf-mass-assignment
 * Orm.plugin('bookshelf-mass-assignment');
 */
Orm.plugin(require('bookshelf-modelbase').pluggable);
// Orm.plugin('bookshelf-mass-assignment');

Orm.plugin('registry');
Orm.plugin('virtuals');
Orm.plugin('visibility');
Orm.plugin('pagination');

export default Orm;
