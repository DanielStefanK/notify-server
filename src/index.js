require("dotenv");
const express = require("express");
const app = express();
var bodyParser = require("body-parser");
const router = require("./controller");
var cors = require("cors");
const { createPool } = require("./db");
require("./utils/webPushSetup");

createPool();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(router);

app.listen(3000, () => console.log("Notification server stated on port 3000"));
