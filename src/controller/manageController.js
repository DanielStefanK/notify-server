var express = require("express");
var router = express.Router();
const { getClient } = require("../db");
const webpush = require("web-push");

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

router.post("/send", async function(req, res) {
  const client = await getClient();

  const { rows } = await client.query("SELECT * FROM notify_objects");

  for (var item of rows) {
    const pushSubscription = {
      endpoint: item.endpoint,
      keys: {
        auth: item.auth,
        p256dh: item.public_key
      }
    };

    webpush
      .sendNotification(pushSubscription, "test")
      .then(e => {
        console.log(e);
      })
      .catch(e => {
        console.log(e);
      });
  }
  res.json({
    success: true,
    data: null,
    error: null
  });
});

router.post("/send-all", function() {
  res.send("ok");
});

module.exports = router;
