import _ from 'lodash';
import passport from "passport";
import moment from 'moment';
import passportJWT from "passport-jwt";
import users from "./fakeUsers.js";
import cfg from "./config.js";
import PostModel from './../models';

const ExtractJwt = passportJWT.ExtractJwt;
var Strategy = passportJWT.Strategy;
const params = {
  secretOrKey: cfg.jwtConfig.jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeader()
};

/**
 * Wrng flow
 * use
 * https://gist.github.com/jokecamp/65604d50227b8ea8e0d3
 * https://gist.github.com/joshbirk/1732068
 * multi authenticate
 * http://stackoverflow.com/questions/20745296/passport-js-with-multiple-authentication-providers
 * https://scotch.io/tutorials/easy-node-authentication-linking-all-accounts-together
 * https://code.tutsplus.com/articles/social-authentication-for-nodejs-apps-with-passport--cms-21618
 */
module.exports = function() {
  var strategy = new Strategy(params, function(payload, done) {
  console.log('token payload', payload);
  console.log('date now', Date.now());
  // RESERVE FUNCTION
  if (payload.exp <= Date.now()) {
    // return done({state: "error", x: "Access token has expired", status: 500}, null); // dont delete
    let err = new Error("Access token has expired");
    err.status = 401;
    return done(err, null); // dont delete
  } else {
    /**
     * Check user
     */
    PostModel.User.forge({id: payload.id})
      .fetch()
      .then(function (user) {
        if (!user) {
          return done(new Error("User not found"), null); // dont delete
        }
        else {
          return done(null, {
            id: user.id,
          });
        }
      })
      .catch(function (err) {
        // res.jsend.error({code: 500, message: err.message});
      });
    }
  });
  passport.use(strategy);
  return {
    initialize: function() {
      return passport.initialize();
    },
    authenticate: function() {
      // console.log('fail disini');
      return passport.authenticate("jwt", cfg.jwtConfig.jwtSession);
    }
  };
};

module.exports.jwtError = (err,req,res,next) => {
    /**
     * Get Error
     * err.toString(),
     * err.name,
     * err.message
     */
    let statusCode = err.status || 500;
    res.status(statusCode).jsend.error({code: statusCode, message: err.message});
}
