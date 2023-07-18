const {
  createUserTokens,
  generateHashedPassword,
} = require("../../utils/auth");
const UsersModel = require("../../model/users.model");

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
    throw new Error("user with this email already exists");
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
  ]);

  const accessToken = createUserTokens(user._id);
  user.accessToken = accessToken;
  user.save();
  return { user, accessToken };
};
