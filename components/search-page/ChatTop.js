import React from "react";
import { BsClockHistory } from "react-icons/bs";
import { HiOutlineDownload } from "react-icons/hi";
import { HiOutlineSpeakerWave } from "react-icons/hi2";
import { useEffect } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdOutlineRestartAlt } from "react-icons/md";

function ChatTop({ messages, setShowChat,  handleNewConversation }) {
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
    <div className="w-full sticky top-0 flex items-center justify-end border-b border-[#3A3A40] pb-3">
      <button className='flex flex-row items-center justify-center gap-1' onClick={handleNewConversation}>
          <MdOutlineRestartAlt className='text-[16px] text-white/60'/>
          <p className='text-white/60 text-sm'>Clear Chat</p>
        </button>
    </div>
  );
}

export default ChatTop;
