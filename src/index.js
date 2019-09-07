const express = require("express");
const app = express();

app.use("/", (req, res) => {
  res.send("test route");
});

app.listen(8080, () => console.log("Notification server stated on port 8080"));
