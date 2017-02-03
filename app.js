var knex = require('knex')({
  client: 'mysql',
  connection: {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'densss',
    charset: 'utf8'
  }
});

var Bookshelf = require('bookshelf')(knex);
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var _ = require('lodash');
var router = express.Router();
var useport = process.env.PORT || 4738;

app.use(express.static('public'));
app.set('views', './views');
app.set('view engine', 'pug');

// for parsing forms
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var site = require('./app/controller/site');
var user = require('./app/controller/user');

app.get('/', function(req,res){
	res.type('text/plain');
	res.send('i am a test');
});

app.get('/telo', function(req,res){
	// console.log(req);
	res.type('text/plain');
	res.send('i am a telo');
});
app.get('/telo/:id', function(req,res){
	res.type('text/plain');
	res.send('i am a telo ' + req.params.id);
});


app.get('/helo', function(req,res){
	res.render('helo', { title: 'Hey', message: 'Hello there!' })
});


/*separation test*/
app.get('/site', site.index);

app.get('/users', user.list);
app.all('/user/:id/:op?', user.load);
app.get('/user/:id', user.view);
app.get('/user/:id/view', user.view);
app.get('/user/:id/edit', user.edit);
app.put('/user/:id/edit', user.update);

/* Api Router Start */
router.get('/', function(req,res){
	res.json({message: "huraii api"});
});
router.get('/post', function(req,res){
	res.json({message: "get latest post"});
});
router.get('/contact', function(req,res){
	res.json({message: "get contact page"});
});
app.use('/api', router);
/* Api Router Stop */

// app.listen(process.env.PORT || 3000);
// kalau install di heroku misal
// process.env.PORT bisa diganti lewat setting
// selain itu gunakan port lain, sebaiknya buat variable sendiri
// atau gunakan perintah misal -->> PORT=4444 node app.js
app.listen(useport, function(){
	console.log('run in http://localhost:'+useport);
});
