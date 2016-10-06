const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
var currentWord = ""
var currentTranslation = "";

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use(express.static('public'));

const pool = mysql.createPool({
  host     : 'us-cdbr-iron-east-04.cleardb.net',
  user     : 'bf04c08bb60517',
  password : 'e50d1191',
  database : 'heroku_5e754667688fa3a'
});

function loadRandomWord() {
  pool.getConnection((err, connection) => {
    if(err) {
      console.log(err);
    }

    var maxId = 0;
    connection.query('SELECT MAX(words.wordId) AS mid FROM words', (err, rows) => {
                        maxId = rows[0].mid
                        maxId /= 10;
                        const currentId = Math.floor((Math.random() * maxId)) * 10 + 2;
                        console.log(currentId);

                        connection.query('SELECT words.word, words.translation FROM words WHERE words.wordId=' + currentId, (err, rows) => {
                                            if(!rows[0]) return;
                                            currentWord = rows[0].word;
                                            currentTranslation = rows[0].translation;
                                            console.log(currentTranslation);
                                            connection.release();
                                            return currentWord;
                                          });
                        });
                      });
}


app.listen(process.env.PORT || 3000, () => {
  console.log(`App started on port ${process.env.PORT || 3000}`);

  loadRandomWord();
});

app.post('/newword', (req, res) => {
  pool.getConnection((err, connection) => {
    if(err) {
      consol.log(err);
    }

    if (req.body.word !== "" && req.body.translation !== "") {
      connection.query(`INSERT INTO words (word, translation, repetitions, correct)
                        VALUES ('${req.body.word}', '${req.body.translation}', 0, 0)`, (err, rows) => {
                          console.log(err);
                          connection.release();
                        });
    }
  });
  res.send('');
});

app.get('/api/getword', (req, res) => {
  loadRandomWord();
  setTimeout(() => {res.send(currentWord);}, 1000);
});

app.post('/api/checkAnswer', (req, res) => {
  if (req.body.answer === currentTranslation) {
    res.send('ПРАВИЛЬНО!');
  }
  res.send('ПОПРОБУЙ ЕЩЕ РАЗОК!!!');
});
