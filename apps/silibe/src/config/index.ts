const { config } = require("./app.config");
const { databaseConfig } = require("./database.config");
const { logger } = require("./winston.config");
const { ai } = require("./ai.config");

module.exports = {
  config,
  databaseConfig,
  logger,
  ai,
};
