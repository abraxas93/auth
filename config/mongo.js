let url;

if (process.env.NODE_ENV === 'test') {
    url = 'mongodb://vertix:abraxas93@ds143030.mlab.com:43030/nodetest';
} else {
    url = 'mongodb://vertix:11235813@ds021984.mlab.com:21984/skylab'
}

module.exports = {
    port: process.env.MONGODB_PORT || 27017,
    host: process.env.MONGODB_HOST || 'localhost',
    url: url
};