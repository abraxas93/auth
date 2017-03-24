'use strict';

const router = require('express').Router(),
    passport = require('passport'),
    user = require('./user');

router.get('/', user.list);
router.get('/login', user.login);
router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: false })
);

module.exports = router;