// A RESTful server

// Use curl to test:
//
// GET
// curl localhost:3000
//
// POST
// curl -d "todo" localhost:3000
//
// DELETE
// curl -X DELETE localhost:3000/1
//
// PUT (update)
// curl -X PUT -d "todo" localhost:3000/1

const http = require('http');
const url = require('url');

// ToDo Items
const items = [];

http.createServer( function (req, res) {
  let path;
  let i;
  
  switch(req.method) {
    case 'GET':
      let body = items.map( function (item, i) {
        return i + ') ' + item;
      }).join('\n');
      body += '\n';
      res.setHeader('Content-Length', Buffer.byteLength(body));
      res.setHeader('Content-Type', 'text/plain; charset="utf-8"');
      res.end(body);
      break;
    case 'POST':
      // data arrive in chunks
      let itemChunks = [];
      req.setEncoding('utf8');
      req.on('data', function (chunk) {
        itemChunks.push(chunk);
      });
      req.on('end', function () {
        item = itemChunks.join('');
        items.push(item);
        res.end('OK\n');
      });
      break;
    case 'DELETE':
      path = url.parse(req.url).pathname;
      i = parseInt(path.slice(1), 10);
      
      if (isNaN(i)) {
        res.statusCode = 400;
        res.end('Invalid item id\n');
      } else if (!items[i]) {
        res.statusCode = 404;
        res.end('Item not found\n');
      } else {
        items.splice(i, 1);
        res.end('OK\n');
      }
      break;
    case 'PUT':
      path = url.parse(req.url).pathname;
      i = parseInt(path.slice(1), 10);
      
      if (isNaN(i)) {
        res.statusCode = 400;
        res.end('Invalid item id\n');
      } else if (!items[i]) {
        res.statusCode = 404;
        res.end('Item not found\n');
      } else {
        // data arrive in chunks
        let itemChunks = [];
        req.setEncoding('utf8');
        req.on('data', function (chunk) {
          itemChunks.push(chunk);
        });
        req.on('end', function () {
          item = itemChunks.join('');
          items[i] = item;
        });
        res.end('OK\n');
      }
      break;
  }
}).listen(3000);
