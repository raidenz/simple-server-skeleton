import _ from 'lodash';
import passport from "passport";
import passportJWT from "passport-jwt";
import users from "./fakeUsers.js";
import cfg from "./config.js";

const ExtractJwt = passportJWT.ExtractJwt;
var Strategy = passportJWT.Strategy;
const params = {
    secretOrKey: cfg.jwtConfig.jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeader()
};

module.exports = function() {
    var strategy = new Strategy(params, function(payload, done) {
        // var dummy = (payload.id - 1); // karna masih dummy array start dari 0
        // var user = users[dummy] || null;
        // var user = users[payload.id] || null;
        // console.log("ses payload ", payload);
        var user = (_.find(users, ['id', payload.id])) || null;
        if (user) {
            return done(null, {
                id: user.id
            });
        } else {
            return done(new Error("User not found"), null);
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
