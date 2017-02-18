var express = require('express');
var router = express.Router();

var site = require('./../controller/site');
var user = require('./../controller/user');


// router.get('/', function(req,res){
//   res.type('text/plain');
//   res.send('i am a test');
// });
router.get('/', site.index);
// router.get('/site', site.index);

router.get('/users', user.list);
router.all('/user/:id/:op?', user.load);
router.get('/user/:id', user.view);
router.get('/user/:id/view', user.view);
router.get('/user/:id/edit', user.edit);
router.post('/user/:id/edit', user.update);
// app.put('/user/:id/edit', user.update);

router.get('/helo', function(req,res){
  res.render('helo', { title: 'Hey', message: 'Hello there!' })
});

module.exports = router
