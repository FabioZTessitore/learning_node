const express = require('express');

const app = express();

const PORT = process.env.port || 3000;

app.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Home Page');
});

app.get('/about', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('About ...');
})

// if any
app.use( (req, res) => {
  res.statusCode = 404;
  res.end('404!');
});

app.listen(PORT, () => {
  console.log('server listening on port ' + PORT);
});
