const express = require("express");
const app = express();
var bodyParser = require("body-parser");
const router = require("./controller");
var cors = require("cors");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(router);

app.listen(8080, () => console.log("Notification server stated on port 8080"));
