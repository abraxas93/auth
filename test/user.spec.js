process.env.NODE_ENV = 'test';

const chai = require('chai'),
    chaiHttp = require('chai-http'),
    should = chai.should(),
    mongoose = require('mongoose'),
    User = require('../dashboard/user');

chai.use(chaiHttp);

describe('User', () => {
    describe('Add new user to DB', () => {
        it('Creates a new user', () => {
            
        })
    });
});