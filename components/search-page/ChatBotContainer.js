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
  
    // On component mount, retrieve state from localStorage
    useEffect(() => {
      const savedState = localStorage.getItem("isHistoryVisible");
      if (savedState !== null) {
        setIsHistoryVisible(JSON.parse(savedState)); // Parse boolean value from localStorage
      }
    }, []);
  
    // Update localStorage whenever the state changes
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
    <div className="flex-grow relative flex h-full w-full flex-col gap-10 justify-between items-center scrollbar-hide scroll-container px-10 pt-10 overflow-y-auto ">
      {/* Top section for chat header */}
      <ChatTop
        messages={messages}
        setShowChat={setShowChat}
        handleNewConversation={handleNewConversation}
      />

      {/* Main message area */}
      <ChatBotMessage
        messages={messages}
        error={error}
        isLoading={isLoading}
        setBotTyping={setIsBotTyping}
      />

      {/* Input section */}
      <ChatInput
        userInput={userInput}
        setUserInput={setUserInput}
        handleSendMessage={handleSendMessage}
        handleNewConversation={handleNewConversation}
        isLoading={isLoading}
        isBotTyping={isBotTyping}
      />

      <BenFooter/>
    </div>
    </div>
  );
}

export default ChatBotContainer;
