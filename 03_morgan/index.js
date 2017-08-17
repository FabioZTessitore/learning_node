const express = require('express');
const logger = require('morgan');

const app = express();

const PORT = process.env.PORT || 3000;

// morgan logger
app.use( logger('short') );

app.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello, World!');
});

app.listen(PORT, () => {
  console.log('server listening on port ' + PORT);
});
