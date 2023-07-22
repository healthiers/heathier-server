const { validationResult } = require("express-validator");
const { generateValidationErrorMessage } = require("../utils/index");
const {
  createUser,
  loginUser,
  saveUserNftdetails,
} = require("../libs/users/users.lib");
const { CustomError } = require("../utils/customError");

exports.createUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const message = generateValidationErrorMessage({
        validationErrorArr: errors.array(),
      });
      res.status(400).json({ error: { msg: message } });
      return;
    }
    const {
      fullName,
      email,
      password,
      gender,
      age,
      medicalHistory,
      walletAddress,
    } = req.body;

    const newUser = await createUser({
      fullName,
      email,
      password,
      gender,
      age,
      medicalHistory,
      walletAddress,
    });

    res.status(200).json({ data: newUser });
  } catch (e) {
    if (e instanceof CustomError) {
      const { statusCode, message } = e;
      res.status(statusCode).json({ error: { msg: message } });
      return;
    }
    res.status(400).json({ error: { msg: e.message } });
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const message = generateValidationErrorMessage({
        validationErrorArr: errors.array(),
      });
      res.status(400).json({ error: { msg: message } });
      return;
    }
    const { email, password } = req.body;

    const newUser = await loginUser({
      email,
      password,
    });

    res.status(200).json({ data: newUser });
  } catch (e) {
    if (e instanceof CustomError) {
      const { statusCode, message } = e;
      res.status(statusCode).json({ error: { msg: message } });
      return;
    }
    res.status(400).json({ error: { msg: e.message } });
  }
};

exports.saveUserNftDetails = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const message = generateValidationErrorMessage({
        validationErrorArr: errors.array(),
      });
      res.status(400).json({ error: { msg: message } });
      return;
    }

    const userId = req.userId;
    const {
      medicalHistory,
      medication,
      symptoms,
      dietPreference,
      allergies,
      goals,
      isPublic,
      isNftVisible,
    } = req.body;

    const user = await saveUserNftdetails({
      medicalHistory,
      medication,
      symptoms,
      dietPreference,
      allergies,
      goals,
      isPublic,
      isNftVisible,
      userId,
    });

    res.status(200).json({ data: user });
  } catch (e) {
    if (e instanceof CustomError) {
      const { statusCode, message } = e;
      res.status(statusCode).json({ error: { msg: message } });
      return;
    }
    res.status(400).json({ error: { msg: e.message } });
  }
};
