process.env.NODE_ENV = 'test';

/* 
* Start command via terminal to run this test:
* mocha tests/dashboard.spec.js --env NODE_ENV=test --timeout 10000 --no-deprecation
*
* Docs for superagent:
* http://visionmedia.github.io/superagent/ 
*/

const chai = require('chai'),    
    expect = chai.expect,    
    User = require('../dashboard/user/user.js'),
    app = require('../app.js'),
    request = require('supertest');    

describe('DASHBOARD ROUTES', () => {
    before( done => {   
        User.remove({}, (err) => done());                
    });
    describe('/GET_login', () => {
        it('response with json', done => {   
            agent1 = request.agent(app); 

            agent1
                .get('/login')
                .set('Accept','application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {                                     
                    if (err) return done(err);
                    done();
                });
        });
    });
    before( done => {   
        let user = new User({
            username: 'user1',
            password: 'pwspws1',
            email: 'user1@mail.com'
        }).save((err) => {
            if(err) console.log(err);
            done();
        });                       
    });
    describe('/POST_login', () => {
        it('checks incorrect username', done => {  
            agent2 = request.agent(app);           

            agent2
                .post('/login')
                .send({ username: 'admin', password: 'pwspws1' })
                .expect(302)
                .expect('Location','/login')
                .end((err, res) => {                    
                    if (err) return done(err);
                    done();
                });
        });
        it('checks incorrect password', done => {
            agent3 = request.agent(app);           

            agent3
                .post('/login')
                .send({ username: 'user1', password: 'password' })
                .expect(302)
                .expect('Location','/login')
                .end((err, res) => {             
                    if (err) return done(err);
                    done();
                });
        });
        it('checks correct username and password', done => {
            agent4 = request.agent(app);           

            agent4
                .post('/login')
                .send({ username: 'user1', password: 'pwspws1' })
                .expect(302)
                .expect('Location','/')
                .end((err, res) => {       
                    if (err) return done(err);
                    done();
                });
        });
    });    
});

