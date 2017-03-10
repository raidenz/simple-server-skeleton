// "use strict";
// require('babel-polyfill'); //es6 test
import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import _ from 'lodash';

import authConfig from './config/auth.js';

// var express = require('express');
// var app = express();
// var bodyParser = require('body-parser');
// var logger = require('morgan');
// var _ = require('lodash');
// var useport = process.env.PORT || 4738;

const app = express();
const auth = authConfig();
const useport = process.env.PORT || 4738;

// var auth = require("./config/auth.js")();
app.use(auth.initialize());

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
app.use(logger('dev'));
app.use(express.static('public'));
app.set('views', './views');
app.set('view engine', 'pug');

/**
 * for parsing forms
 */

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


/**
 * route
 * outside route test
 * Api Router Start
 *
 */

const routeTelo = require('./app/route/telo');
const routeApi = require('./app/route/api');
const routeMain = require('./app/route/main');
const routeAuth = require('./app/route/auth');
const routeDebug = require('./app/route/debug');

app.use('/', routeMain);
app.use('/telo', routeTelo);
app.use('/api', routeApi);
app.use('/auth', routeAuth);
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
