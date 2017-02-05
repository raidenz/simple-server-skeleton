var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var _ = require('lodash');
var useport = process.env.PORT || 4738;

var auth = require("./config/auth.js")();
app.use(auth.initialize());

/* Api Router Stop */
app.use(express.static('public'));
app.set('views', './views');
app.set('view engine', 'pug');

// for parsing forms
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// route
// outside route test
/* Api Router Start */
var routeTelo = require('./route/telo');
var routeApi = require('./route/api');
var routeMain = require('./route/main');
var routeAuth = require('./route/auth');

app.use('/', routeMain);
app.use('/telo', routeTelo);
app.use('/api', routeApi);
app.use('/auth', routeAuth);

// app.listen(process.env.PORT || 3000);
// kalau install di heroku misal
// process.env.PORT bisa diganti lewat setting
// selain itu gunakan port lain, sebaiknya buat variable sendiri
// atau gunakan perintah misal -->> PORT=4444 node app.js
app.listen(useport, function(){
	console.log('run in http://localhost:'+useport);
});
