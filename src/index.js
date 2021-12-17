"use strict";
exports.__esModule = true;
var express = require("express");
var path_1 = require("path");
var app = express();
app.use(express.urlencoded());
app.use(express.json());
app.use(express.static((0, path_1.join)(__dirname, '../happyharvest/build')));
/*
app.post("/users", (req, res) => {
  console.log(req.body);
  let existingUsers = ["test", "otheruser"];
  let existingEmails = ["test@example.com", "otheruser@example.other.com"];
  try {
    let myObj:object = req.body;
    if (!req.body.username || !req.body.password || !req.body.email) {
      throw new Error("User request must have username and password fields");
    } else {
      if (existingUsers.indexOf(req.body.username) !== -1) {
        res.send(JSON.stringify({
          type: "res",
          register: "false",
          validUser: "El usuario ya existe"
        }));
      } else if (existingEmails.indexOf(req.body.email) !== -1) {
        res.send(JSON.stringify({
          type: "res",
          register: "false",
          validEmail: "Usted ya posee una cuenta asociada a este correo"
        }));
      } else {
        res.send(JSON.stringify({
          type: "res",
          register: "true"
        }));
      }
    }
  } catch (err) {
    res.status(400).send(JSON.stringify({
      type: "err",
      msg: "Request not valid: " + err
    }));
  }
});*/
app.post("/users/auth", function (req, res) {
    var user = "test";
    var passwd = "test";
    console.log(req.body);
    try {
        var myObj = req.body;
        if (!req.body.username || !req.body.password) {
            throw new Error("User request must have username and password fields");
        }
        else {
            if ((req.body.username == user) && (req.body.password == passwd)) {
                res.send(JSON.stringify({
                    type: "res",
                    logged: "true",
                    msg: "User logged in"
                }));
            }
            else {
                res.send(JSON.stringify({
                    type: "res",
                    logged: "false",
                    msg: "Wrong user or password"
                }));
            }
        }
    }
    catch (err) {
        res.status(400).send(JSON.stringify({
            type: "err",
            msg: "Request not valid: " + err
        }));
    }
});
app.get("/", function (req, res) {
    res.sendFile("/index.html");
});
app.listen(3000, "172.16.112.2", function () {
    console.log("Server a la escucha en el puerto 3000");
});
