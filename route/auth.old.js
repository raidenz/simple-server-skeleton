/**
 * reserve for jwt
 * note: damn i never use it before
 * cek passport jwt and bookshelf on google (LOL)
 */

/**
 * req:
 * /token
 */
var express = require('express');
var router = express.Router();

var _ = require('lodash');
var jwt = require("jwt-simple");
var auth = require("./../config/auth.js")();
var users = require("./../config/fakeUsers.js");
var cfg = require("./../config/config.js");

var PostModel = require('./../models/Model');

// router.use(auth.initialize());

/**
 * /auth/user
 */
router.get("/user", auth.authenticate(), function(req, res) {
  // console.log('reqq', req);
  // dummy = (req.user.id - 1);
  // res.json(users[dummy]);
  // res.json(users[req.user.id]);
  res.json(_.find(users, ['id', req.user.id]));
});

/**
 * /auth/token
 */
router.post('/token', function(req, res){
  // res.json({token: "generated token here"});

  if (req.body.email && req.body.password) {
    var email = req.body.email;
    var password = req.body.password;
    var user = users.find(function(u) {
        return u.email === email && u.password === password;
    });
    /*
    logic Error
     */
    PostModel.User.forge({email: req.body.email})
      .fetch()
      .then(function (user) {
        if (!user) {
          // res.status(404).json({error: true, data: {}});
          console.log('user ga ada');
        }
        else {
          console.log('user ada', user);
          user.comparePasswords('secret', function(err , isMatch){
            console.log('error ', err);
            console.log('match ', isMatch);
          });
          // res.json({error: false, data: user.toJSON()});
        }
      })
      .catch(function (err) {
        // res.status(500).json({error: true, data: {message: err.message}});
    });

    if (user) {
        var payload = {
            id: user.id
        };
        console.log(user.id);
        var token = jwt.encode(payload, cfg.jwtConfig.jwtSecret);
        res.json({
            error: false,
            token: 'JWT ' + token
        });
    } else {
        res.sendStatus(401);
    }
  } else {
      res.sendStatus(401);
  }

});


module.exports = router
