var passport = require("passport");
var passportJWT = require("passport-jwt");
var users = require("./fakeUsers.js");
var cfg = require("./config.js");
var ExtractJwt = passportJWT.ExtractJwt;
var Strategy = passportJWT.Strategy;
var params = {
    secretOrKey: cfg.jwtConfig.jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeader()
};

module.exports = function() {
    var strategy = new Strategy(params, function(payload, done) {
        var dummy = (payload.id - 1); // karna masih dummy array start dari 0
        // var user = users[payload.id] || null;
        var user = users[dummy] || null;
        // console.log("ses payload ", payload);
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
