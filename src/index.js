"use strict";
exports.__esModule = true;
var express = require("express");
var path_1 = require("path");
var app = express();
app.use(express.urlencoded());
app.use(express.json());
app.use(express.static((0, path_1.join)(__dirname, '../happyharvest/build')));
app.post("/users/auth", function (req, res) {
    var user = "test";
    var passwd = "test";
    console.log(req.body);
    try {
        var myObj = req.body;
        if (!req.body.user || !req.body.passwd) {
            throw new Error("User request must have user and passwd fields");
        }
        else {
            if ((req.body.user == user) && (req.body.passwd == passwd)) {
                res.send(JSON.stringify({
                    logged: "true",
                    msg: "User logged in"
                }));
            }
            else {
                res.send(JSON.stringify({
                    logged: "false",
                    msg: "Wrong user or password"
                }));
            }
        }
    }
    catch (err) {
        res.status(400).send(JSON.stringify({ msg: "request not valid:" + err }));
    }
});
app.get("/", function (req, res) {
    res.sendFile("/index.html");
});
app.listen(3000, "172.16.112.2", function () {
    console.log("Server a la escucha en el puerto 3000");
});
