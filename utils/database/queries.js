const mysql = require('mysql');
const pool = require('./pool')

let loadRandomWord = function(callback) {
  pool.pool.getConnection((err, connection) => {
    if(err) {
      console.log(err);
    }

    var maxId = 0;
    connection.query('SELECT MAX(words.wordId) AS mid FROM words', (err, rows) => {
      maxId = rows[0].mid / 10;
      //Unfortuanately, heroku database is crasy, that's why (() * 10 + 2)
      const currentId = Math.floor((Math.random() * maxId)) * 10 + 2;

      connection.query('SELECT words.word, words.translation FROM words WHERE words.wordId=' + currentId, (err, rows) => {
        if(!rows[0]) return;
        connection.release();
        callback(rows);
      });
    });
  });
}

let addNewWord = function(word) {
  pool.pool.getConnection((err, connection) => {
    if (err) {
      return;
    }

    if (word !== null && word.word !== null && word.translation !== null
                      && word.word !== "" && word.translation !== "") {
      connection.query(`INSERT INTO words (word, translation, repetitions, correct)
        VALUES ('${word.word}', '${word.translation}', 0, 0)`, (err, rows) => {
          if (err) {
            return;
          }
          connection.release();
        });
    }
  });
}

let getAllWords = function(callback) {
  pool.pool.getConnection((err, connection) => {
    if(err) {
      console.log(err);
    }

    var maxId = 0;
    connection.query('SELECT * FROM words', (err, rows) => {
      if(!rows[0]) return;
      connection.release();
      callback(rows);
    });
  });
}

module.exports.loadRandomWord = loadRandomWord;
module.exports.addNewWord = addNewWord;
module.exports.getAllWords = getAllWords;
