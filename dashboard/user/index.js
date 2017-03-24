'use strict';

const user = require('./user');

module.exports = {
    list(req, res) {
        user.find({}, (err, users) => {
            if (err) res.send(err);
            res.json(users);
        });
    },
    login(req, res) {
        if (req.method === 'GET') {
            res.json({'msg': 'get login action'});
        } else {
            res.json({'msg': 'post login action'});
        }
    }
};