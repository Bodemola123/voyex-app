"use client";
import React from "react";
import { BiSolidHome, BiMessageRoundedDetail } from "react-icons/bi";
import { IoIosHelpCircleOutline } from "react-icons/io";

const ChatBotNavigation = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex justify-around py-2.5 px-7 bg-[#ffffff] rounded-2xl shadow-2xl">
      <button
        onClick={() => setActiveTab("home")}
        className={`gap-2 flex flex-col justify-center items-center ${
          activeTab === "home" ? "text-black" : "text-[#6D6D6D]"
        }`}
      >
        <BiSolidHome size={24} />
        <span className="text-sm">Home</span>
      </button>
      <button
        onClick={() => setActiveTab("messages")}
        className={`gap-2 flex flex-col justify-center items-center ${
          activeTab === "messages" ? "text-black" : "text-[#6D6D6D]"
        }`}
      >
        <BiMessageRoundedDetail size={24} />
        <span className="text-sm">Message</span>
      </button>
      <button
        onClick={() => setActiveTab("help")}
        className={`gap-2 flex flex-col justify-center items-center ${
          activeTab === "help" ? "text-black" : "text-[#6D6D6D]"
        }`}
      >
        <IoIosHelpCircleOutline size={24} />
        <span className="text-sm font-medium">Help</span>
      </button>
    </div>
  );
};

export default ChatBotNavigation;
