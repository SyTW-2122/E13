import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import * as cors from 'cors';
import {join} from 'path';
import * as mongoose from "mongoose";
import * as userUtilities from "./dbaccess/getUsers";
import { database } from "../config/database";

const app = express();


mongoose.connect(database.remoteUrl , {useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,}
  ).then(()=>{
    console.log("Conected to database: " + database.remoteUrl);
  }).catch((err) => {
    console.log(err)
  });

app.use(express.urlencoded());
app.use(express.json());
app.use(express.static(join(__dirname, '../happyharvest/build')));
app.use(cors());

const authSecret = 'aJDvksKOndi21FKDSasvbniopAD';

function cleanPassword(obj:any) {
  let aux:any = {...obj};
  delete aux.password;
  return aux;

}

const authenticate = (req:any, res:any, next:any) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
      const token = authHeader.split(' ')[1];

      jwt.verify(token, authSecret, (err:any, authinfo:any) => {
          if (err) {
              return res.status(403).send({
                type: "err",
                msg: "Token could not be verified"
              });
          }

          
          req.body.authinfo = authinfo;
          next();
      });
  } else {
      res.status(401).send({
        type: "err",
        msg: "Auth token must be provided"
      });
  }
}

let auxDate = new Date;
let users = [
  {
    username: "test", 
    password: "test", 
    email: "test@example.com", 
    fullname: "TestUser", 
//    registration: "20/12/21",
    registration: 1643138355574,
    "farmElements" : {
   	 "cropSpaces" : 9,
   	 "animalSpaces" : 3,
   	 "currentCrops" : [],
   	 "currentAnimals" : [],
    },
    "inventory" : {
      "currentCash" : 1000,
      "cropBoost" : 0,
      "animalBoost" : 0,
      "products" : []
    }
  },
  {
    username: "test2", 
    password: "test2", 
    email: "test2@example.subdomain.com", 
    fullname: "TestUserTheSecond", 
    registration: 1643138355574,
    "farmElements" : {
   	 "cropSpaces" : 9,
   	 "animalSpaces" : 3,
   	 "currentCrops" : [{element : "crop",
        type : "Calabaza", 
        cycleTime : 36,
        lastProduction : 1643138355574,
        baseProduction : 3,
        probability: 0.67,
        product: {name: "Calabaza",
                  icon : "https://cdn-icons-png.flaticon.com/512/2853/2853247.png",
                  sellPrice : 850},
        icon : "https://cdn-icons-png.flaticon.com/512/2853/2853247.png",
        buyPrice : 500,
        isBoosted : false}],
   	 "currentAnimals" : [],
    },  
    "inventory" : {
      "currentCash" : 1000,
      "cropBoost" : 0,
      "animalBoost" : 0,
      "products" : []
    }
  }
]

app.post("/users", (req, res) => {
  try {
    if (!req.body.username || !req.body.password || !req.body.email) {
      throw new Error("User request must have username, email and password fields");
    } else {
      userUtilities.checkIfValidReg(req.body.username, req.body.email).then((v) => {
        if(v.register == false) {
          res.status(400).send(JSON.stringify(v))
        } else {
          userUtilities.postNewUser({
            username: req.body.username, 
            password: req.body.password, 
            email: req.body.email, 
            fullname: req.body.username, 
            registration: new Date().getTime(),
            "farmElements" : {
              "cropSpaces" : 9,
              "animalSpaces" : 3,
              "currentCrops" : [],
              "currentAnimals" : [],
            },
            "inventory" : {
              "currentCash" : 1000,
              "cropBoost" : 0,
              "animalBoost" : 0,
              "products" : [],
              "seeds" : []
            }
          }).then(() => {
            res.send(JSON.stringify({
              type: "res",
              register: "true"
            }));
          }).catch((err) => {
            res.status(500).send(JSON.stringify({
              type: "err",
              msg: err
            }));
          });
        }
      }).catch((err) => {
        res.status(500).send(JSON.stringify({
          type: "err",
          msg: err
        }))
      })
    }
  } catch (err) {
    res.status(400).send(JSON.stringify({
      type: "err",
      msg: "Request not valid: " + err
    }));
  }
});

app.post("/users/auth", (req, res) => {
  try {
    if (!req.body.username || !req.body.password) {
      throw new Error("User request must have username and password fields");
    } else {
      userUtilities.validateUser(req.body.username, req.body.password).then((v) => {
        if(v) {
          userUtilities.returnCleanUser(req.body.username).then((user) => {
            let token = jwt.sign({username: user.username}, authSecret, {expiresIn: '120m'});
            res.send(JSON.stringify({
              type: "res",
              status: "true",
              ...user,
              authToken : token,
              msg: "User logged in"
            }));
          }).catch((err) => {
            res.status(500).send(JSON.stringify({
              type: "err",
              msg: err
            }))
          });
        } else {
          res.send(JSON.stringify({
            type: "res",
            status: "false",
            msg: "Wrong user or password"
          }));
        }
      }).catch((err) => {
        res.status(500).send(JSON.stringify({
          type: "err",
          msg: err
        }))
      });
    }
  } catch (err) {
    res.status(400).send(JSON.stringify({
      type: "err",
      msg: "Request not valid: " + err
    }));
  }
});

app.post("/users/:user/Seeds", authenticate, (req, res) => {
  if(req.params.user === req.body.authinfo.username) {
    userUtilities.buySeeds(req.params.user, req.query.name, req.query.quantity).then((msg) => {
      res.status(200).send(JSON.stringify({
        type: "res",
        msg: msg
      }));
    }).catch((err) => {
      res.status(400).send(err);
    });
  } else {
    res.send({
      type: "err",
      msg: `User ${req.body.authinfo.username} cant access this resource`
    });
  }
});

app.post("/users/:user/Products", authenticate, (req, res) => {
  if(req.params.user === req.body.authinfo.username) {
    userUtilities.sellProducts(req.params.user, req.query.name, req.query.quantity).then((msg) => {
      res.status(200).send(JSON.stringify({
        type: "res",
        msg: msg
      }));
    }).catch((err) => {
      res.status(400).send(err);
    });
  } else {
    res.send({
      type: "err",
      msg: `User ${req.body.authinfo.username} cant access this resource`
    });
  }
});

app.post("/users/:user/Crops", authenticate, (req, res) => {
  if(req.params.user === req.body.authinfo.username) {
    userUtilities.growCrops(req.params.user, req.query.type).then((msg) => {
      res.status(200).send(JSON.stringify({
        type: "res",
        msg: msg
      }));
    }).catch((err) => {
      res.status(400).send(err);
    });
  } else {
    res.send({
      type: "err",
      msg: `User ${req.body.authinfo.username} cant access this resource`
    });
  }
});

app.get("/users/:user/Crops", authenticate, (req, res) => {
  if(req.params.user === req.body.authinfo.username) {
    userUtilities.harvestCrops(req.params.user, req.query.position).then((msg) => {
      res.status(200).send(JSON.stringify({
        type: "res",
        msg: msg
      }));
    }).catch((err) => {
      res.status(400).send(err);
    });
  } else {
    res.send({
      type: "err",
      msg: `User ${req.body.authinfo.username} cant access this resource`
    });
  }
});

app.get("/users/:user", authenticate, (req, res) => {
  if(req.params.user === req.body.authinfo.username) {
    userUtilities.returnCleanUser(req.body.authinfo.username).then((userInfo) => {
        res.status(200).send({
        type: "res",
        msg: "",
        ...cleanPassword(userInfo)
      });
    }).catch((err) => {
      res.status(500).send(JSON.stringify({
        type: "err",
        msg: err
      }))
    })
    
    
  } else {
    res.send({
      type: "err",
      msg: `User ${req.body.authinfo.username} cant access this resource`
    });
  }
});



app.get("/ranking", authenticate, (req, res) => {
  res.send({
    first: "userfirst",
    second: "usersecond",
    third: "userthird"
  });
});

app.get("/", (req, res) => {
  res.sendFile("/index.html");
});


app.get("/testing/getUsers", (_, res) => {
  userUtilities.getUsers().then((list) => {
    res.status(200).send(list);
  }).catch((err) => {
    res.status(400).send(err);
  });
});

app.get("/testing/findUserByName", (req, res) => {
  userUtilities.findUserByName(req.query.username).then((list) => {
    res.status(200).send(list);
  }).catch((err) => {
    res.status(400).send(err);
  });
});

app.get("/testing/deleteOneUser", (req, res) => {
  userUtilities.deleteOneUser(req.query.username).then((list) => {
    res.status(200).send(list);
  }).catch((err) => {
    res.status(400).send(err);
  });
});

app.get("/testing/validateUser", (req, res) => {
  userUtilities.validateUser(req.query.username, req.query.password).then((v) => {
    res.status(200).send(v);
  }).catch((err) => {
    res.status(400).send(err);
  });
});

app.get("/testing/returnCleanUser", (req, res) => {
  userUtilities.returnCleanUser(req.query.username).then((list) => {
    res.status(200).send(list);
  }).catch((err) => {
    res.status(400).send(err);
  });
});

app.post("/testing/addSeeds", (req, res) => {
  userUtilities.addSeeds(req.query.username, req.query.name, req.query.quantity).then((list) => {
    res.status(200).send(list);
  }).catch((err) => {
    res.status(400).send(err);
  });
});

app.post("/testing/harvestCrops", (req, res) => {
  userUtilities.harvestCrops(req.query.username, req.query.pos).then((list) => {
    res.status(200).send(list);
  }).catch((err) => {
    res.status(400).send(err);
  });
});

app.post("/testing/cleanAll", (req, res) => {
  userUtilities.cleanAll(req.query.username).then((list) => {
    res.status(200).send(list);
  }).catch((err) => {
    res.status(400).send(err);
  });
});


app.get("*", (req, res) => {
  res.redirect("/");
});

app.listen(3000, "172.16.112.2", () => {
  console.log("Server a la escucha en el puerto 3000");
  console.log(database.remoteUrl);
});