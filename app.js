const express = require('express'),
    config = require('./config'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    cookieSession = require('cookie-session'),
    mongoose = require('mongoose'),
    app = express();

app.use(logger('dev'));

app.use(cookieParser());
app.use(cookieSession({
    name: 'mysession',
    secret: 'pwspws'
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// db connection string
mongoose.connect(config.mongodb.url);

// passport

app.all('*', (req, res) => {
    let reqData = req.body;
    console.log();
    Object.getOwnPropertyNames(reqData).length === 0 ? res.json({'Application': 'Index'}) : res.json({reqData});
});

app.use((req, res, next) => {
    let error = new Error(`No route specify for this url: ${req.url}`);
    res.send(error.message);
    res.end();
});

module.exports = app;