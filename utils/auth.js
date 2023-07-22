const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../config/config");
const UsersModel = require("../model/users.model");

const secretKey = config.JWT_SECRET_KEY;
const expiresIn = config.TOKEN_EXPIRED_IN;

exports.createUserTokens = (userId) => {
  const payload = { userId: userId };
  const accessToken = jwt.sign(payload, secretKey, {
    expiresIn: expiresIn,
  });
  return accessToken;
};

exports.generateHashedPassword = async ({ password }) => {
  const salt = await bcrypt.genSalt();
  return await bcrypt.hash(password, salt);
};

exports.validateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const accessToken = authHeader.split(" ")[1];

    if (!accessToken) {
      return res.status(401).json({ error: { msg: "User does not exist 1" } });
    }

    jwt.verify(accessToken, secretKey, (error, decoded) => {
      if (error) {
        return res
          .status(401)
          .json({ error: { msg: "User does not exist 2" } });
      } else {
        UsersModel.findById(decoded.userId)
          .then((user) => {
            req.userId = decoded.userId;
            if (accessToken != user.accessToken) {
              return res
                .status(400)
                .json({ error: { msg: "Invalid Credentials " } });
            }
            return next();
          })
          .catch((err) => {
            return res
              .status(401)
              .json({ error: { msg: "User does not exist 3 " } });
          });
      }
    });
  } catch (err) {
    return res.status(401).json({ error: { msg: "User does not exist  4" } });
  }
};
