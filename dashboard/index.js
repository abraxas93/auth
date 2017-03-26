'use strict';

const router = require('express').Router(),
    passport = require('passport'),
    authenticate = require('../authentication'),
    user = require('./user');

router.get('/', authenticate.isLogged, user.list);
router.get('/login', (req, res) => {
    res.json({'msg': req.flash('error') || 'Login form'});
});
router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true })
);
router.get('/user/:id', user.read);
router.post('/user/add', user.create);
router.put('/user/edit/:id', user.update);
router.get('/user/delete/:id', user.delete);

module.exports = router;