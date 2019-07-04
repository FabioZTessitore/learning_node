// Handle form data

const http = require('http');
const qs = require('querystring');

// todo items
const items = [];

const server = http.createServer( function (req, res) {
    // accept only request to '/'
    if (req.url == '/') {
        switch (req.method) {
            // show the page
            case 'GET':
                show(res);
                break;
            
            // handle form data
            case 'POST':
                add(req, res);
                break;
            
            // any other method will be ignored
            default:
                badRequest(res);
        }
    } else {
        notFound(res);
    }
});

server.listen(3000);

function show(res) {
    // use a string because we need to inject some data
    const html = '<html><head><title>Todo List</title></head><body>'
        + '<h1>Todo List</h1>'
        + '<ul>'
        + items.map( function (item) {
            return '<li>' + item + '</li>'
          }).join('')
        + '</ul>'
        + '<form method="POST" action="/">'
        + '<p><input type="text" name="item"></p>'
        + '<p><input type="submit" value="Add Item"></p>'
        + '</form></body></html>';
    
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Content-Length', Buffer.byteLength(html));
    res.end(html);
}

function add(req, res) {
    const bodyItems = [];
    req.setEncoding('utf8');
    req.on('data', function (chunk) {
        bodyItems.push(chunk);
    });
    req.on('end', function () {
        const body = bodyItems.join('');
        const obj = qs.parse(body);
        items.push(obj.item);
        show(res);
    });
}

function notFound(res) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Not Found');
}

function badRequest(res) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Bad request');
}