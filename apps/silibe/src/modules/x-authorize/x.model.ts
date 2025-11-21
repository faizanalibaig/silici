const mongoose = require("mongoose");

const twitterSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  accessToken: String,
  refreshToken: String,
  expiresIn: Number,
});

const Twitter = mongoose.model("twitter", twitterSchema);
module.exports = Twitter;
