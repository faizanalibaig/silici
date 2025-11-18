const { GoogleGenAI } = require("@google/genai");
const { config } = require("./app.config");

const ai = new GoogleGenAI({
  apiKey: config.gemini.key,
});

export { ai };
