const db = require("../db-config");

function find() {
  return db("users");
}

function register(userData) {
  return db("users").insert(userData);
}

function login(username) {
  return db("users").where(username);
}

module.exports = {
  find,
  register,
  login
};
