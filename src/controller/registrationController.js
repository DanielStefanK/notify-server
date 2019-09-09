var express = require("express");
4;
const { getClient } = require("../db");
var router = express.Router();

router.post("/", async function(req, res) {
  const client = await getClient();
  const {
    endpoint,
    keys: { p256dh, auth }
  } = req.body;

  client
    .query(
      "INSERT INTO notify_objects (endpoint, auth, public_key) VALUES($1, $2, $3)",
      [endpoint, auth, p256dh]
    )
    .then(() => {
      console.log(`created new notification object`);
      res.json({
        success: true,
        data: null,
        error: null
      });
    })
    .catch(err => {
      console.log("could not create notification object", err);
      res.json({
        success: false,
        data: null,
        error: "Could not create notification object"
      });
    });
});

module.exports = router;
