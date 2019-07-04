// Using the http module to create a little dumb server

const http = require('http');

const server = http.createServer( function (req, res) {
  console.log('request to ', req.url);

  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.write('Hello, World!');
  res.end();
});

server.listen(3000);
