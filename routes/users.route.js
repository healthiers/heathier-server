var express = require("express");
var router = express.Router();
const { createUser } = require("../controller/users.controller");
const { createUserValidator } = require("../libs/Validators/users.validator");

/* POST create new user */
router.post("/signup", createUserValidator, createUser);

module.exports = router;
