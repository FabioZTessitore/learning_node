// Streams data

const http = require('http');
const fs = require('fs');

/*
const dataStream = fs.createReadStream('./resource.json');

dataStream.on('data', function (chunk) {
  console.log(chunk);
});
dataStream.on('end', function () {
  console.log('File read!');
});
*/

http.createServer( function (req, res) {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  fs.createReadStream('./resource.json').pipe(res);
}).listen(3000);
