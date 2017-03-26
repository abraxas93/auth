const express = require('express'),
    config = require('./config'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    cookieSession = require('cookie-session'),
    passport = require('passport'),
    flash = require('connect-flash'),
    mongoose = require('mongoose'),
    authentication = require('./authentication'),
    checkEnv = config.checkEnv,
    dashboard = require('./dashboard'),
    app = express();


checkEnv(() => app.use(logger('dev')));
app.use(cookieParser());
app.use(cookieSession({
    name: 'mysession',
    secret: 'pwspws'
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// db connection string
mongoose.connect(config.mongo.url, (err) => {
    if (err) console.log(err);
    checkEnv(() => console.log(`DB running on ${config.mongo.url}`));
});
// configure passport
authentication.init(passport);

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

app.listen(config.server.port, () => {
    checkEnv(() => console.log(`Dashboard app running on port: ${config.server.port}. NODE_ENV: ${process.env.NODE_ENV}`));   
});

module.exports = app;