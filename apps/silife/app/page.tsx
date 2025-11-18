"use client";

import { useState } from "react";

const BaseUrl = process.env.BaseUrl || "http://localhost:8080";

export default function Page() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  const SubmitChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const eventSource = new EventSource(
      `${BaseUrl}/v0/ai?prompt=${encodeURIComponent(input)}`,
    );

    eventSource.onmessage = (event) => {
      try {
        if (event.data.done) {
          eventSource.close();
        } else {
          setResponse((prev) => prev + event.data);
        }
      } catch (error) {
        console.error("Invalid SSE message:", event.data);
      }
    };
  };

  /* Split tweets by asterisk */
  const tweets = response.split("*").filter((t) => t.trim().length > 0);

  return (
    <div className="w-screen h-auto flex flex-col items-center pt-10 bg-[#F5F5F5] font-primary">
      <div className="h-[750px]">
        {/* Input Box */}
        <div className="w-[800px] h-40 flex flex-col bg-white rounded-xl shadow-lg border border-gray-200">
          <form onSubmit={SubmitChat} className="w-full h-full p-5">
            <textarea
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter a topic to generate tweets..."
              className="text-black w-full h-3/5 outline-none resize-none bg-transparent"
            />

            <div className="w-full h-[40%] flex justify-end items-center px-2">
              <button
                type="submit"
                className="bg-[#1D9BF0] text-white px-5 py-2 text-sm rounded-md cursor-pointer shadow-md hover:bg-[#0d8add] transition"
              >
                Generate Tweets
              </button>
            </div>
          </form>
        </div>

        {/* Tweets Container */}
        <div className="w-[800px] mt-10 space-y-4">
          {tweets.map((tweet, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition flex justify-between items-start"
            >
              <p className="text-black whitespace-pre-wrap w-[88%]">{tweet}</p>

              <button className="ml-3 text-sm bg-gray-200 px-3 py-1 cursor-pointer rounded-md hover:bg-gray-300 transition">
                Copy
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
