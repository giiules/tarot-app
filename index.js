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
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/tarot.html');
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error("Oh oh! The stars seem to not be aligning:", err);
    process.exit(1); 
  } else {
    console.log("Yes, there has been a connection", config.sql.database, "on host", config.sql.host);
    connection.release(); 
  }
});

app.get('/api/all', cors(), (req, res) => {
  const statement = "SELECT * FROM tarots";
  pool.query(statement, (err, result) => {
    if (err) {
      console.log("error: ", err);
      return res.status(500).json({ error: "Oh oh, no connection in the stars" });
    }
    res.json(result);
  });
});

app.get('/api/tarots', cors(), (req, res) => {
  const statement = "SELECT * FROM tarots ORDER BY RAND() LIMIT 1;";
  pool.query(statement, (err, result) => {
    if (err) {
      console.log("error: ", err);
      return res.status(500).json({ error: "Oh oh, no connection in the stars" });
    }
    res.json(result);
  });
});

app.get('/api/detail/:id', cors(), (req, res) => {
  const statement = "SELECT * FROM tarots WHERE id = ?";
  pool.query(statement, [req.params.id], (err, result) => {
    if (err) {
      console.log("error: ", err);
      return res.status(500).json({ error: "Oh oh, no connection in the stars" });
    }
    res.json(result);
  });
});

app.get('/images/:imageName', (req, res) => {
  const imageName = req.params.imageName;
  res.sendFile(__dirname + '/public/images/' + imageName);
});

app.listen(port, () => {
  console.log(`Connection has been made on ${port}`);
});
