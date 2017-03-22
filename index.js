const http = require('http'),
    config = require('./config'),
    app = require('./app');

http.createServer(app).listen(config.server.port, () => console.log(`Node app running on port: ${config.server.port}`));