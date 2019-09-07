var express = require("express");
var router = express.Router();
const Joi = require("@hapi/joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { getClient } = require("../db");

router.post("/login", async function(req, res) {
  const loginSchema = Joi.object().keys({
    username: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .required(),
    password: Joi.string()
      .min(3)
      .max(30)
      .required()
  });

  const result = loginSchema.validate(req.body);

  if (result.error) {
    res.status(401).json({
      success: false,
      data: null,
      error: "could not authenticate"
    });
  }

  const client = await getClient();
  const username = req.body.username;
  const password = req.body.password;

  const { rows } = await client.query("SELECT * FROM users WHERE username=$1", [
    username
  ]);

  const valid = bcrypt.compare(password, rows[0].password);

  if (!valid) {
    res.status(401).json({
      success: false,
      data: null,
      error: "could not authenticate"
    });
  }
  //TODO load user and check pass word and create token
  const token = jwt.sign({ username }, process.env.JWT_KEY, {
    expiresIn: 60 * 60
  });

  res.json({
    success: true,
    data: {
      token
    },
    error: null
  });
  console.log(`user '${username}' logged in`);
});

router.post("/register", async function(req, res) {
  const loginSchema = Joi.object().keys({
    username: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .required(),
    password: Joi.string()
      .min(3)
      .max(30)
      .required()
  });

  const result = loginSchema.validate(req.body);

  if (result.error) {
    res.status(401).json({ error: "could not authenticate" });
  }

  const client = await getClient();
  const username = req.body.username;
  const hashedPW = await bcrypt.hash(req.body.password, 10);

  const { rows } = await client.query(
    "INSERT INTO users (username, password) VALUES($1, $2)",
    [username, hashedPW]
  );

  console.log(`created user '${username}'`);

  res.json({
    success: true,
    data: {
      user: {
        username
      }
    },
    error: null
  });
});

module.exports = router;
