// "use strict";
// require('babel-polyfill'); //es6 test
import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import { addPath } from 'app-module-path';
import _ from 'lodash';

import authConfig from './config/auth.js';

// console.log(__dirname);
console.log(process.cwd());
  // addPath(__dirname);
  addPath(process.cwd());


const app = express();
if (app.get('env') === 'development') {
  // process.env.NODE_PATH
} else {}
const auth = authConfig();
const useport = process.env.PORT || 4738;

// var auth = require("./config/auth.js")();
app.use(auth.initialize());

/**
 * for parsing forms
 */
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

/**
*
* Enable CORS
*
*/
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


/**
 * Api Router Stop
 */
// console.log('ok ' + __dirname);
app.use(logger('dev'));
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');
/**
 * route
 * outside route test
 * Api Router Start
 *
 */
const routeMain = require('./route/main');
const routeAuth = require('./route/auth');

app.use('/', routeMain);
app.use('/auth', routeAuth);

/**
 * Versioning test
 */
import routeApiV1 from './route/api/v1/route';
app.use('/api/v1', routeApiV1);

/**
 *  Testing Puspose
 */
const routeDebug = require('./route/debug');
app.use('/debug', routeDebug);

/**
 * development error handler
 * will print stacktrace
 */
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

/**
 * production error handler
 * no stacktraces leaked to user
 */
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
});

/**
 * 404
 */
app.use(function (req, res, next) {
  res.status(404).send("404 BRO, Sorry can't find that!")
});

// app.listen(process.env.PORT || 3000);
// kalau install di heroku misal
// process.env.PORT bisa diganti lewat setting
// selain itu gunakan port lain, sebaiknya buat variable sendiri
// atau gunakan perintah misal -->> PORT=4444 node app.js

app.listen(useport, function(){
	console.log('run in http://localhost:'+useport);
});
