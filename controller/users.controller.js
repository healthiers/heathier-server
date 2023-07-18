const { validationResult } = require("express-validator");
const { generateValidationErrorMessage } = require("../utils/index");
const { createUser } = require("../libs/users/users.lib");

exports.createUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const message = generateValidationErrorMessage({
        validationErrorArr: errors.array(),
      });
      res.status(400).json({ error: { ErrorMessage: message } });
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

    const newWallet = walletAddress ? walletAddress : "";

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
    res.status(400).json({ error: { ErrorMessage: e.message } });
  }
};
