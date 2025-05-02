"use client";

import React, { useState, useEffect, KeyboardEvent, ChangeEvent } from "react";
import SearchMain from "../search-page/SearchMain";
import ChatBotContainer from "@/components/search-page/ChatBotContainer";
import { getHardcodedReply } from "@/constants/search-page";

function SearchPageContainer() {
  const [messages, setMessages] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState({});
  const [showRecommendationButton, setShowRecommendationButton] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [error, setError] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [visibleButtons, setVisibleButtons] = useState({});
  const [resetRecommendation, setResetRecommendation] = useState(false);
  const [selectionCount, setSelectionCount] = useState(0);
  const [isRestoredChat, setIsRestoredChat] = useState(false);
  
    const [chats, setChats] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const [activeChatId, setActiveChatId] = useState(null);

    

    useEffect(() => {
      if (chats.length > 0) {
        // Ensure the last message in `chats` includes the most recent bot response
        const lastChat = chats[chats.length - 1];
        if (lastChat && lastChat.messages) {
          setMessages(lastChat.messages);
        }
      }
    }, [chats]); // Trigger re-render when chats change
    
    useEffect(() => {
      if (typeof window !== "undefined") {
        const entityId = localStorage.getItem("entityId");
        const entityType = localStorage.getItem("userType") || localStorage.getItem("orgType");
        setIsLoggedIn(!!entityId && !!entityType);
  
        if (entityId && entityType) {
          setLoading(true);
          fetch(`https://jxj7b9c08d.execute-api.ap-southeast-2.amazonaws.com/default/voyex_chat?entity_id=${entityId}&entity_type=${entityType}`)
            .then(res => res.json())
            .then(data => {
              console.log("📦 Chat API Response:", data);
              setChats(data.chats || []);
              setLoading(false);
            })
            .catch(err => {
              console.error("Failed to fetch chats:", err);
              setError();
              setLoading(false);
            });
        }
      }
    }, []);
    const fetchChats = async () => {
      const entityId = localStorage.getItem("entityId");
      const entityType = localStorage.getItem("userType") || localStorage.getItem("orgType");
    
      if (!entityId || !entityType) return;
    
      try {
        setIsLoggedIn(true)
        const res = await fetch(`https://jxj7b9c08d.execute-api.ap-southeast-2.amazonaws.com/default/voyex_chat?entity_id=${entityId}&entity_type=${entityType}`);
        const data = await res.json();
        console.log("📦 Refetched chats:", data);
        setChats(data.chats || []);
      } catch (err) {
        console.error("Failed to refetch chats:", err);
        setError("Failed to update chat list.");
      } finally {
      return
      }
    };
    
  
  const [chat, setChat] = useState(null); // Store chat_id here
    // Persist chat state across page reloads using sessionStorage
    useEffect(() => {
      const savedChatId = sessionStorage.getItem("chat_id");
      const savedMessages = sessionStorage.getItem("messages");    
  
      if (savedChatId && savedMessages) {
        setChat({ chat_id: savedChatId });
        setMessages(JSON.parse(savedMessages));
        setShowChat(true);
        setIsRestoredChat(true); // ✅ This ensures restored messages skip typing animation
      }
    }, []);

  const handleResetRecommendationButton = () => {
    setShowRecommendationButton(false);
    setResetRecommendation(true);
    setSelectionCount(0);
  };

  const saveChatToAPI = async (userMessage, botResponse) => {
    const entityId = localStorage.getItem("entityId");
    const entityType = localStorage.getItem("userType") || localStorage.getItem("orgType");
  
    const newMessages = [
      { role: "user", text: userMessage, timestamp: new Date() },
      { role: "bot", text: botResponse, timestamp: new Date(), selectedOption: selectedFeatures[messages.length] }  // Add selected option if any
    ];
  
    if (!entityId || !entityType) return;
  
    try {
      if (chat?.chat_id) {
        // PUT request to update chat with new message
        const putBody = {
          chat_id: chat.chat_id,
          chat: [...messages, ...newMessages],  // Append new messages
          metadata: { using: "chatbot" }
        };
  
        const res = await fetch(
          `https://jxj7b9c08d.execute-api.ap-southeast-2.amazonaws.com/default/voyex_chat?chat_id=${chat.chat_id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(putBody)
          }
        );
  
        const data = await res.json();
        console.log("PUT Response:", data);
  
        if (data.chat) {
          setMessages(data.chat); // Ensure state is updated with new messages from the API
          sessionStorage.setItem("messages", JSON.stringify(data.chat)); // Persist chat messages
          await fetchChats(); // Refresh chat list
        }
      } else {
        // POST request to create a new chat
        const postBody = {
          entity_id: parseInt(entityId),
          entity_type: entityType,
          chat: newMessages
        };
  
        const res = await fetch(
          "https://jxj7b9c08d.execute-api.ap-southeast-2.amazonaws.com/default/voyex_chat",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(postBody)
          }
        );
  
        const data = await res.json();
        console.log("POST Response:", data);
  
        if (data.chat_id) {
          setChat({ chat_id: data.chat_id });
          sessionStorage.setItem("chat_id", data.chat_id); // Persist chat_id
          await fetchChats(); // Refresh chat list
        }
      }
    } catch (err) {
      console.error("Error saving chat:", err);
    }
  };
  
  

  const fetchChatById = async (chat_id) => {
    try {
      const res = await fetch(`https://jxj7b9c08d.execute-api.ap-southeast-2.amazonaws.com/default/voyex_chat?chat_id=${chat_id}`);
      const data = await res.json();
  
      if (Array.isArray(data.chat)) {
        // Assuming the chat history includes both user and bot messages
        setMessages(data.chat);  // Directly set the fetched messages
        setActiveChatId(data.chat_id);
        setChat({ chat_id });    // Store the current chat_id
        setShowChat(true);       // Show the chat view
        sessionStorage.setItem("messages", JSON.stringify(data.chat)); // Persist messages
        sessionStorage.setItem("chat_id", chat_id); // Persist chat_id
        
        // Restore selected button options (if any were previously saved in data)
        const restoredButtonSelections = data.chat.reduce((acc, message, index) => {
          if (message.selectedOption) {
            acc[index] = message.selectedOption;  // Restore selection
          }
          return acc;
        }, {});
  
        setSelectedFeatures(restoredButtonSelections); // Update state with restored selections
        setIsRestoredChat(true); // 🔥 set this after restoring
  
      } else {
        console.error("Invalid chat format from API");
      }
    } catch (err) {
      console.error("Error fetching chat:", err);
    }
  };
  

  
  
const handleSendMessage = async (message = null) => {
  try {
    const text = message || userInput.trim();
    if (!text) return;

    setIsRestoredChat(false); // 👈 Ensure it's treated as a new live chat

    setIsLoading(true);

    const userMessage = { text, role: "user", timestamp: new Date() };
    setMessages((prev) => [...prev, userMessage]);
    setUserInput("");

    const hardcodedReply = getHardcodedReply(text);
    const botText = hardcodedReply || `Do Androids Dream of Electric Sheep? is a 1968 dystopian science fiction novel by American writer Philip K. Dick. Set in a post-apocalyptic San Francisco, the story unfolds after a devastating global war.
    1. Androids and Humans: The novel explores the uneasy coexistence of humans and androids. Androids, manufactured on Mars, rebel, kill their owners, and escape to Earth, where they hope to remain undetected.
    2. Empathy and Identity: To distinguish androids from humans, the Voigt-Kampff Test measures emotional responses. Androids lack empathy, making them vulnerable to detection.
    3. Status Symbols: Owning real animals is a status symbol due to mass extinctions. Poor people resort to realistic electric robotic imitations of live animals, concealing their true nature from neighbors.`;

    const lastMessage = messages[messages.length - 1];
    if (lastMessage && lastMessage.role === "bot" && !isBotTyping) {
      setIsBotTyping(false);
    } else {
      setIsBotTyping(true);
    }

    setTimeout(async () => {
      const botMessage = { text: botText, role: "bot", timestamp: new Date() };
      setMessages((prev) => [...prev, botMessage]);
      setIsBotTyping(false);
      setIsLoading(false);

      if (botText.toLowerCase().includes("nice! let's recommend some tools for you")) {
        setTimeout(() => {
          setShowRecommendationButton(true);
        }, 1500);
      }

      await saveChatToAPI(text, botText);

    }, 2000);
  } catch (error) {
    console.error("Error sending message:", error);
    setIsBotTyping(false);
  } finally {
    setIsLoading(false);
  }
};


    const handleNewConversation = async () => {
      console.log("Starting new conversation, clearing chat_id");
    
      // Clear messages and reset states
      setMessages([]); // Clear current messages
      setSelectedFeatures({}); // Reset selected features
      setVisibleButtons({}); // Reset visible buttons
      setChat(null); // Reset chat_id
      setIsRestoredChat(false);
      setActiveChatId(null);
      setShowChat(false)
    
      // Remove persisted chat information from sessionStorage
      sessionStorage.removeItem("chat_id");
      sessionStorage.removeItem("messages");
    };
    
  return !showChat ? (
    <SearchMain
      messages={messages}
      error={error}
      userInput={userInput}
      setUserInput={setUserInput}
      setShowChat={setShowChat}
      handleSendMessage={handleSendMessage}
      fetchChatById={fetchChatById}
      chats={chats} 
      loading={loading} 
      isLoggedIn={isLoggedIn} 
      setChats={setChats} 
      setLoading={setLoading} 
      showChat={showChat}
      activeChatId={activeChatId}
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
      selectedFeatures={selectedFeatures}
      setSelectedFeatures={setSelectedFeatures}
      showRecommendationButton={showRecommendationButton}
      setShowRecommendationButton={setShowRecommendationButton}  
      visibleButtons={visibleButtons}
      setVisibleButtons={setVisibleButtons}
      resetRecommendation={resetRecommendation}
      setResetRecommendation={setResetRecommendation}
      handleResetRecommendationButton={handleResetRecommendationButton}
      selectionCount={selectionCount}
      setSelectionCount={setSelectionCount}
      fetchChatById={fetchChatById}
      chats={chats} 
      loading={loading} 
      isLoggedIn={isLoggedIn} 
      setChats={setChats} 
      setLoading={setLoading} 
      isRestoredChat={isRestoredChat}
      setIsRestoredChat={setIsRestoredChat}
      activeChatId={activeChatId}
    />
  );
}

export default SearchPageContainer;
