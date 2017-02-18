var express = require('express');
var router = express.Router();

var apiGeneral = require('./../controller/api/general');
var apiUser = require('./../controller/api/user');
var apiPost = require('./../controller/api/post');
var apiCategory = require('./../controller/api/category');

router.get('/', function(req,res){
  res.json({message: "huraii api"});
});

// general
router.get('/users', apiGeneral.users);
router.get('/posts', apiGeneral.posts);
router.get('/categories', apiGeneral.categories);

// user
router.get('/user/:id', apiUser.getId);
router.post('/user', apiUser.create);
router.post('/user/:id/edit', apiUser.update);
router.post('/user/:id/delete', apiUser.delete);


// post
router.get('/posts/category/:id', apiPost.getCatbyId);
router.get('/posts/tag/:slug', apiPost.getTagBySlug);

router.get('/post/:id', apiPost.getId);
router.post('/post', apiPost.create);
// router.post('/post/:id/edit', apiPost.update);
// router.post('/post/:id/delete', apiPost.delete);

// tag
// category
router.get('/category/:id', apiCategory.getId);
router.post('/category', apiCategory.create);
router.post('/category/:id/edit', apiCategory.update);
router.post('/category/:id/delete', apiCategory.delete);

router.get('/debug', function(req,res){
  res.json({message: "set debug"});
});

module.exports = router
