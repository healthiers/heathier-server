const dotenv = require("dotenv");

dotenv.config();

const development = {
  PORT: parseInt(process.env.DEV_PORT, 10) || 3009,
  MONGODB_URI: process.env.DEV_MONGODB_URI || "mongodb://localhost/myapp_dev",
  API_KEY: process.env.DEV_API_KEY || "application",
  JWT_SECRET_KEY: process.env.DEV_JWT_SECRET_KEY || "test_secret",
  TOKEN_EXPIRED_IN: "24h",
  // Add more development environment variables here
};

const test = {
  PORT: parseInt(process.env.TEST_PORT, 10) || 4000,
  MONGODB_URI: process.env.TEST_MONGODB_URI || "mongodb://localhost/myapp_test",
  API_KEY: process.env.TEST_API_KEY || "your_test_api_key",
  JWT_SECRET_KEY: process.env.TEST_JWT_SECRET_KEY || "test_secret",
  TOKEN_EXPIRED_IN: "24h",
  // Add more test environment variables here
};

const production = {
  PORT: parseInt(process.env.PORT, 10) || 5000,
  MONGODB_URI: process.env.MONGODB_URI || "mongodb://localhost/myapp",
  API_KEY: process.env.API_KEY || "your_production_api_key",
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || "test_secret",
  TOKEN_EXPIRED_IN: "24h",
  // Add more production environment variables here
};

let config;

switch (process.env.NODE_ENV) {
  case "development":
    config = development;
    break;
  case "test":
    config = test;
    break;
  case "production":
    config = production;
    break;
  default:
    config = development;
    break;
}

module.exports = config;
