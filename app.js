const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Create MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',  // Replace with your MySQL username
  password: 'password',  // Replace with your MySQL password
  database: 'careercarve',  // Replace with your MySQL database name
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('MySQL connected...');
});

// Route to fetch all students
app.get('/api/students', (req, res) => {
  const sql = 'SELECT * FROM students';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// Route to fetch all mentors
app.get('/api/mentors', (req, res) => {
  const sql = 'SELECT * FROM mentors';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// Route to schedule a session
app.post('/api/schedule', (req, res) => {
  const { student, mentor, duration, areaOfInterest, premium, cost } = req.body;
  const sql = `INSERT INTO sessions (student_id, mentor_id, duration, area_of_interest, premium, cost) 
               VALUES (${student}, ${mentor}, ${duration}, '${areaOfInterest}', ${premium ? 1 : 0}, ${cost})`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json({ status: 'success', sessionId: result.insertId });
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
