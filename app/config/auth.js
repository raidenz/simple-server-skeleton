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

module.exports = function() {
  var strategy = new Strategy(params, function(payload, done) {
  console.log('token payload', payload);
  console.log('date now', Date.now());
  // RESERVE FUNCTION
  if (payload.exp <= Date.now()) {
    return done(new Error("Access token has expired"), null); // dont delete
  } else {
    /**
     * Check user
     */
    PostModel.User.forge({id: payload.id})
      .fetch()
      .then(function (user) {
        if (!user) {
          // res.jsend.error({code: 500, message: 'User not Found'});
          return done(new Error("User not found"), null); // dont delete
        }
        else {
          // res.json({error: false, data: user.omit('password')});
          // res.jsend.success({ user });
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
