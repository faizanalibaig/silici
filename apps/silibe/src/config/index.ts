const { config } = require("./app.config");
const { databaseConfig } = require("./database.config");
const { logger } = require("./winston.config");

module.exports = {
  config,
  databaseConfig,
  logger,
};
