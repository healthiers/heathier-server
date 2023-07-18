const { check } = require("express-validator");

exports.createUserValidator = [
  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email is must be a valid email")
    .isLength({ min: 6 })
    .withMessage("Email characters must must not be less than 6"),
  check("fullName")
    .notEmpty()
    .withMessage("fullName is required")
    .isString()
    .withMessage("fullName must be a string")
    .isLength({ min: 3 })
    .withMessage("fullName characters must must not be less than 3"),
  check("age")
    .notEmpty()
    .withMessage("age is required")
    .isNumeric()
    .withMessage("age must be a number")
    .isLength({ min: 0, max: 3 })
    .withMessage("age digits must be between 0 and 3"),
  check("gender")
    .notEmpty()
    .withMessage("gender is required ")
    .isIn(["male", "female", "others"])
    .withMessage("gender must be either male,female or others"),
  check("medicalHistory")
    .notEmpty()
    .withMessage("medicalHistory is required")
    .isString()
    .withMessage("medicalHistory must be a string")
    .isLength({ min: 3 })
    .withMessage("medicalHistory characters must must not be less than 3"),
  check("walletAddress")
    .optional()
    .notEmpty()
    .withMessage("walletAddress is required")
    .isString()
    .withMessage("walletAddress must be a string")
    .isLength({ min: 10 })
    .withMessage("walletAddress characters must must not be less than 10"),
  check("password")
    .notEmpty()
    .withMessage("password is required")
    .isString()
    .withMessage("password must be a string")
    .isLength({ min: 8 })
    .withMessage("password must be at least 8 characters long")
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/)
    .withMessage(
      "password must contain at least one number, one lowercase letter, and one uppercase letter"
    ),
];
