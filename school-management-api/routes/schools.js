const express = require('express');
const router = express.Router();
const db = require('../db');
//Took help of this article : https://www.geeksforgeeks.org/haversine-formula-to-find-distance-between-two-points-on-a-sphere/
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Add School API
//I did this first by destructuring them and checking all the variables
// are present or not
router.post('/addSchool', (req, res) => {
  const { name, address, latitude, longitude } = req.body;
  if (!name || !address || isNaN(latitude) || isNaN(longitude)) {
    return res.status(400).json({ message: 'Invalid input data' });
  }
//After successfull checking Program will execute this SQL query 
  const sql = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
  db.query(sql, [name, address, latitude, longitude], (err, result) => {
    if (err) return res.status(500).json({ message: 'DB error', error: err });
    res.status(201).json({ message: 'School added successfully', schoolId: result.insertId });
  });
});

// List Schools API
//This API gives the data from latitude and longitude
router.get('/listSchools', (req, res) => {
  const userLat = parseFloat(req.query.latitude);
  const userLon = parseFloat(req.query.longitude);

  if (isNaN(userLat) || isNaN(userLon)) {
    return res.status(400).json({ message: 'Invalid coordinates' });
  }
//Retrieving Command in SQL is "SELECT * FROM table_name" I have used this command
  db.query('SELECT * FROM schools', (err, schools) => {
    if (err) return res.status(500).json({ message: 'DB error', error: err });

    const sortedSchools = schools.map(school => ({
      ...school,
      distance: calculateDistance(userLat, userLon, school.latitude, school.longitude),
    }))
    .sort((a, b) => a.distance - b.distance);

    res.json(sortedSchools);
  });
});

module.exports = router;
