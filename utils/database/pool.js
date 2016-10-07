const mysql = require('mysql');

const credentials = {
  host     : 'us-cdbr-iron-east-04.cleardb.net',
  user     : 'bf04c08bb60517',
  password : 'e50d1191',
  database : 'heroku_5e754667688fa3a'
};

const pool = mysql.createPool(credentials);

module.exports.pool = pool;
