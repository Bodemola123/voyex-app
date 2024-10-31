import React, { ChangeEvent, KeyboardEvent, MouseEvent } from "react";
import { CiSearch } from "react-icons/ci";
import { TfiReload } from "react-icons/tfi";
import { VscSend } from "react-icons/vsc";

function ChatInput({
  userInput,
  setUserInput,
  handleSendMessage,
  handleNewConversation,
  isLoading,
  isBotTyping,
}) {
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleButtonPress = (e) => {
    e.preventDefault();
    handleSendMessage();
  };

  return (
    <div className="flex items-center justify-start gap-4 w-full ml-5">
      <form
        action=""
        className="flex items-center justify-between gap-2 max-w-[700px] w-full px-3 border border-[#d0d5dd] bg-fade/10 rounded-lg"
      >
        <div className="flex items-center gap-2 w-full">
          <CiSearch
            className={`text-3xl ${
              isLoading ? "cursor-not-allowed text-gray-400" : ""
            }`}
          />
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            disabled={isLoading}
            onKeyDown={!isBotTyping ? handleKeyPress : undefined}
            className={`outline-none bg-transparent py-2 w-full placeholder:text-sm placeholder:font-normal ${
              isLoading
                ? "placeholder:text-gray-400 cursor-not-allowed"
                : "placeholder:text-fontlight"
            }`}
            placeholder="Message Voyex"
          />
        </div>
        <button
          className={`pl-3 py-3 ${
            isLoading || isBotTyping ? "cursor-not-allowed text-gray-400" : ""
          }`}
          onClick={handleButtonPress}
          disabled={isLoading || isBotTyping}
        >
          <VscSend className="-rotate-45" />
        </button>
      </form>
      <button
        className="text-base text-center text-fontlight font-medium rounded-xl bg-btnlime px-4 py-3"
        onClick={handleNewConversation}
      >
        <TfiReload />
      </button>
    </div>
  );
}

export default ChatInput;
