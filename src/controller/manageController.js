var express = require("express");
var router = express.Router();

router.get("/list", function(req, res) {
  res.send("ok");
});

router.get("/object/:id", function() {
  res.send("ok");
});

module.exports = router;
