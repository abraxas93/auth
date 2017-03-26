const http = require('http'),
    config = require('./config'),
    app = require('./app');

const server = http.createServer(app).listen(config.server.port, () => {
    console.log(`Node app running on port: ${config.server.port}. NODE_ENV: ${process.env.NODE_ENV}`)
});

module.exports = server;