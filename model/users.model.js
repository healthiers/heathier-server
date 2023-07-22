const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userNftDetailsSchema = {
  MedicalHistory: {
    type: String,
    required: false,
    default: "",
  },
  medication: {
    type: String,
    required: false,
    default: "",
  },
  symptoms: {
    type: String,
    required: false,
    default: "",
  },
  dietPreference: {
    type: String,
    required: false,
    default: "",
  },
  allergies: {
    type: String,
    required: false,
    default: "",
  },
  goals: {
    type: String,
    required: false,
    default: "",
  },
  isPublic: {
    type: String,
    required: false,
    default: "",
  },
  isNftVisible: {
    type: String,
    required: false,
    default: "",
  },
};

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
      lowercase: true,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    medicalHistory: {
      type: String,
      required: true,
    },
    walletAddress: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: true,
    },
    accessToken: {
      type: String,
      required: false,
    },
    userNftDetails: userNftDetailsSchema,
  },

  {
    timestamps: true,
  }
);

const UsersModel = mongoose.model("users", userSchema);
module.exports = UsersModel;
