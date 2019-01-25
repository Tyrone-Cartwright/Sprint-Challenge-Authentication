const axios = require("axios");

const knex = require("knex");
const knexConfig = require("../knexfile.js");
const { authenticate } = require("../auth/authenticate");
const bcrypt = require("bcryptjs");

const db = knex(knexConfig.development);

module.exports = server => {
  server.post("/api/register", register);
  server.post("/api/login", login);
  server.get("/api/jokes", authenticate, getJokes);
};

function register(req, res) {
  // implement user registration
  const userInfo = req.body;

  // hash password
  const hash = bcrypt.hashSync(userInfo.password, 14);
  userInfo.password = hash;
  db("users")
    .insert(userInfo)
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => res.status(500).json(err));
}

function login(req, res) {
  // implement user login
}

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: "application/json" }
  };

  axios
    .get("https://icanhazdadjoke.com/search", requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: "Error Fetching Jokes", error: err });
    });
}
