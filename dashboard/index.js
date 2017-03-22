'use strict';

const router = require('express').Router(),
    api = require('./api');

router.get('/dash', api.index);
router.get('/dash/login', api.login);
router.post('/dash/login', api.login);
// router.get('/dash/logout', api.logout);

module.exports = router;