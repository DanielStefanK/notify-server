var express = require("express");
var router = express.Router();
const { getClient } = require("../db");

router.get("/list", async function(req, res) {
  const client = await getClient();
  const { rows } = await client.query("SELECT * FROM notify_objects");

  res.json({
    success: true,
    data: {
      notifyObjects: rows
    }
  });
});

router.get("/object/:id", function() {
  res.send("ok");
});

router.post("/send", function() {
  res.send("ok");
});

router.post("/send-all", function() {
  res.send("ok");
});

module.exports = router;
