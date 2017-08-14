const express = require('express');
const path = require('path');

const app = express();

const PORT = process.env.port || 3000;

// serve static file from 'public' directory
const publicPath = path.resolve(__dirname, 'public');
app.use( express.static(publicPath) );

app.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Go to /quote.txt');
});

app.listen(PORT, () => {
  console.log('server listening on port ' + PORT);
});
