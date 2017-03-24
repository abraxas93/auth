const express = require('express'),
    config = require('./config'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    cookieSession = require('cookie-session'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    mongoose = require('mongoose'),
    User = require('./dashboard/user/user'),
    dashboard = require('./dashboard'),
    app = express();

app.use(logger('dev'));

app.use(cookieParser());
app.use(cookieSession({
    name: 'mysession',
    secret: 'pwspws'
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// db connection string
mongoose.connect(config.mongo.url);

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
      User.findOne({ username: username }, function(err, user) {
          if (err) { return done(err); }
          if (!user) {
              return done(null, false, { message: 'Incorrect username.' });
          }
          if (!user.validPassword(password)) {
              console.log('Incorrect');
              return done(null, false, { message: 'Incorrect password.' });
          }
          return done(null, user);
      });
  }
));

app.use(dashboard);

// Handling 404 exception
app.use((req, res, next) => {
    if (req.url !== '/favicon.ico') {
        let error = new Error(`No route specify for this url: ${req.url}`);
        error.status = 404;
        next(error);
    }
    res.end();
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send('error', {
        message: err.message,
        error: err
    });
});

module.exports = app;