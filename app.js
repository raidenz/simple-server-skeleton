// "use strict";
// require('babel-polyfill'); //es6 test
var express = require('express');
// import express from 'express';
var app = express();
var bodyParser = require('body-parser');
var logger = require('morgan');
var _ = require('lodash');
var useport = process.env.PORT || 4738;

var auth = require("./config/auth.js")();
app.use(auth.initialize());

/* Api Router Stop */
app.use(logger('dev'));
app.use(express.static('public'));
app.set('views', './views');
app.set('view engine', 'pug');

// for parsing forms
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// route
// outside route test
/* Api Router Start */
var routeTelo = require('./app/route/telo');
var routeApi = require('./app/route/api');
var routeMain = require('./app/route/main');
var routeAuth = require('./app/route/auth');
var routeDebug = require('./app/route/debug');

app.use('/', routeMain);
app.use('/telo', routeTelo);
app.use('/api', routeApi);
app.use('/auth', routeAuth);
app.use('/debug', routeDebug);

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
});

// 404
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
