const mongo = require('./mongo'),
    server = require('./server');

// checking enviroment variable
function checkEnv(fn) {
    if(process.env.NODE_ENV !== 'test') {
        fn();
    }
}

module.exports = {
    mongo,
    server,
    checkEnv
};