const express = require("express");
const users = require("./users-module");
const bcrypt = require("bcryptjs");
const userRestrict = require("../auth/restricted-users");
const router = express();

router.use(express.json());

router.get("/users", userRestrict, (req, res) => {
  users
    .find()
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      console.error("get error", err);
      res.status(500).json({ errorMessage: "cannot get users at this time" });
    });
});

router.post("/register", (req, res) => {
  const credentials = req.body;
  const hash = bcrypt.hashSync(credentials.password, 12);
  credentials.password = hash;
  users
    .register(credentials)
    .then(addUser => {
      res.status(200).json(addUser);
    })
    .catch(err => {
      console.warn("register error", err);
      res
        .status(500)
        .json({ errorMessage: "cannot create a user at this time" });
    });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  users
    .login({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        req.session.user = user;
        res.status(200).json({ message: `welcome back ${user.username}` });
      } else {
        res.status(401).json({ errorMessage: "invalid credentials" });
      }
    })
    .catch(err => {
      console.log("login error", err);
      res.status(500).json({ errorMessage: "unable to login at this time" });
    });
});

router.get("/logout", (req, res) => {
  if (req.session && req.session.user) {
    req.session.destroy(err => {
      if (err) {
        res.json({ message: "error logging out" });
      } else {
        res.status(200).json({ message: "you are logged out" });
      }
    });
  } else {
    res.status(200).json({
      message:
        "how can you log out if you were never logged in? who gave you access to this button?"
    });
  }
});

module.exports = router;
