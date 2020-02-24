const express = require("express");
const helmet = require("helmet");
const userRouter = require("./data/users/users-router");
const session = require("express-session");
const server = express();
const port = 6200;

const sessionConfig = session({
  name: "anon",
  secret: "here for now",
  cookie: {
    maxAge: 1 * 24 * 60 * 60 * 1000,
    secure: false
  },
  httpOnly: true,
  resave: false,
  saveUninitialized: false
});

server.use(express.json());
server.use(helmet());
server.use(sessionConfig);

server.use("/api", userRouter);

server.get("/", (req, res) => {
  res.send("welcome to my auth project");
});

server.listen(port, () => {
  console.log(`server is up and running on port ${port}`);
});
