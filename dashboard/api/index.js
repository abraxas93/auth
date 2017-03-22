'use strict';

// middleware func for checking user to be logined
function isLogged(req, res, next) {
    if (req.user) next();
    else res.redirect('login');
};

// router.post('/login', passport.authenticate('local', {
//     successRedirect: '/dash',
//     failureRedirect: '/login',
//     failureFlash: false })
// );

module.exports = {
    index(req, res) {
        res.send('Dashboard index page:');
    },
    login(req, res) {
        if (req.method === 'GET') {
            res.send('Login get method');
        }
    }
};