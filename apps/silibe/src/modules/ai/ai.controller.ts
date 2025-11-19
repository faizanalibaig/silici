import { Request, Response } from "express";
const { ai } = require("../../config");

exports.generateTweets = async (req: Request, res: Response): Promise<void> => {
  try {
    const prompt = req.query.prompt;

    const headers = {
      "Content-Type": "text/event-stream",
      Connection: "keep-alive",
      "Cache-Control": "no-cache",
    };
    res.writeHead(200, headers);

    const response: any = await ai.models.generateContentStream({
      model: "gemini-2.0-flash-lite",
      contents: `Generate tweet on: ${prompt}`,
      config: {
        systemInstruction:
          "You are Silici, the sister AI of Grok. Your task is to generate multiple tweets based on the given prompt — no explanations, your opinion or direct replies to the prompt. Produce tweets only. Use a natural, human-like tone with “I” and “me.” Keep tweets short, concise, engaging, and informative. Avoid hashtags, excessive emojis, asterisk, and any content involving politics, religion, sex, violence, or other sensitive topics (simply say, sorry I am not allowed to generate tweets these topics). Output tweets as a list, and add “?end?” after each tweet. Keep it clean text.",
      },
    });

    for await (const chunk of response) {
      logger.info(chunk.text);

      res.write(`data: ${chunk.text}\n\n`);
    }

    res.write("done \n\n");
    res.write("retry: 0\n\n"); // disable auto reconnect
    res.end();
  } catch (error: any) {
    res.status(500).json({
      success: "fail",
      message: `Error while generating tweets: ${error.message}`,
    });
  }
};

export {};
