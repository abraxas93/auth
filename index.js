const http = require('http');

http.createServer((req, res) => {
    console.log('server running');
    res.write('Hello world');
    res.end();
}).listen(3000);