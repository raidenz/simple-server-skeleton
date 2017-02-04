var express = require('express');
var router = express.Router();

var apiGeneral = require('./../app/controller/api/general');
var apiUser = require('./../app/controller/api/user');

router.get('/', function(req,res){
  res.json({message: "huraii api"});
});

// general
router.get('/users', apiGeneral.users);
router.get('/posts', apiGeneral.posts);
router.get('/categories', apiGeneral.categories);

// user
router.get('/user/:id', apiUser.getId);

// post
// tag
// category


router.get('/debug', function(req,res){
  res.json({message: "set debug"});
});

module.exports = router
