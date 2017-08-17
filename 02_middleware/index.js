const express = require('express');

const app = express();

const PORT = process.env.PORT || 3000;

// a simple log middleware
app.use( (req, res, next) => {
  console.log('request ' + req.method + ' ' + req.url + ' at ' + new Date());
  next();
});

app.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello, World!');
});

app.listen(PORT, () => {
  console.log('server listening on port ' + PORT);
});
