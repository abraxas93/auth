process.env.NODE_ENV = 'test';

const chai = require('chai'),
    chaiHttp = require('chai-http'),
    should = chai.should(),
    mongoose = require('mongoose'),
    User = require('../dashboard/user'),
    server = require('../index.js');

chai.use(chaiHttp);


describe('Dashboard main routes', () => {
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

describe('User', () => {
    
});