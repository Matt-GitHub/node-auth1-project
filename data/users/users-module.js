const db = require("../db-config");

function find() {
  return db("users").select("users.id", "users.username");
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
