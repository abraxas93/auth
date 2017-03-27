process.env.NODE_ENV = 'test';

/* 
 * Start command via terminal to run this test:
 * mocha tests/user.spec.js --env NODE_ENV=test --timeout 10000 --no-deprecation
 *
 * Docs for superagent:
 * http://visionmedia.github.io/superagent/ 
 */

const chai = require('chai'),
    assertArrays = require('chai-arrays'),
    expect = chai.expect,
    User = require('../dashboard/user/user.js'),
    app = require('../app.js'),
    request = require('supertest'),
    agent = request.agent(app);

chai.use(assertArrays);
let id; // custom variable for test

before(done => {
    User.remove({}, err => {
        if (err) done(err);
        else {
            for (let i = 0; i < 5; i++) {
                let user = new User({
                    username: 'user' + i,
                    password: 'pass' + i,
                    email: 'user' + i + '@mail.com'
                }).save(err => {
                    if (err) done(err);
                    if (i === 4) done();
                });
            }
        }
    });
});
describe('USER CRUD:', () => {

    it('login', done => {
        agent
            .post('/login')
            .send({
                username: 'user0',
                password: 'pass0'
            })
            .expect(302)
            .expect('Location', '/')
            .end((err, res) => {
                if (err) done(err);
                done();
            });
    });
    it('returns array of users', done => {
        agent
            .get('/')
            .expect(200)
            .end((err, res) => {
                if (err) done(err);
                let users = res.body;
                expect(users).to.be.array();
                expect(users[0]).to.have.property('_id');
                expect(users[0]).to.have.property('username');
                done();
            });
    });
    it('creates new user', done => {
        agent
            .post('/user')
            .send({
                username: 'test',
                password: 'test',
                email: 'test@mail.com'
            })
            .expect(200)
            .end((err, res) => {
                if (err) done(err);
                let user = res.body;
                expect(user).to.have.property('_id');
                id = user._id;
                done();
            });
    });
    it('returns user by id', done => {
        agent
            .get('/user/' + id)
            .expect(200)
            .end((err, res) => {
                if (err) done(err);
                let user = res.body;
                expect(user).to.have.property('_id').equal(id.toString());
                done();
            });
    });
    it('updating users model by id', done => {
        agent
            .put('/user/' + id)
            .send({
                username: 'test2',
                password: 'test2',
                email: 'test2@mail.com'
            })
            .expect(200)
            .end((err, res) => {
                if (err) done(err);
                let user = res.body;
                expect(user).to.have.property('_id').equal(id.toString());
                expect(user).to.have.property('username').equal('test2');
                expect(user).to.have.property('email').equal('test2@mail.com');
                done();
            });
    });
    it('deletes user by id', done => {
        agent
            .del('/user/' + id)
            .expect(200)
            .end((err, res) => {
                if (err) done(err);
                expect(res.body.ok).equal(1);
                done();
            });
    });
});