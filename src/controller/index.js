var express = require("express");
var router = express.Router();
var auth = require("../middleware/auth");

router.use("/add", require("./registrationController"));
router.use("/admin", auth, require("./manageController"));
router.use("/auth", require("./authController"));

module.exports = router;
