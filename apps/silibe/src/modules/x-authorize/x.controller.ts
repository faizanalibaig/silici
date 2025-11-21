import { Request, Response } from "express";
const axios = require("axios");
const qs = require("qs");

const { config } = require("../../config");
const XModel = require("./x.model");

exports.connectX = async (req: Request, res: Response) => {
  const url = `https://twitter.com/i/oauth2/authorize?${qs.stringify({
    response_type: "code",
    client_id: config.x.X_CLIENT_ID,
    redirect_uri: config.x.X_REDIRECT_URI,
    scope: "tweet.read tweet.write users.read offline.access",
    state: "random_state_123",
    code_challenge: "challenge",
    code_challenge_method: "plain",
  })}`;

  res.redirect(url);
};

exports.callbackX = async (req: Request, res: Response) => {
  const { code } = req.query;

  try {
    const data = qs.stringify({
      grant_type: "authorization_code",
      code: code,
      client_id: config.x.X_CLIENT_ID,
      redirect_uri: config.x.X_REDIRECT_URI,
      code_verifier: "challenge",
    });

    const response = await axios.post(
      "https://api.twitter.com/2/oauth2/token",
      data,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization:
            "Basic " +
            Buffer.from(
              config.x.X_CLIENT_ID + ":" + config.x.X_CLIENT_SECRET,
            ).toString("base64"),
        },
      },
    );

    const x = new XModel({
      accessToken: response.data.access_token,
      refreshToken: response.data.refresh_token,
      expiresIn: response.data.expires_in,
    });
    await x.save();

    res.send("X account connected successfully.");
  } catch (err: any) {
    console.log(err.response?.data || err);
    res.send("Error while connecting your X account.");
  }
};

exports.postTweet = async (req: Request, res: Response) => {
  const accessToken =
    "MERRRjZQUkw4ZDF0U041R01DMldSaTJxQWV3aUNISFpHUDlYRWtfQlU0Q0RGOjE3NjM3MjEyODcyNDA6MToxOmF0OjE";

  const response = await axios.post(
    "https://api.twitter.com/2/tweets",
    { text: "first test tweet" },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    },
  );

  res.json({
    success: true,
    message: "Tweet posted successfully with Bearer token!",
    data: response.data,
  });
};

export {};
