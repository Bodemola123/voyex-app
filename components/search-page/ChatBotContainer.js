import ChatInput from "@/components/search-page/ChatInput";
import ChatTop from "@/components/search-page/ChatTop";
import ChatBotMessage from "@/components/search-page/ChatBotMessage";
import ChatAside from "@/components/search-page/ChatAside";
import { useState } from "react";

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
    <div className="relative flex flex-col justify-between w-full h-full mb-24">
      <ChatTop messages={messages} setShowChat={setShowChat} />

      <div className="flex items-start justify-between gap-8 w-full px-5 mt-5 pt-8">
        <ChatBotMessage
          messages={messages}
          error={error}
          isLoading={isLoading}
          setBotTyping={setIsBotTyping}
        />
        <ChatAside />
      </div>

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
