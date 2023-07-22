var express = require("express");
var router = express.Router();
const {
  createUser,
  loginUser,
  saveUserNftDetails,
} = require("../controller/users.controller");
const {
  createUserValidator,
  loginUserValidator,
  saveUserNftDetailsValidator,
} = require("../libs/Validators/users.validator");
const { validateToken } = require("../utils/auth");

/* POST create new user */
router.post("/signup", createUserValidator, createUser);
router.post("/login", loginUserValidator, loginUser);
router.post(
  "/save-nft-details",
  validateToken,
  saveUserNftDetailsValidator,
  saveUserNftDetails
);

module.exports = router;
