const mongoose = require("mongoose");
const config = require("./config");

// Connect to MongoDB
const mongoUrl = config.MONGODB_URI;

const databaseConnection = async () => {
  mongoose
    .connect(mongoUrl)
    .then(() => {
      console.log("MongoDB server connection successfully established");
    })
    .catch((err) => {
      console.log(
        `MongoDB connection error. Please make sure MongoDB is running. ${err}`
      );
    });
};

module.exports = databaseConnection;
