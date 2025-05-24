const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'school_db'
});

db.connect(err => {
  if (err) throw err;
  console.log('MySQL connected!');
});

module.exports = db;
