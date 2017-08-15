const express = require('express');

const app = express();

const PORT = process.env.port || 3000;

app.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Go to /hello/<yourname>');
});

app.get('/hello/:who', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello ' + req.params.who);
})

app.use( (req, res) => {
  res.status(404);
  res.end('404!');
});

app.listen(PORT, () => {
  console.log('server listening on port ' + PORT);
});
