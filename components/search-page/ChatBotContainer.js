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
  isBotTyping,
  setIsBotTyping,
  selectedFeatures,
  setSelectedFeatures,
  showRecommendationButton,
  setShowRecommendationButton,
  optionsVisible, setOptionsVisible
}) {
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
      {/* The SideNav */}
      <div className="flex flex-row">
      <BenNavbar
        toggleHistoryVisibility={toggleHistoryVisibility}
        isHistoryVisible={isHistoryVisible}
      />

      {/* History with Smooth Transition */}
      <div
        className={`transition-all duration-300 ${
          isHistoryVisible ? "w-[250px]" : "w-0"
        } bg-[#131314] overflow-hidden`}
      >
        {isHistoryVisible && <SearchNavOpen  handleNewConversation={handleNewConversation} />}
      </div>
      </div>

      {/* Chat Container, Main Content */}
      <div className="flex-grow relative flex h-full w-full flex-col items-center">
        {/* Message area that scrolls independently */}
        <div className="flex-grow overflow-y-auto flex justify-center w-full scrollbar-hide mx-auto">
          <ChatBotMessage
            messages={messages}
            error={error}
            isLoading={isLoading}
            setBotTyping={setIsBotTyping}
            userInput={userInput}
            setUserInput={setUserInput}
            handleSendMessage={handleSendMessage}
            handleNewConversation={handleNewConversation}
            isBotTyping={isBotTyping}
            setShowChat={setShowChat}
            selectedFeatures={selectedFeatures}
            setSelectedFeatures={setSelectedFeatures}
            showRecommendationButton={showRecommendationButton}
            setShowRecommendationButton={setShowRecommendationButton}
            optionsVisible={optionsVisible}
            setOptionsVisible={setOptionsVisible}
          />
        </div>
      </div>
    </div>
  );
}

export default ChatBotContainer;
