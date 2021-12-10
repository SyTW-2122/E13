import * as express from 'express';

const app = express();

app.use(express.json());

app.post("/users/auth", (req, res) => {
  try {
    let myObj:object = req.body;
    res.send("");
  } catch (err) {
    res.send("request not valid:" + err);
  }
});


app.get("/", (req, res) => {
  res.send("<h1>Página de inicio<h1> <p>" + req.body + "</p>");
});


app.listen(3000, "172.16.112.2", () => {
  console.log("Server a la escucha en el puerto 3000");
});