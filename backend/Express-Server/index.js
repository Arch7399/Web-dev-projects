import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Server HTTP response for GET request...");
});

app.get("/hobbies", (req, res) => {
  res.send(
    "<h1>Hobbies</h1><ul><li>Programming</li><li>Pet care</li><li>Movies</li></ul>"
  );
});

app.get("/contact", (req, res) => {
  res.send(
    `<a target="blank" href="mail.google.com"><u>raymondrajkumar0201@gmail.com</u></a>`
  );
});

app.post("/register", (req, res) => {
  res.sendStatus(201);
});

app.put("/user/ray", (req, res) => {
  res.sendStatus(200);
});

app.patch("/user/ray", (req, res) => {
  res.sendStatus(200);
});

app.delete("/user/ray", (req, res) => {
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
