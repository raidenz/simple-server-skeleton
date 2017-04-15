/**
 * reserve for jwt
 * note: damn i never use it before
 * cek passport jwt and bookshelf on google (LOL)
 */

/**
 * req:
 * /token
 */
import express from 'express';
var router = express.Router();

import bcrypt from 'bcrypt';
import _ from 'lodash';
import jwt from 'jwt-simple';
import authdo from './../config/auth.js';
import cfg from './../config/config.js';

const auth = authdo();

import PostModel from './../models';

// router.use(auth.initialize());

/**
 * /auth/user
 */
router.get("/user", auth.authenticate(), function(req, res) {
  PostModel.User.forge({id: req.user.id})
    .fetch()
    .then(function (user) {
      if (!user) {
        res.status(404).json({error: true, data: {}});
      }
      else {
        // res.json({error: false, data: user.omit('password')});
        res.jsend.success({ user });
      }
    })
    .catch(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
  });
});

/**
 * /auth/token
 */
router.post('/token', function(req, res){
  // res.json({token: "generated token here"});
  // console.log(req.body);
  if (req.body.email && req.body.password) {
    var email = req.body.email;
    var password = req.body.password;
    /*
    logic Error
     */
    PostModel.User.forge({email: req.body.email})
      .fetch()
      .then(function (user) {
        // console.log('user is', user);
        if (!user) {
          res.sendStatus(401)
          // .json({
          //   error: true,
          // });
          // console.log('email not exist, exiting');
        } else {
          // console.log('user exist, compare password', user);
          user.comparepass(password, function(err, isMatch) {
            if (err){
              throw err;
            }
            // console.log(password, isMatch);
            if(isMatch){
              var payload = {
                id: user.id
              };
              // console.log(user.id);
              var token = jwt.encode(payload, cfg.jwtConfig.jwtSecret);
              res.json({
                  error: false,
                  token: 'JWT ' + token
              });
            } else {
              // console.log(err);
              res.status(401).json({
                status: 401,
                error: true,
              });
            }
          });

          // bcrypt.compare(password, user.get('password'), function(err, isMatch) {
          // });

        }
      })
      .catch(function (err) {
        // res.status(500).json({error: true, data: {message: err.message}});
      });
    } else {
        res.sendStatus(401);
    }

});

module.exports = router
