"use strict";
exports.__esModule = true;
var express = require("express");
var jwt = require("jsonwebtoken");
var path_1 = require("path");
var app = express();
app.use(express.urlencoded());
app.use(express.json());
app.use(express.static((0, path_1.join)(__dirname, '../happyharvest/build')));
var authSecret = 'aJDvksKOndi21FKDSasvbniopAD';
var refreshSecret = 'knasdfklNVnDlvjmQEFfdscAJCdz';
var generatedTokens = [];
var users = [
    {
        username: "test",
        password: "test",
        email: "test@example.com",
        fullname: "TestUser",
        registration: "20/12/21",
        "farmElements": {
            "cropSpaces": 9,
            "animalSpaces": 3,
            "currentCrops": [],
            "currentAnimals": []
        },
        "inventory": {
            "currentCash": 1000,
            "cropBoost": 0,
            "animalBoost": 0,
            "products": []
        }
    },
    {
        username: "test2",
        password: "test2",
        email: "test2@example.subdomain.com",
        fullname: "TestUserTheSecond",
        registration: "10/12/21",
        "farmElements": {
            "cropSpaces": 9,
            "animalSpaces": 3,
            "currentCrops": [],
            "currentAnimals": []
        },
        "inventory": {
            "currentCash": "1000",
            "cropBoost": "0",
            "animalBoost": "0",
            "products": []
        }
    }
];
app.post("/users", function (req, res) {
    console.log(req.body);
    try {
        if (!req.body.username || !req.body.password || !req.body.email) {
            throw new Error("User request must have username, email and password fields");
        }
        else {
            var user = users.find(function (u) { return u.username === req.body.username; });
            var email = users.find(function (u) { return u.email === req.body.email; });
            if (user) {
                res.send(JSON.stringify({
                    type: "res",
                    register: "false",
                    validUser: "El usuario ya existe"
                }));
            }
            else if (email) {
                res.send(JSON.stringify({
                    type: "res",
                    register: "false",
                    validEmail: "Usted ya posee una cuenta asociada a este correo"
                }));
            }
            else {
                users.push({
                    username: req.body.username,
                    password: req.body.password,
                    email: req.body.email,
                    fullname: req.body.username,
                    registration: new Date().toDateString(),
                    "farmElements": {
                        "cropSpaces": 9,
                        "animalSpaces": 3,
                        "currentCrops": [],
                        "currentAnimals": []
                    },
                    "inventory": {
                        "currentCash": 1000,
                        "cropBoost": 0,
                        "animalBoost": 0,
                        "products": []
                    }
                });
                res.send(JSON.stringify({
                    type: "res",
                    register: "true"
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
app.post("/users/auth", function (req, res) {
    try {
        if (!req.body.username || !req.body.password) {
            throw new Error("User request must have username and password fields");
        }
        else {
            var user = users.find(function (u) { return u.username === req.body.username && u.password === req.body.password; });
            if (user) {
                var token = jwt.sign({ username: user.username }, authSecret);
                res.send(JSON.stringify({
                    type: "res",
                    status: "true",
                    username: user.username,
                    fullname: user.fullname,
                    email: user.email,
                    registration: user.registration,
                    accessToken: token,
                    msg: "User logged in"
                }));
            }
            else {
                res.send(JSON.stringify({
                    type: "res",
                    status: "false",
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
