/**
 *  Abandoned for test
 */
/*var knex = require('knex')({
  client: 'mysql',
  connection: {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test_densss',
    charset: 'utf8'
  }
});*/
// var Bookshelf = require('bookshelf')(knex);

// module.exports.Bookshelf = Bookshelf;

var DBConfig = {
  client: 'mysql',
  connection: {
    host: '10.0.2.2', //vagrant set ip
    user: 'root',
    password: '',
    database: 'test_densss',
    charset: 'utf8'
  }
};


var knex = require('knex')(DBConfig);
var bookshelf = require('bookshelf')(knex);

module.exports.bookshelf = bookshelf;
