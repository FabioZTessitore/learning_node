const express = require('express');
const path = require('path');

const app = express();

const PORT = process.env.port || 3000;

app.get('/', (req, res) => {
  res.sendFile( path.resolve(__dirname, 'public', 'index.html') );
});

app.use( (req, res) => {
  res.status(404);
  res.end('404!');
});

app.listen(PORT, () => {
  console.log('server listening on port ' + PORT);
});
