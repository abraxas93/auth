'use strict';

const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    crypto = require('crypto');

var User = new Schema({
    username: {
        type: String,
        unique: true
    },
    password: String,
    email: String,
    created: {
        type: Date,
        default: Date.now
    }
});

User.methods.validPassword = function(password) {
    return this.password === this.generateHash(password);
};

User.methods.generateHash = function(password) {
    return crypto.createHash('md5').update(password).digest('hex');
};

User.pre('save', function(next) {
    let pass = this.password;
    this.password = this.generateHash(pass);
    //console.log(crypto.createHash('md5').update('this.password').digest('hex'));
    next();
});

module.exports = mongoose.model('User', User);