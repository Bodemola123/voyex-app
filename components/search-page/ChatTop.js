import React from "react";
import { BsClockHistory } from "react-icons/bs";
import { HiOutlineDownload } from "react-icons/hi";
import { HiOutlineSpeakerWave } from "react-icons/hi2";
import { useEffect } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";

function ChatTop({ messages, setShowChat }) {
  const handleBackClick = () => {
    setShowChat(false);
  };

  useEffect(() => {
    // Push a new state to history so that the back button can be intercepted
    window.history.pushState(null, "", window.location.href);

    const handlePopState = (event) => {
      setShowChat(false);

      // Optionally to prevent navigating away completely
      window.history.pushState(null, "", window.location.href);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [setShowChat]);

  return (
    <div className="sticky top-[10px] flex items-center justify-between py-1 px-6">
      <div className="flex items-center gap-4">
        <button
          onClick={handleBackClick}
          className={`text-base text-center text-fontlight font-medium rounded-md bg-btnlime px-2 py-1`}
        >
          <IoMdArrowRoundBack />
        </button>
        <h1 className="">
          {messages[0]?.text || "Begin chatting with Voyex AI..."}
        </h1>
      </div>
      <div className="flex items-center gap-3 text-xl">
        <button className="p-2">
          <BsClockHistory />
        </button>
        <button className="p-2">
          <HiOutlineSpeakerWave />
        </button>
        <button className="p-2">
          <HiOutlineDownload />
        </button>
      </div>
    </div>
  );
}

export default ChatTop;
