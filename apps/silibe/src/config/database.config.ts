const mongoose = require("mongoose");

const { logger } = require("./winston.config");
const { config } = require("./app.config");

async function databaseConfig() {
  try {
    const connectionString: string = config.database.uri;
    await mongoose.connect(connectionString);

    logger.info("Database connected");
  } catch (error) {
    logger.error(`Error while connecting to database: `, error);
  }
}

export { databaseConfig };
