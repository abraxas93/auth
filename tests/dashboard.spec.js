process.env.NODE_ENV = 'test';

const chai = require('chai'),
    chaiHttp = require('chai-http'),
    should = chai.should(),
    mongoose = require('mongoose'),
    User = require('../dashboard/user'),
    server = require('../index.js');

chai.use(chaiHttp);