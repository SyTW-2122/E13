import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import * as cors from 'cors';
import {join} from 'path';

const app = express();

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

let users = [
  {
    username: "test", 
    password: "test", 
    email: "test@example.com", 
    fullname: "TestUser", 
    registration: "20/12/21",
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
    registration: "10/12/21",
    "farmElements" : {
   	 "cropSpaces" : 9,
   	 "animalSpaces" : 3,
   	 "currentCrops" : [],
   	 "currentAnimals" : [],
    },  
    "inventory" : {
      "currentCash" : "1000",
      "cropBoost" : "0",
      "animalBoost" : "0",
      "products" : []
    }
  }
]

app.post("/users", (req, res) => {
  console.log(req.body);
  try {
    if (!req.body.username || !req.body.password || !req.body.email) {
      throw new Error("User request must have username, email and password fields");
    } else {
      
      let user = users.find((u) => {return u.username === req.body.username});
      let email = users.find((u) => {return u.email === req.body.email});
      if (user) {
        res.send(JSON.stringify({
          type: "res",
          register: "false",
          validUser: "El usuario ya existe"
        }));
      } else if (email) {
        res.send(JSON.stringify({
          type: "res",
          register: "false",
          validEmail: "Usted ya posee una cuenta asociada a este correo"
        }));
      } else {
        users.push({
          username: req.body.username, 
          password: req.body.password, 
          email: req.body.email, 
          fullname: req.body.username, 
          registration: new Date().toDateString(),
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
        });
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
});

app.post("/users/auth", (req, res) => {
  try {
    
    if (!req.body.username || !req.body.password) {
      throw new Error("User request must have username and password fields");
    } else {
      
      let user = users.find((u) => {return u.username === req.body.username && u.password === req.body.password});
      if (user) {
        let token = jwt.sign({username: user.username}, authSecret, {expiresIn: '120m'});
        res.send(JSON.stringify({
          type: "res",
          status: "true",
          ...user,
          authToken : token,
          msg: "User logged in"
        }));
      } else {
        res.send(JSON.stringify({
          type: "res",
          status: "false",
          msg: "Wrong user or password"
        }));
      }
    }
  } catch (err) {
    res.status(400).send(JSON.stringify({
      type: "err",
      msg: "Request not valid: " + err
    }));
  }
});


app.get("/users/:user", authenticate, (req, res) => {
  if(req.params.user === req.body.authinfo.username) {
    let userInfo = users.find((u) => {return u.username === req.body.authinfo.username})
    
    res.status(200).send({
      type: "res",
      msg: "",
      ...cleanPassword(userInfo)
    });
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

app.get("*", (req, res) => {
  res.redirect("/");
});


app.listen(3000, "172.16.112.2", () => {
  console.log("Server a la escucha en el puerto 3000");
});