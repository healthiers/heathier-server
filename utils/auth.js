const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../config/config");

exports.createUserTokens = (userId) => {
  const payload = { userId: userId };
  const secretKey = config.JWT_SECRET_KEY;
  const accessToken = jwt.sign(payload, secretKey, {
    expiresIn: config.TOKEN_EXPIRED_IN,
  });
  return accessToken;
};

exports.generateHashedPassword = async ({ password }) => {
  const salt = await bcrypt.genSalt();
  return await bcrypt.hash(password, salt);
};
