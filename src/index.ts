import * as express from 'express';
import {join} from 'path'

const app = express();

app.use(express.urlencoded());
app.use(express.json());
app.use(express.static(join(__dirname, '../happyharvest/build')));

app.post("/users/auth", (req, res) => {
  let user = "test";
  let passwd = "test";
  console.log(req.body);
  try {
    let myObj:object = req.body;
    if (!req.body.user || !req.body.passwd) {
      throw new Error("User request must have user and passwd fields");
    } else {
      if ((req.body.user == user) && (req.body.passwd == passwd)) {
        res.send(JSON.stringify({
          logged: "true",
          msg: "User logged in"
        }));
      } else {
        res.send(JSON.stringify({
          logged: "false",
          msg: "Wrong user or password"
        }));
      }
    }
  } catch (err) {
    res.status(400).send(JSON.stringify({msg: "request not valid:" + err}));
  }
});


app.get("/", (req, res) => {
  res.sendFile("/index.html");
});


app.listen(3000, "172.16.112.2", () => {
  console.log("Server a la escucha en el puerto 3000");
});