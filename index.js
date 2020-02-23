const express = require("express");
const helmet = require("helmet");
const userRouter = require("./data/users/users-router");
const server = express();
const port = 6200;

server.use(express.json());
server.use(helmet());

server.use("/api", userRouter);

server.get("/", (req, res) => {
  res.send("welcome to my auth project");
});

server.listen(port, () => {
  console.log(`server is up and running on port ${port}`);
});
