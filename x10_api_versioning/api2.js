const express = require('express');
const Random = require('./random');

const api = express.Router();

const API = 'Version 2';

api.get('/random/:min/:max', (req, res) => {
  const min = req.params.min;
  const max = req.params.max;

  const result = {
    api: API,
  };

  if (isNaN(min) || isNaN(max)) {
    res.status(400);
    result.result = 'Bad Request.';
    res.json(result);
    return;
  }

  const n = Random.between(min, max);
  result.result = n;
  res.json(result);
});

module.exports = api;
