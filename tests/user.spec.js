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

describe('USER CRUD', () => {
    before( done => {   
        User.remove({}, err => {
            if (err) done(err);
            else {
                for(let i=0; i < 5; i++) {                    
                    let user = new User({
                        username: 'user' + i,
                        password: 'pass' + i,
                        email: 'user' + i +'@mail.com'
                    }).save(err => {                                               
                        if(err) done(err);
                        if (i === 4) done();
                    });                    
                }                
            }
        });                
    });
    it('login', done => {
        agent
            .post('/login')
            .send({ username: 'user0', password: 'pass0' })
            .expect(302)
            .expect('Location', '/')
            .end((err, res) => {
                if (err) done(err);
                done();
            });
    });
    describe('get list of all users', () => {        
        it('returns an array of users', done => {            
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
    });
    describe('get user by id', () => {

    });
    describe('create new user', () => {

    });
    describe('update user fields by id', () => {

    });
    describe('delete user by id', () => {

    });
});