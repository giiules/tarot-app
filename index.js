const express = require('express');
const config = require('./config');
const mysql = require('mysql2');
const cors = require("cors");
const app = express();
const port = process.env.PORT || 39450;

const pool = mysql.createPool({
  host: config.sql.host,
  user: config.sql.user,
  password: config.sql.password,
  database: config.sql.database,
  port: config.sql.port,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

app.use(express.static('public'));

pool.getConnection((err, connection) => {
  if (err) {
    console.error("Database connection failed:", err);
    process.exit(1); 
  } else {
    console.log("Connected to database", config.sql.database, "on host", config.sql.host);
    connection.release(); 
  }
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/tarot.html');
});

app.get('/api/all', cors(), (req, res) => {
  const statement = "SELECT * FROM tarots";
  pool.query(statement, (err, result) => {
    if (err) {
      console.log("error: ", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(result);
  });
});

app.get('/api/tarots', cors(), (req, res) => {
  const statement = "SELECT * FROM tarots ORDER BY RAND() LIMIT 1;";
  pool.query(statement, (err, result) => {
    if (err) {
      console.log("error: ", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(result);
  });
});

app.get('/api/detail/:id', cors(), (req, res) => {
  const statement = "SELECT * FROM tarots WHERE id = ?";
  pool.query(statement, [req.params.id], (err, result) => {
    if (err) {
      console.log("error: ", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(result);
  });
});

app.get('/images/:imageName', (req, res) => {
  const imageName = req.params.imageName;
  const options = {
      root: __dirname + '/public/',
      headers: {
          'Content-Type': 'image/png',
      },
  };
  
  res.sendFile(imageName, options, (err) => {
      if (err) {
          console.log("Error sending image:", err);
          res.status(404).send('Image not found');
      }
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
