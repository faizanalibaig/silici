"use client";

import Error from "next/error";
import { useState } from "react";

import { FaArrowUp } from "react-icons/fa";
import { FaCopy } from "react-icons/fa";

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
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error("Invalid SSE message:", event.data);
        } else {
          console.error("Unexpected error:", error);
        }
      }
    };
  };

  /* Split tweets by ?end? */
  const tweets = response.split("?end?").filter((t) => t.trim().length > 0);

  return (
    <div className="w-screen h-auto flex flex-col items-center pt-10 bg-[#F5F5F5] font-primary">
      <div className="w-full h-[750px] flex flex-col items-center">
        {/* Input Box */}
        <div className="w-[650px] h-16 flex bg-[#AAC4F5] rounded-xl shadow-lg border border-gray-200">
          <form
            onSubmit={SubmitChat}
            className="w-full h-full flex justify-between items-center p-3"
          >
            <input
              type="text"
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter a topic to generate tweets..."
              className="text-[#05339C] w-full h-full px-2 outline-none bg-transparent"
            />

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-[#05339C] text-white px-4 py-3 text-sm rounded-md cursor-pointer shadow-md transition"
            >
              <FaArrowUp size={12} />
            </button>
          </form>
        </div>

        {/* Tweets Container */}
        <div className="w-[650px] mt-12 space-y-4">
          {["hello this is test tweet", "hello this is test tweet"].map(
            (tweet, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm hover:shadow-md transition flex justify-between items-start"
              >
                <p className="text-black whitespace-pre-wrap w-[88%] px-2 flex items-center">
                  {tweet}
                </p>

                <button className="bg-[#05339C] ml-3 text-sm text-white px-3 py-2 cursor-pointer rounded-md transition">
                  <FaCopy />
                </button>
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  );
}
