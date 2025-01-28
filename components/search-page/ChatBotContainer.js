import ChatInput from "@/components/search-page/ChatInput";
import ChatTop from "@/components/search-page/ChatTop";
import ChatBotMessage from "@/components/search-page/ChatBotMessage";
import { useState } from "react";
import "../../app/globals.css";

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

  return (
    <div className="relative flex flex-col justify-between w-full h-screen">
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
    </div>
  );
}

export default ChatBotContainer;
