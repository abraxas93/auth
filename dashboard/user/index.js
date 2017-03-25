'use strict';

const User = require('./user');

module.exports = {
    list(req, res) {
        User.find({}, (err, users) => {
            if (err) res.send(err);
            res.json(users);
        });
    },
    create(req, res) {
        let newUser = new User({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email
        });

        newUser.save((err) => {
            if (err) res.json(err);
            else res.json(newUser);
        });
    },
    read(req, res) {
        User.findById(req.params.id, (err, user) => {
            res.json(user);
        });
    },
    update(req, res) {
        User.findById(req.params.id, (err, user) => {
            if (err) res.json(err);
            else {
                user.username = req.body.username;
                user.password = user.generateHash(req.body.password);
                user.email = req.body.email;

                user.save((err) => {
                    if (err) res.json(err);
                    else res.json(user);
                });
            }
        });
    },
    delete(req, res) {
        User.findById(req.params.id).remove((err) => {
            if (err) res.json(err);
            else {
                res.json({msg: `user: ${req.params.id} succesfully removed from db`});
            }
        });
    }
};