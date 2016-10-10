const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const queries = require('./utils/database/queries');

var currentWord = {};

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(express.static('public', {index: 'index.html'}));

app.listen(process.env.PORT || 80, () => {
  console.log(`App started on port ${process.env.PORT || 80}`);

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
    res.send('ПРАВИЛЬНО!');
  }
  console.log(currentWord.translation);
  res.send('ПОПРОБУЙ ЕЩЕ РАЗОК!!!');
});

app.get('/api/version', (req, res) => {
  res.send('Version 0.0.4')
})

app.get('/api/allwords', (req, res) => {
  queries.getAllWords((rows) => {
    res.send(rows);
  });
});
