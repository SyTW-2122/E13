import * as express from 'express';

const app = express();

app.use(express.json());

app.post("/users/auth", (req, res) => {
  let user = "test";
  let passwd = "test";
  try {
    let myObj:object = req.body;
    if (!req.body.user || !req.body.passwd) {
      throw new Error("User request must have user and passwd fields");
    } else {
      if ((req.body.user == user) && (req.body.passwd == passwd)) {
        res.send("logged in!");
      } else {
        res.send("wrong user or password");
      }
    }
  } catch (err) {
    res.status(400).send("request not valid:" + err);
  }
});


app.get("/", (req, res) => {
  res.send("<h1>Página de inicio<h1> <p>" + req.body + "</p>");
});


app.listen(3000, "172.16.112.2", () => {
  console.log("Server a la escucha en el puerto 3000");
});