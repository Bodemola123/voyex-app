"use client";
import React, { useState } from "react";
import { GoSmiley } from "react-icons/go";
import { AiOutlinePaperClip } from "react-icons/ai";
import { IoSend } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";

const emojiList = [
  "😀", "😂", "😍", "😎", "😭", "😡", "👍", "🙏", "🎉", "🔥",
  "💯", "👏", "😊", "😇", "🤔", "🙄", "🥰", "😜", "🤩", "🤗",
];

const ChatBotHome = ({ setActiveTab, messages, setMessages }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [inputMessage, setInputMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const faqs = [
    "What can I do with Voyex?",
    "How do I integrate my tools?",
    "What is the pricing for premium features?",
    "How can I get support?",
  ];

  const faqReplies = {
    "What can I do with Voyex?": "Voyex allows you to discover AI tools and create custom workflows.",
    "How do I integrate my tools?": "You can integrate your tools via our API or built-in connectors.",
    "What is the pricing for premium features?": "Our pricing varies based on your needs. Visit our pricing page for more details.",
    "How can I get support?": "You can reach our support team via live chat or email at support@voyex.com.",
  };

  const filteredFaqs = faqs.filter((faq) =>
    faq.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle Send Message
  const sendMessage = (message) => {
    const userMessage = { text: message, sender: "user" };
    const botReply = { text: faqReplies[message] || "Thank you for reaching out! How can I assist you?", sender: "bot" };
    
    setMessages((prev) => [...prev, userMessage, botReply]);
    setInputMessage("");
    setShowEmojiPicker(false); // Close emoji picker when sending a message
    setActiveTab("messages");
  };

  return (
    <div className="p-4 flex flex-col gap-4 overflow-y-scroll scrollbar-hide">
      <h2 className="text-2xl font-bold text-[#1C1D1F]">Hello There, How Can We Help You?</h2>

      {/* ChatBot Input */}
      <div className="relative flex flex-col">
        <div className="py-4 px-4 rounded-2xl text-white flex flex-col items-center justify-center gap-3 bg-gradient-to-r from-[#C088FB] to-[#9747FF]">
          <p className="text-xs font-normal text-left text-[#f4f4f4]">
            Use our Immediate Response Bot for any difficulties
          </p>

          <div className="bg-[#f3f3f3] py-3.5 px-5 justify-between rounded-3xl flex flex-row items-center text-[#000000] w-full">
            <div className="flex flex-row justify-center items-center gap-4 w-full relative">
              <button onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                <GoSmiley className="text-base" />
              </button>

              {/* Manual Emoji List */}
              {showEmojiPicker && (
                <div className="absolute top-[40px] left-0 bg-white shadow-lg rounded-xl p-2 w-48 h-32 overflow-y-scroll scrollbar-hide flex flex-wrap gap-2 border">
                  {emojiList.map((emoji, index) => (
                    <button 
                      key={index} 
                      className="text-xl hover:bg-gray-200 rounded-md p-1"
                      onClick={() => {
                        setInputMessage((prev) => prev + emoji);
                      }}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              )}

              {/* Input Field */}
              <input
                className="bg-transparent flex-grow outline-none placeholder:text-[#565656] text-[#565656] text-sm placeholder:text-xs font-normal"
                placeholder="Send us a message"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage(inputMessage)}
              />
            </div>
            <div className="flex flex-row justify-center items-center gap-4">
              <button><AiOutlinePaperClip className="text-base" /></button>
              <button onClick={() => sendMessage(inputMessage)}><IoSend className="text-base" /></button>
            </div>
          </div>
        </div>
      </div>

      {/* Search bar for FAQs */}
      <div className="rounded-2xl px-2.5 py-3 gap-2 flex flex-row justify-start items-center bg-[#F3F3F3] w-full">
        <FiSearch className="text-lg text-[#1e1e1e]" />
        <input
          className="w-full flex-grow p-2 bg-transparent outline-none placeholder:text-sm text-sm placeholder:text-[#1E1E1E] text-[#1E1E1E]"
          placeholder="Search for Help"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Frequently Asked Questions (Filtered) */}
      <div className="flex flex-col overflow-y-scroll scrollbar-hide gap-2 text-[#0a0a0b] max-h-[100px] text-sm">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq, index) => (
            <button 
              key={index} 
              className="py-2 px-2 text-left hover:bg-gray-100 rounded-md"
              onClick={() => sendMessage(faq)}
            >
              {faq}
            </button>
          ))
        ) : (
          <p className="text-xs text-gray-500 text-center">No results found</p>
        )}
      </div>
    </div>
  );
};

export default ChatBotHome;
