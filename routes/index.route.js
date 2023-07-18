var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.status.json({ data: "welcome to Healthier " });
});

module.exports = router;
