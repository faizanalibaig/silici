require("dotenv").config();

interface IConfig {
  port: string | number;
  database: {
    uri: string;
  };
  gemini: {
    key: string;
  };
  auth0: {
    secret: string;
    baseURL: string;
    clientID: string;
    issuerBaseURL: string;
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
  auth0: {
    secret: process.env.AUTH0_SECRET || "",
    baseURL: process.env.AUTH0_BASE_URL || "",
    clientID: process.env.AUTH0_CLIENT_ID || "",
    issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL || "",
  },
};
