"use client";
import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";

const ChatBotHelp = ({ setMessages, setActiveTab }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const faqs = {
    "What can I do with Voyex?": "Voyex allows you to discover AI tools, build custom workflows, and streamline your processes.",
    "How do I integrate my tools?": "You can integrate your tools via our API or use our built-in connectors for seamless integration.",
    "What is the pricing for premium features?": "Our pricing varies based on the features you need. Visit our pricing page for more details.",
    "How can I get support?": "You can reach our support team via chat, email, or our help center.",
    "Is there a free trial for premium features?": "Yes, we offer a free trial for our premium features. Sign up to get started.",
    "How do I reset my password?": "Go to the login page, click 'Forgot Password', and follow the instructions to reset your password.",
    "What payment methods are accepted?": "We accept credit cards, PayPal, and other secure payment methods.",
    "Can I cancel my subscription anytime?": "Yes, you can cancel your subscription anytime from your account settings.",
    "How do I contact customer support?": "You can contact our support team via email at support@voyex.com or through our chat feature.",
    "Where can I find documentation for integrations?": "Our integration documentation is available in the developer section on our website.",
    "Are there discounts for teams or enterprises?": "Yes, we offer discounts for teams and enterprise users. Contact our sales team for more details."
  };

  const filteredFaqs = Object.keys(faqs).filter((faq) =>
    faq.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFaqClick = (faq) => {
    const newMessage = { text: faq, sender: "user" };
    const botReply = { text: faqs[faq], sender: "bot" };
    
    setMessages((prev) => [...prev, newMessage, botReply]);
    setActiveTab("messages");
  };

  return (
    <div className="p-4 flex flex-col gap-4 w-full">
      <h2 className="text-2xl font-bold text-[#1C1D1F]">How can we assist you?</h2>
      
      {/* Search bar to search through FAQs */}
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
      <div className="flex flex-col overflow-y-scroll scrollbar-hide gap-2 text-[#0a0a0b] text-sm max-h-[290px]">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq, index) => (
            <button 
              key={index} 
              className="py-2 px-2 text-left hover:bg-gray-100 rounded-md"
              onClick={() => handleFaqClick(faq)}
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

export default ChatBotHelp;