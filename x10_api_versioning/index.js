const express = require('express');
const api1 = require('./api1');
const api2 = require('./api2');

const app = express();

const PORT = process.env.PORT || 3000;

app.use('/v1', api1);
app.use('/v2', api2);

app.use( (req, res) => {
  res.status(404).end('404. Not Found!');
});

app.listen(PORT);
