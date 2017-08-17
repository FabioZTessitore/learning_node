const express = require('express');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 3000;

app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index', {
    message: 'Hi All!',
  });
});

app.use( (req, res) => {
  res.status(404);
  res.end('404!');
});

app.listen(PORT, () => {
  console.log('server listening on port ' + PORT);
});
