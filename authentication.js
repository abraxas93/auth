'use strict';

const LocalStrategy = require('passport-local').Strategy,
    User = require('./dashboard/user/user');

function initialize(passport) {
    // passport
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
    passport.use(new LocalStrategy(
        function(username, password, done) {
            User.findOne({
                username: username
            }, function(err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false, {
                        message: 'Incorrect username.'
                    });
                }
                if (!user.validPassword(password)) {       
                    return done(null, false, {
                        message: 'Incorrect password.'
                    });
                }
                return done(null, user);
            });
        }
    ));
}
function isLogged(req, res, next) {
    if (req.user) next();
    else {        
        res.redirect('/login');
    }
}

exports.init = initialize;
exports.isLogged = isLogged;