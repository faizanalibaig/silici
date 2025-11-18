require("dotenv").config();

interface IConfig {
  port: string | number;
  database: {
    uri: string;
  };
  gemini: {
    key: string;
  };
}

export const config: IConfig = {
  port: process.env.PORT || 5000,
  database: {
    uri: process.env.MONGODB_URI || "mongodb://localhost:27017/silibe",
  },
  gemini: {
    key: process.env.GEMINI_API_KEY || "",
  },
};
