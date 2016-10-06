const express = require('express');
const app = express();
const mysql = require('mysql');
const formidable = require('formidable');
const bodyParser = require('body-parser');
let currentWord = ""
let currentTranslation = "";

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use(express.static('public'));

const pool = mysql.createPool({
  host     : 'us-cdbr-iron-east-04.cleardb.net',
  user     : 'bf04c08bb60517',
  password : 'e50d1191',
  database : 'heroku_5e754667688fa3a'
});



app.listen(process.env.PORT || 3000, () => {
  console.log(`App started on port ${process.env.PORT || 3000}`);

  pool.getConnection((err, connection) => {
    if(err) {
      console.log(err);
    }

    let maxId = 0;
    connection.query('SELECT MAX(words.wordId) AS mid FROM words', (err, rows) => {
                        console.log(err)
                        maxId = rows[0].mid
                        maxId /= 10;
                      });

    const currentId = Math.floor((Math.random() * maxId)) * 10 + 2;

    console.log(currentId);

    connection.query('SELECT words.word, words.translation FROM words WHERE words.wordId=' + currentId, (err, rows) => {
                        console.log(err)
                        currentWord = rows[0].word;
                        currentTranslation = rows[0].translation;
                        console.log(currentTranslation);
                        connection.release();
                      });
  });

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
  res.send('/newword.html');
});

app.post('/test', (req, res) => {
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
  res.send('/test.html');
});
