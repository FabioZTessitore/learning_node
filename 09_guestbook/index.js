const express = require('express');
const logger = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

const PORT = process.env.port || 3000;

// in memory data
const entries = [
  {
    title: "Express Yourself!",
    body: "Express Yourself only if ...",
    createdAt: new Date(),
  },
  {
    title: "Orient Express!",
    body: "Express for travelling ...",
    createdAt: new Date(),
  },
];

// make entries available in all views
app.locals.entries = entries;

app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/new-entry', (req, res) => {
  res.render('new_entry');
});

app.post('/new-entry', (req, res) => {
  if (!req.body.title || !req.body.body) {
    res.status(400).send('Entries must have a title and a body.');
    return;
  }
  entries.push({
    title: req.body.title,
    body: req.body.body,
    createdAt: new Date(),
  });
  res.redirect('/');
});

app.use( (req, res) => {
  res.status(404).render('404');
});

app.listen(PORT);
