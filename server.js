const express = require("express");

const app = express();

// constants
const PORT = 3000;

// routes

app.get("/", (req, res) => {
  res.sendFile(__dirname + "./public/index.html");
});

app.listen(PORT);
