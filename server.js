// Just writing it for the sake of writing it just to jog the concepts.
// not a production level code or for any industry standards.
// Just wrote it because i love writing code.

const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();

// constants
const PORT = 3000;
const JWT_SECRET = "IloveCoding";
let users = [];

//middlewares
app.use(cors());
app.use(express.json());

// routes

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// signUp
app.post("/signup", (req, res) => {
  //
  const username = req.body.username;
  const password = req.body.password;

  //check for if the user already exists
  const foundUser = users.find((user) => user.username == username);

  if (foundUser) {
    res.status(411).send("User Already Exists");
  }

  users.push({
    username,
    password,
  });

  //generate the token
  const token = jwt.sign(
    {
      username,
    },
    JWT_SECRET
  );

  res.status(200).json({
    message: "Signed UP Successfully",
    token: token,
  });
});

//signin
app.post("/signin", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const foundUser = users.find(
    (user) => user.username == username && user.password == password
  );

  if (!foundUser) {
    res.status(403).send("Authorization FAiled");
  }

  //generate the token
  const token = jwt.sign(
    {
      username,
    },
    JWT_SECRET
  );

  res.status(200).json({
    token,
  });
});

function authMiddleware(req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } else {
    res.status(400).send("Did not provide Authorization token");
  }
}

// me
app.get("/me", authMiddleware, (req, res) => {
  res.json({
    username: req.user.username,
  });
});

app.listen(PORT);
