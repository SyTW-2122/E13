"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var express = require("express");
var jwt = require("jsonwebtoken");
var cors = require("cors");
var path_1 = require("path");
var mongoose = require("mongoose");
var userUtilities = require("./dbaccess/getUsers");
var database_1 = require("../config/database");
var app = express();
mongoose.connect(database_1.database.remoteUrl, { useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true }).then(function () {
    console.log("Conected to database: " + database_1.database.remoteUrl);
})["catch"](function (err) {
    console.log(err);
});
app.use(express.urlencoded());
app.use(express.json());
app.use(express.static((0, path_1.join)(__dirname, '../happyharvest/build')));
app.use(cors());
var authSecret = 'aJDvksKOndi21FKDSasvbniopAD';
function cleanPassword(obj) {
    var aux = __assign({}, obj);
    delete aux.password;
    return aux;
}
var authenticate = function (req, res, next) {
    var authHeader = req.headers.authorization;
    if (authHeader) {
        var token = authHeader.split(' ')[1];
        jwt.verify(token, authSecret, function (err, authinfo) {
            if (err) {
                return res.status(403).send({
                    type: "err",
                    msg: "Token could not be verified"
                });
            }
            req.body.authinfo = authinfo;
            next();
        });
    }
    else {
        res.status(401).send({
            type: "err",
            msg: "Auth token must be provided"
        });
    }
};
var auxDate = new Date;
var users = [
    {
        username: "test",
        password: "test",
        email: "test@example.com",
        fullname: "TestUser",
        //    registration: "20/12/21",
        registration: 1643138355574,
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
        registration: 1643138355574,
        "farmElements": {
            "cropSpaces": 9,
            "animalSpaces": 3,
            "currentCrops": [{ element: "crop",
                    type: "Calabaza",
                    cycleTime: 36,
                    lastProduction: 1643138355574,
                    baseProduction: 3,
                    probability: 0.67,
                    product: { name: "Calabaza",
                        icon: "https://cdn-icons-png.flaticon.com/512/2853/2853247.png",
                        sellPrice: 850 },
                    icon: "https://cdn-icons-png.flaticon.com/512/2853/2853247.png",
                    buyPrice: 500,
                    isBoosted: false }],
            "currentAnimals": []
        },
        "inventory": {
            "currentCash": 1000,
            "cropBoost": 0,
            "animalBoost": 0,
            "products": []
        }
    }
];
app.post("/users", function (req, res) {
    try {
        if (!req.body.username || !req.body.password || !req.body.email) {
            throw new Error("User request must have username, email and password fields");
        }
        else {
            userUtilities.checkIfValidReg(req.body.username, req.body.email).then(function (v) {
                if (v.register == false) {
                    res.status(400).send(JSON.stringify(v));
                }
                else {
                    userUtilities.postNewUser({
                        username: req.body.username,
                        password: req.body.password,
                        email: req.body.email,
                        fullname: req.body.username,
                        registration: new Date().getTime(),
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
                            "products": [],
                            "seeds": []
                        }
                    }).then(function () {
                        res.send(JSON.stringify({
                            type: "res",
                            register: "true"
                        }));
                    })["catch"](function (err) {
                        res.status(500).send(JSON.stringify({
                            type: "err",
                            msg: err
                        }));
                    });
                }
            })["catch"](function (err) {
                res.status(500).send(JSON.stringify({
                    type: "err",
                    msg: err
                }));
            });
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
            userUtilities.validateUser(req.body.username, req.body.password).then(function (v) {
                if (v) {
                    userUtilities.returnCleanUser(req.body.username).then(function (user) {
                        var token = jwt.sign({ username: user.username }, authSecret, { expiresIn: '120m' });
                        res.send(JSON.stringify(__assign(__assign({ type: "res", status: "true" }, user), { authToken: token, msg: "User logged in" })));
                    })["catch"](function (err) {
                        res.status(500).send(JSON.stringify({
                            type: "err",
                            msg: err
                        }));
                    });
                }
                else {
                    res.send(JSON.stringify({
                        type: "res",
                        status: "false",
                        msg: "Wrong user or password"
                    }));
                }
            })["catch"](function (err) {
                res.status(500).send(JSON.stringify({
                    type: "err",
                    msg: err
                }));
            });
        }
    }
    catch (err) {
        res.status(400).send(JSON.stringify({
            type: "err",
            msg: "Request not valid: " + err
        }));
    }
});
app.post("/users/:user/Seeds", authenticate, function (req, res) {
    if (req.params.user === req.body.authinfo.username) {
        userUtilities.buySeeds(req.params.user, req.query.name, req.query.quantity).then(function (msg) {
            res.status(200).send(JSON.stringify({
                type: "res",
                msg: msg
            }));
        })["catch"](function (err) {
            res.status(400).send(err);
        });
    }
    else {
        res.send({
            type: "err",
            msg: "User ".concat(req.body.authinfo.username, " cant access this resource")
        });
    }
});
app.post("/users/:user/Products", authenticate, function (req, res) {
    if (req.params.user === req.body.authinfo.username) {
        userUtilities.sellProducts(req.params.user, req.query.name, req.query.quantity).then(function (msg) {
            res.status(200).send(JSON.stringify({
                type: "res",
                msg: msg
            }));
        })["catch"](function (err) {
            res.status(400).send(err);
        });
    }
    else {
        res.send({
            type: "err",
            msg: "User ".concat(req.body.authinfo.username, " cant access this resource")
        });
    }
});
app.post("/users/:user/Crops", authenticate, function (req, res) {
    if (req.params.user === req.body.authinfo.username) {
        userUtilities.growCrops(req.params.user, req.query.type).then(function (msg) {
            res.status(200).send(JSON.stringify({
                type: "res",
                msg: msg
            }));
        })["catch"](function (err) {
            res.status(400).send(err);
        });
    }
    else {
        res.send({
            type: "err",
            msg: "User ".concat(req.body.authinfo.username, " cant access this resource")
        });
    }
});
app.get("/users/:user/Crops", authenticate, function (req, res) {
    if (req.params.user === req.body.authinfo.username) {
        userUtilities.harvestCrops(req.params.user, req.query.position).then(function (msg) {
            res.status(200).send(JSON.stringify({
                type: "res",
                msg: msg
            }));
        })["catch"](function (err) {
            res.status(400).send(err);
        });
    }
    else {
        res.send({
            type: "err",
            msg: "User ".concat(req.body.authinfo.username, " cant access this resource")
        });
    }
});
app.get("/users/:user", authenticate, function (req, res) {
    if (req.params.user === req.body.authinfo.username) {
        userUtilities.returnCleanUser(req.body.authinfo.username).then(function (userInfo) {
            res.status(200).send(__assign({ type: "res", msg: "" }, cleanPassword(userInfo)));
        })["catch"](function (err) {
            res.status(500).send(JSON.stringify({
                type: "err",
                msg: err
            }));
        });
    }
    else {
        res.send({
            type: "err",
            msg: "User ".concat(req.body.authinfo.username, " cant access this resource")
        });
    }
});
app.get("/ranking", authenticate, function (req, res) {
    res.send({
        first: "userfirst",
        second: "usersecond",
        third: "userthird"
    });
});
app.get("/", function (req, res) {
    res.sendFile("/index.html");
});
app.get("/testing/getUsers", function (_, res) {
    userUtilities.getUsers().then(function (list) {
        res.status(200).send(list);
    })["catch"](function (err) {
        res.status(400).send(err);
    });
});
app.get("/testing/findUserByName", function (req, res) {
    userUtilities.findUserByName(req.query.username).then(function (list) {
        res.status(200).send(list);
    })["catch"](function (err) {
        res.status(400).send(err);
    });
});
app.get("/testing/deleteOneUser", function (req, res) {
    userUtilities.deleteOneUser(req.query.username).then(function (list) {
        res.status(200).send(list);
    })["catch"](function (err) {
        res.status(400).send(err);
    });
});
app.get("/testing/validateUser", function (req, res) {
    userUtilities.validateUser(req.query.username, req.query.password).then(function (v) {
        res.status(200).send(v);
    })["catch"](function (err) {
        res.status(400).send(err);
    });
});
app.get("/testing/returnCleanUser", function (req, res) {
    userUtilities.returnCleanUser(req.query.username).then(function (list) {
        res.status(200).send(list);
    })["catch"](function (err) {
        res.status(400).send(err);
    });
});
app.post("/testing/addSeeds", function (req, res) {
    userUtilities.addSeeds(req.query.username, req.query.name, req.query.quantity).then(function (list) {
        res.status(200).send(list);
    })["catch"](function (err) {
        res.status(400).send(err);
    });
});
app.post("/testing/harvestCrops", function (req, res) {
    userUtilities.harvestCrops(req.query.username, req.query.pos).then(function (list) {
        res.status(200).send(list);
    })["catch"](function (err) {
        res.status(400).send(err);
    });
});
app.post("/testing/cleanAll", function (req, res) {
    userUtilities.cleanAll(req.query.username).then(function (list) {
        res.status(200).send(list);
    })["catch"](function (err) {
        res.status(400).send(err);
    });
});
app.get("*", function (req, res) {
    res.redirect("/");
});
app.listen(3000, "172.16.112.2", function () {
    console.log("Server a la escucha en el puerto 3000");
    console.log(database_1.database.remoteUrl);
});
