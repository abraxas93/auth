process.env.NODE_ENV = 'test';

const chai = require('chai'),    
    expect = chai.expect,    
    User = require('../dashboard/user/user.js'),
    app = require('../app.js'),
    request = require('supertest'),
    server = request.agent(app);


let user1 = new User({
    username: 'user1',
    password: 'pwspws1',
    email: 'user1@mail.com'
});

describe('DASHBOARD ROUTES', () => {
    before((done) => {   
        User.remove({}, (err) => done());                
    });
    describe('/GET_login', () => {
        it('response with json', done => {    
            server
                .get('/login')
                .set('Accept','application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {                   
                    if(err) return done(err);
                    done();
                });
        });
    });
    before((done) => {   
        user1.save((err) => {
            if(err) console.log(err);
            done();
        });                
    });
    // describe('/POST_login', () => {
    //     it('Checks incorrect user', (done) => {            
    //         chai.request(app)
    //             .post('/login')
    //             .send({username:'user1', password:'pwspws12'})
    //             .end((err, res) => {     
    //                 expect(err).equal(null);  
    //                 console.log(res);
    //                 console.log(res.status);
    //                 done();           
    //             });
    //     });
    // });    
});

/* 
* mocha tests/dashboard.spec.js --env NODE_ENV=test --timeout 10000 --no-deprecation
*
*/