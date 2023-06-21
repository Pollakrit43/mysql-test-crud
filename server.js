var express = require("express");
var cors = require("cors");
var app = express();

// get the client
const mysql = require("mysql2");

// create the connection to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "testdb",
});

app.use(cors());
app.use(express.json());

app.get("/users", function (req, res, next) {
  connection.query("SELECT * FROM `users`", function (err, results, fields) {
    res.json(results);
    console.log(results); // results contains rows returned by server
    console.log(fields); // fields contains extra meta data about results, if available
  });
});

app.get("/users/:id", function (req, res, next) {
  const id = req.params.id;
  connection.query(
    "SELECT * FROM `users` WHERE `id` = ?",
    [id],
    function (err, results) {
      res.json(results);
    }
  );
});

app.post("/create", function (req, res, next) {
  connection.query(
    "INSERT INTO `users`(`fname`, `lname`, `username`, `password`, `avatar`) VALUES (?,?,?,?,?)",
    [
      req.body.fname,
      req.body.lname,
      req.body.username,
      req.body.password,
      req.body.avatar,
    ],
    function (err, results) {
      res.json({message: "User create successfully"});
    }
  );
});

app.put("/edit", function (req, res, next) {
  connection.query(
    "UPDATE `users` SET `fname`=?,`lname`=?,`username`=?,`password`=?,`avatar`=? WHERE id = ?",
    [
      req.body.fname,
      req.body.lname,
      req.body.username,
      req.body.password,
      req.body.avatar,
      req.body.id,
    ],
    function (err, results) {
      res.json({message: "User update successfully"});
    }
  );
});

app.delete("/userdelete", function (req, res, next) {
  connection.query(
    "DELETE FROM `users` WHERE id = ?",
    [req.body.id],
    function (err, results) {
      res.json(results);
    }
  );
});

app.listen(5000, function () {
  console.log("CORS-enabled web server listening on port 5000");
});
