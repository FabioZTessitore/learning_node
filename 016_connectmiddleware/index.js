// Introducing Connect and Middleware

const connect = require('connect');
const app = connect();

// a logger middleware
function logger (req, res, next) {
    console.log('%s %s', req.method, req.url);

    next();
}

// an hello middleware
// (it dosn't call next()!)
function hello (req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('hello');
}

app
    .use(logger)
    .use(hello)
    .listen(3000);