// Serving static files

const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');

const root = __dirname;

http.createServer( function (req, res) {
    const fullPath = path.join(root, url.parse(req.url).pathname);

    fs.stat(fullPath, function (err, stat) {
        if (err) {
            if (err.code == 'ENOENT') {
                res.statusCode = 404;
                res.end('Not Found');
            } else {
                res.statusCode = 500;
                res.end('Internal Server Error');
            }
        } else {
            res.setHeader('Content-Length', stat.size);
            const stream = fs.createReadStream(fullPath);
            stream.pipe(res);
            stream.on('error', function (err) {
                res.statusCode = 500;
                res.end('Internal Server Error');
            });        
        }
    });

}).listen(3000);