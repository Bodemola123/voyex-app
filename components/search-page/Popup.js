"use client";
import React, { useState, useEffect } from "react";
import { ImEnlarge2 } from "react-icons/im";
import { BiSolidHome, BiMessageRoundedDetail } from "react-icons/bi";
import { IoIosHelpCircleOutline } from "react-icons/io";
import ChatBotHome from "./ChatBotHome";
import ChatBotMessages from "./ChatBotMessages";
import ChatBotHelp from "./ChatBotHelp";

const Popup = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState("home");
  const [messages, setMessages] = useState([]);

  // Load messages from localStorage on mount
  useEffect(() => {
    const savedMessages = localStorage.getItem("chatMessages");
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-[87px] z-50 right-[50px] w-[327px] h-[540px] bg-[#ffffff] shadow-xl rounded-2xl pt-4 flex flex-col justify-between text-[#081227]">
      {/* Header */}
      <div className="px-4 font-medium text-sm flex items-center justify-between">
        <span>
          {activeTab === "home"
            ? "Voyex Help Center"
            : activeTab === "messages"
            ? "Messages"
            : "Help"}
        </span>
        <button onClick={onClose}>
          <ImEnlarge2 className="text-[#000000]" />
        </button>
      </div>

      {/* Tab Content */}
      <div className="flex-grow overflow-y-scroll scrollbar-hide">
        {activeTab === "home" && (
          <ChatBotHome setActiveTab={setActiveTab} setMessages={setMessages} />
        )}
        {activeTab === "messages" && <ChatBotMessages messages={messages} setMessages={setMessages} />}
        {activeTab === "help" && <ChatBotHelp setMessages={setMessages} setActiveTab={setActiveTab} />}
      </div>

      {/* Bottom Navigation */}
      <div className="flex justify-around py-2.5 px-7 bg-[#ffffff] rounded-2xl shadow-2xl">
        <button
        id="support_home"
          onClick={() => setActiveTab("home")}
          className={`gap-2 flex flex-col items-center ${
            activeTab === "home" ? "text-black" : "text-[#6D6D6D]"
          }`}
        >
          <BiSolidHome size={24} />
          <span className="text-sm">Home</span>
        </button>
        <button
        id="support_messages"
          onClick={() => setActiveTab("messages")}
          className={`gap-2 flex flex-col items-center ${
            activeTab === "messages" ? "text-black" : "text-[#6D6D6D]"
          }`}
        >
          <BiMessageRoundedDetail size={24} />
          <span className="text-sm">Message</span>
        </button>
        <button
        id="support_help"
          onClick={() => setActiveTab("help")}
          className={`gap-2 flex flex-col items-center ${
            activeTab === "help" ? "text-black" : "text-[#6D6D6D]"
          }`}
        >
          <IoIosHelpCircleOutline size={24} />
          <span className="text-sm">Help</span>
        </button>
      </div>
    </div>
  );
};

export default Popup;
