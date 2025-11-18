import { Request, Response } from "express";
const { ai } = require("../../config");

exports.generateTweets = async (req: Request, res: Response) => {
  try {
    const headers = {
      "Content-Type": "text/event-stream",
      Connection: "keep-alive",
      "Cache-Control": "no-cache",
    };
    res.writeHead(200, headers);

    const response = await ai.models.generateContentStream({
      model: "gemini-2.5-flash",
      contents: "Explain how AI works",
    });

    res.write(`data: Connected to server\n\n`);
    for await (const chunk of response) {
      console.log(chunk.text);

      res.write(`data: ${chunk.text}\n\n`);
    }

    res.end();
  } catch (error: any) {
    res.status(500).json({
      success: "fail",
      message: `Error while generating tweets: ${error.message}`,
    });
  }
};

export {};
