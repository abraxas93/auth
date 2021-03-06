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
    successFlash: 'User authorized',
    failureFlash: true })
);
router.get('/user/:id', user.read);
router.post('/user', user.create);
router.put('/user/:id', user.update);
router.delete('/user/:id', user.delete);

module.exports = router;