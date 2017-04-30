/**
 * reserve for jwt
 * note: damn i never use it before
 * http://www.svlada.com/jwt-token-authentication-with-spring-boot/#jwt-authenticationhttp://www.svlada.com/jwt-token-authentication-with-spring-boot/#jwt-authentication
 * https://blog.hyphe.me/token-based-authentication-with-node/
 * >> https://blog.jscrambler.com/implementing-jwt-using-passport/
 *
 * TODO
 * add expiration please
 * https://www.sitepoint.com/using-json-web-tokens-node-js/
 */

/**
 * req:
 * /token
 */
import express from 'express';
var router = express.Router();

import moment from 'moment';
import bcrypt from 'bcrypt';
import _ from 'lodash';
import jwt from 'jwt-simple';
import authdo from './../config/auth.js';
import cfg from './../config/config.js';

const auth = authdo();

import PostModel from './../models';

// router.use(auth.initialize());

/**
 * CHECK AUTH
 * /auth/user
 */
router.get("/user", auth.authenticate(), function(req, res) {
  PostModel.User.forge({id: req.user.id})
    .fetch()
    .then(function (user) {
      if (!user) {
        res.status(404).jsend.error({code: 404, message: 'User not Exist'});
      }
      else {
        // res.json({error: false, data: user.omit('password')});
        res.jsend.success({ user });
      }
    })
    .catch(function (err) {
      res.status(500).jsend.error({code: 500, message: err.message});
  });
});

/**
 * LOGIN HERE
 * /auth/token
 */
router.post('/token', function(req, res){
  // res.json({token: "generated token here"});
  // console.log(req.body);
  if (req.body.email && req.body.password) {
    let {email, password} = req.body
    /**
     * logic Error
     */
    PostModel.User.forge({email})
      .fetch()
      .then(function (user) {
        // console.log('user is', user);
        if (!user) {
          // res.sendStatus(401)
          // it shold be 404 but change it
          // to 401 to set it unauthorized
          res.status(401).jsend.error({
            code: 401,
            message: 'error',
          });
        } else {
          // console.log('user exist, compare password', user);
          user.comparepass(password, function(err, isMatch) {
            if (err){
              throw err;
            }
            // console.log(password, isMatch);
            if(isMatch){
              let payload = {
                id: user.id,
                // set expiration to 1 day
                exp: moment().add(1, 'days').valueOf(),
                // exp: moment().add(1, 'minutes').valueOf() // For debug
              };
              // console.log(user.id);
              let token = jwt.encode(payload, cfg.jwtConfig.jwtSecret);
              res.jsend.success({
                  token: 'JWT ' + token
              });
            } else {
              // Unauthorized
              res.status(401).jsend.error({
                code: 401,
                message: 'error',
              });
            }
          });

          // bcrypt.compare(password, user.get('password'), function(err, isMatch) {
          // });

        }
      })
      .catch(function (err) {
        // let it blank
        // res.status(500).json({code: true, data: {message: err.message}});
      });
    } else {
        // res.sendStatus(401);
      res.status(401).jsend.error({
        code: 401,
        message: 'error',
      });
    }

});

router.get("/debug",
  function(req, res, next){
    console.log(req.get('Authorization'));
    next();
  }, function(req, res){
    res.json("debugging");
});

module.exports = router
