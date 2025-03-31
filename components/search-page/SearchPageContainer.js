"use client";

import React from "react";

import { useState, useEffect, KeyboardEvent, ChangeEvent } from "react";

import SearchMain from "../search-page/SearchMain";
import ChatBotContainer from "@/components/search-page/ChatBotContainer";

function SearchPageContainer() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [chat, setChat] = useState(null);
  const [error, setError] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isBotTyping, setIsBotTyping] = useState(false);

  const handleSendMessage = async () => {
    try {
      if (!userInput.trim()) return;
  
      setIsLoading(true);
  
      // User message object
      const userMessage = {
        text: userInput,
        role: "user",
        timestamp: new Date(),
      };
  
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setUserInput("");
  
      // Check for a keyword-based hardcoded response
      const hardcodedReply = getHardcodedReply(userInput);
      if (hardcodedReply) {
        setIsBotTyping(true); // ✅ Bot starts "typing"
        setTimeout(() => {
          setMessages((prevMessages) => [
            ...prevMessages,
            { text: hardcodedReply, role: "bot", timestamp: new Date() },
          ]);
          setIsBotTyping(false); // ✅ Bot stops "typing"
          setIsLoading(false);
        }, 5000);
        return;
      }
  
      // Simulated bot response (without ChatReply component)
      setIsBotTyping(true); // ✅ Bot starts "typing"
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            text: `Do Androids Dream of Electric Sheep? is a 1968 dystopian science fiction novel by American writer Philip K. Dick. 
            Set in a post-apocalyptic San Francisco, the story unfolds after a devastating global war.\n
            1. Androids and Humans: The novel explores the uneasy coexistence of humans and androids. 
            Androids, manufactured on Mars, rebel, kill their owners, and escape to Earth, where they hope to remain undetected.\n
            2. Empathy and Identity: To distinguish androids from humans, the Voigt-Kampff Test measures emotional responses. 
            Androids lack empathy, making them vulnerable to detection.\n
            3. Status Symbols: Owning real animals is a status symbol due to mass extinctions. 
            Poor people resort to realistic electric robotic imitations of live animals, concealing their true nature from neighbors.`,
            role: "bot",
            timestamp: new Date(),
          },
        ]);
        setIsBotTyping(false); // ✅ Bot stops "typing"
        setIsLoading(false);
      }, 5000);
      
    } catch (error) {
      console.error("Error sending message:", error);
      setIsBotTyping(false); // ✅ Ensure bot stops "typing" even on error
    } finally {
      setIsLoading(false);
    }
  };
  

  
  // Function to get a hardcoded reply based on keyword matching
  const getHardcodedReply = (message) => {
    const lowerCaseMessage = message.toLowerCase();
  
    const responses = {
      hello: [
        "Hello! I'm your co-voyager, you can call me Voyex. How can I assist you?",
        "Hi there! Need help with something?",
        "Hey! It's great to meet you. What can I do for you today?",
      ],
      help: [
        "I'm here to help! What do you need assistance with?",
        "Sure! Let me know how I can assist you.",
        "Of course! What do you need help with?",
      ],
      price: [
        "Our pricing varies based on features. Would you like more details on pricing plans?",
        "Looking for pricing info? I can guide you on that!",
        "We offer different pricing plans. Which features are you interested in?",
      ],
      support: [
        "You can reach out to our support team at support@voyex.com.",
        "Need assistance? Our support team is always ready to help!",
        "If you need support, feel free to contact us anytime!",
      ],
      step: [
        "Based on your inputs, we have created this custom pipeline that will help you generate content around your product and also use it for marketing.",
      ],
      steps: [
        "Based on your inputs, we have created this custom pipeline that will help you generate content around your product and also use it for marketing.",
      ],
    };
  
    // Check if a keyword exists in the message
    for (const keyword in responses) {
      if (lowerCaseMessage.includes(keyword)) {
        const replies = responses[keyword];
        return replies[Math.floor(Math.random() * replies.length)]; // Pick a random response
      }
    }
  
    return null; // No keyword match
  };
  

  
  
  

  const handleNewConversation = () => {
    setMessages([]);
    // setChat(null);
  };
  return !showChat ? (
    <SearchMain
      messages={messages}
      error={error}
      userInput={userInput}
      setUserInput={setUserInput}
      setShowChat={setShowChat}
      handleSendMessage={handleSendMessage}
    />
  ) : (
    <ChatBotContainer
      messages={messages}
      error={error}
      userInput={userInput}
      setUserInput={setUserInput}
      handleSendMessage={handleSendMessage}
      handleNewConversation={handleNewConversation}
      setShowChat={setShowChat}
      isLoading={isLoading}
      isBotTyping={isBotTyping}
      setIsBotTyping={setIsBotTyping}  
    />
  );
}

export default SearchPageContainer;
