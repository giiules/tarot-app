const config = require('./config');
const mysql = require('mysql');
const express = require('express');
const cors = require("cors");
const app = express();
const port = 3000;

const con = mysql.createConnection(config.sql);

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.send('<em>Your card reading</em>');
})

app.get('/api/all',cors(), (req, res) => {
  const statement = "SELECT * FROM tarots"

  con.query(statement, (err, result) => {
    if (err) {
      console.log("error: ", err);
      return;
    }
    if (result.length) {
      res.json(result)
    }
  });
})

app.get('/api/tarots',cors(), (req, res) => {
  const statement = "SELECT * FROM tarots\
                    ORDER BY RAND()\
                    LIMIT 1;"

  con.query(statement, (err, result) => {
    if (err) {
      console.log("error: ", err);
      return;
    }
    if (result.length) {
      res.json(result)
    }
  });
})

app.get('/api/detail/:id',cors(), (req, res) => {
  const statement = "SELECT * FROM tarots\
  WHERE id = " + req.params.id
  con.query(statement, (err, result) => {
  if (err) {
  console.log("error: ", err);
  return;
  }
  if (result.length) {
  res.json(result)
  }
  });
  })
  
app.listen(port, () => {
  console.log(`Tarot card being drawn ${port}`);

  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected to database",config.sql.database,"on host",config.sql.host);
  });

});
