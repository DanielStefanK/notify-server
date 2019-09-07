var express = require("express");
var router = express.Router();
const Joi = require("@hapi/joi");

router.post("/login", function(req, res) {
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

  //TODO load user and check pass word and create token

  res.send("ok");
});

module.exports = router;
