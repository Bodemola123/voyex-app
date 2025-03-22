"use client"
import ChatInput from "@/components/search-page/ChatInput";
import ChatTop from "@/components/search-page/ChatTop";
import ChatBotMessage from "@/components/search-page/ChatBotMessage";
import { useEffect, useState } from "react";
import "../../app/globals.css";
import BenFooter from "../common/BenFooter";
import BenNavbar from "../common/BenNavbar";
import SearchNavOpen from "./SearchNavOpen";
import '../../app/globals.css'

function ChatBotContainer({
  messages,
  error,
  userInput,
  setUserInput,
  handleSendMessage,
  handleNewConversation,
  isLoading,
  setShowChat,
}) {
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [isHistoryVisible, setIsHistoryVisible] = useState(false);

  useEffect(() => {
    const savedState = localStorage.getItem("isHistoryVisible");
    if (savedState !== null) {
      setIsHistoryVisible(JSON.parse(savedState));
    }
  }, []);

  const toggleHistoryVisibility = () => {
    setIsHistoryVisible((prev) => {
      const newState = !prev;
      localStorage.setItem("isHistoryVisible", JSON.stringify(newState));
      return newState;
    });
  };

  return (
    <div className="flex items-center w-full h-screen">
      <BenNavbar
        toggleHistoryVisibility={toggleHistoryVisibility}
        isHistoryVisible={isHistoryVisible}
      />

      {/* History with Smooth Transition */}
      <div
        className={`transition-all duration-300 ${
          isHistoryVisible ? "w-[360px]" : "w-0"
        } bg-[#131314] overflow-hidden`}
      >
        {isHistoryVisible && <SearchNavOpen />}
      </div>

      {/* Chat Container */}
      <div className="flex-grow relative flex h-full w-full flex-col px-10 py-10">
        {/* Top section for chat header */}
        <ChatTop
          messages={messages}
          setShowChat={setShowChat}
          handleNewConversation={handleNewConversation}
        />

        {/* Message area that scrolls independently */}
        <div className="flex-grow overflow-y-auto scrollbar-hide">
          <ChatBotMessage
            messages={messages}
            error={error}
            isLoading={isLoading}
            setBotTyping={setIsBotTyping}
          />
        </div>

        {/* Sticky Input and Footer */}
        <div className="sticky bottom-0 w-full gap-4">
          <ChatInput
            userInput={userInput}
            setUserInput={setUserInput}
            handleSendMessage={handleSendMessage}
            handleNewConversation={handleNewConversation}
            isLoading={isLoading}
            isBotTyping={isBotTyping}
          />
          <div className="mt-4">
          <BenFooter />
          </div>

        </div>
      </div>
    </div>
  );
}

export default ChatBotContainer;
