const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const queries = require('./utils/database/queries');
const PORT = 3000;

var currentWord = {};

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(express.static('public', {index: 'index.html'}));

app.listen(PORT, () => {
  console.log(`App started on port ${PORT}`);

  queries.loadRandomWord((rows) => {
    currentWord = rows[0];
  });
});

app.post('/newword', (req, res) => {
  let newWord = {word: req.body.word, translation: req.body.translation};
  queries.addNewWord(newWord);
  res.send('');
});

app.get('/api/getword', (req, res) => {
  queries.loadRandomWord((rows) => {
    currentWord = rows[0];
    res.send(currentWord.word);
  });
});

app.post('/api/checkAnswer', (req, res) => {
  if (req.body.answer.toLowerCase() === currentWord.translation.toLowerCase()) {
    res.send('{"correct":"1"}');
  }
  console.log(req.body.answer);
  res.send('{"correct":"0"}');
});

app.get('/api/version', (req, res) => {
  res.send('Version 0.0.5')
})

app.get('/api/allwords', (req, res) => {
  queries.getAllWords((rows) => {
    res.send(rows);
  });
});
