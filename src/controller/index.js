var express = require("express");
var router = express.Router();

router.use("/add", require("./registrationController"));
router.use("/admin", require("./manageController"));
router.use("/auth", require("./authController"));

module.exports = router;
