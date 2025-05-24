const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
  host: 'mysql.railway.internal',
  user: 'root',
  password: 'aVPSLvTrOnOKHMEnLRlhyiVleMKNwQUC',
  database: 'school_db'
});

db.connect(err => {
  if (err) throw err;
  console.log('MySQL connected!');
});

module.exports = db;
