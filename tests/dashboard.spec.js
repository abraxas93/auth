process.env.NODE_ENV = 'test';

const chai = require('chai'),
    chaiHttp = require('chai-http'),
    should = chai.should(),
    mongoose = require('mongoose'),
    User = require('../dashboard/user'),
    server = require('../index.js');

chai.use(chaiHttp);

let user1 = new User({
    username: 'user1',
    password: 'pwspws1',
    email: 'user1@mail.com'
});
let user2 = new User({
    username: 'user2',
    password: 'pwspws2',
    email: 'user2@mail.com'
});
let user3 = new User({
    username: 'user3',
    password: 'pwspws3',
    email: 'user3@mail.com'
});

describe('Dashboard main routes', () => {
    beforeEach((done) => { 
        User.remove({}, (err) => { 
            if (err) done(err);
            done();
        });     
    });
    describe('/GET_login', () => {
        it('It should return string "Login form"', () => {
            chai.request(server)
                .get('/login')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body('msg').should.equal('Login form');
                });
        });
    });
});