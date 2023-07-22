const bcrypt = require("bcrypt");
const {
  createUserTokens,
  generateHashedPassword,
} = require("../../utils/auth");
const UsersModel = require("../../model/users.model");
const { CustomError } = require("../../utils/customError");

exports.saveUserNftdetails = async ({
  medicalHistory,
  medication,
  symptoms,
  dietPreference,
  allergies,
  goals,
  isPublic,
  isNftVisible,
  userId,
}) => {
  const existinUser = await UsersModel.findById(userId);
  if (!existinUser) {
    throw new CustomError({
      statusCode: 400,
      message: "user does not exist",
    });
  }
  existinUser.userNftDetails = {
    medicalHistory,
    medication,
    symptoms,
    dietPreference,
    allergies,
    goals,
    isPublic,
    isNftVisible,
  };
  existinUser.save();
  return { existinUser };
};

exports.createUser = async ({
  fullName,
  email,
  password,
  gender,
  age,
  medicalHistory,
  walletAddress = "",
}) => {
  const existinUser = await UsersModel.findOne({ email: email.toLowerCase() });
  if (existinUser) {
    throw new CustomError({
      statusCode: 400,
      message: "user with this email already exists",
    });
  }

  const hashedPassword = await generateHashedPassword({ password });

  const registerUser = await UsersModel.create({
    fullName,
    email,
    password: hashedPassword,
    gender,
    age,
    medicalHistory,
    walletAddress,
  });

  const user = await UsersModel.findById(registerUser._id).select([
    "-password",
    "-accesToken",
  ]);

  const accessToken = createUserTokens(user._id);
  user.accessToken = accessToken;
  user.save();
  return { user, accessToken };
};

exports.loginUser = async ({ email, password }) => {
  const existinUser = await UsersModel.findOne({ email: email.toLowerCase() });
  if (!existinUser) {
    throw new CustomError({
      statusCode: 401,
      message: "Invalid email or password",
    });
  }

  const isMatch = await bcrypt.compare(password, existinUser.password);

  if (!isMatch) {
    throw new CustomError({
      statusCode: 401,
      message: "Invalid email or password",
    });
  }

  const user = await UsersModel.findById(existinUser._id).select([
    "-password",
    "-accessToken",
  ]);

  const accessToken = createUserTokens(user._id);
  user.accessToken = accessToken;
  user.save();
  return { user, accessToken };
};
