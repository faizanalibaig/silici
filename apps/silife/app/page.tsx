"use client";

export default function Page() {
  return (
    <div className="w-screen h-screen flex justify-center items-center font-primary">
      <div className="w-[800px] h-40 flex flex-col bg-[#EFECE3] rounded-lg">
        <form className="w-full h-full p-5">
          <textarea
            placeholder="Enter your prompt"
            className="text-black w-full h-3/5 outline-none resize-none"
          />
          <div className="w-full h-[40%] flex justify-end items-center px-2">
            <button
              type="submit"
              className="bg-[#4A70A9] px-5 py-2 text-sm rounded-md cursor-pointer"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
