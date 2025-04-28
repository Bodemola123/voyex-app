"use client";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlinePaperClip } from "react-icons/ai";
import { GoSmiley } from "react-icons/go";
import { IoSend } from "react-icons/io5";

const emojiList = [
  "😀", "😂", "😍", "😎", "😭", "😡", "👍", "🙏", "🎉", "🔥",
  "💯", "👏", "😊", "😇", "🤔", "🙄", "🥰", "😜", "🤩", "🤗",
];

const ChatBotMessages = ({ messages, setMessages }) => {
  const [inputMessage, setInputMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [botTyping, setBotTyping] = useState(false); // Bot typing state
  const messagesEndRef = useRef(null);

  // Function to handle sending messages
  const sendMessage = () => {
    if (inputMessage.trim() !== "" && !botTyping) {
      const newMessage = { text: inputMessage, sender: "user" };
      setMessages((prev) => [...prev, newMessage]); // Add user message
      setInputMessage("");
      setShowEmojiPicker(false); // Close emoji picker when sending a message
      setBotTyping(true); // Bot starts typing

      // Simulate bot response with a delay
      setTimeout(() => {
        const botReply = {
          text: "Thank you for reaching out! How can I assist you?",
          sender: "bot",
        };
        setMessages((prev) => [...prev, botReply]);
        setBotTyping(false); // Bot finishes typing
      }, 2000); // 2s delay
    }
  };

  // Scroll to the latest message whenever messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="h-full flex flex-col justify-between p-4">
      {/* Messages Display */}
      <div className="flex flex-col flex-grow overflow-y-auto scrollbar-hide gap-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-3 rounded-xl max-w-[75%] text-sm ${
              msg.sender === "user"
                ? "bg-[#c088fb] text-white self-end"
                : "bg-[#e1e1e1] text-black self-start"
            }`}
          >
            {msg.text}
          </div>
        ))}
        {botTyping && (
          <div className="self-start bg-[#e1e1e1] text-black p-3 rounded-xl text-sm">
            Typing...
          </div>
        )}
        <div ref={messagesEndRef} /> {/* Auto-scroll target */}
      </div>

      {/* Sticky Input Bar */}
      <div className="bg-[#f3f3f3] sticky bottom-2 py-3.5 px-5 justify-between rounded-3xl flex flex-row items-center text-[#000000]">
        <div className="flex flex-row justify-center items-center gap-4 w-full relative">
          <button
          id="support_emoji_button"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            disabled={botTyping}
            className={botTyping ? "opacity-50" : ""}
          >
            <GoSmiley className="text-base" />
          </button>

          {/* Manual Emoji List */}
          {showEmojiPicker && (
            <div className="absolute bottom-12 left-0 bg-white shadow-lg rounded-xl p-2 w-48 h-32 overflow-y-scroll scrollbar-hide flex flex-wrap gap-2 border">
              {emojiList.map((emoji, index) => (
                <button
                id="support_emoji_picked"
                  key={index}
                  className="text-xl hover:bg-gray-200 rounded-md p-1"
                  onClick={() => setInputMessage((prev) => prev + emoji)}
                >
                  {emoji}
                </button>
              ))}
            </div>
          )}

<input
id="support_messages_input"
  className={`flex-grow outline-none bg-transparent text-sm ${
    botTyping ? "opacity-50" : ""
  }`}
  placeholder="Type a message..."
  value={inputMessage}
  onChange={(e) => setInputMessage(e.target.value)}
  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
  disabled={botTyping} // Disable input when bot is typing
/>

        </div>
        <div className="flex flex-row justify-center items-center gap-4">
          <button disabled={botTyping} className={botTyping ? "opacity-50 cursor-not-allowed" : ""}>
            <AiOutlinePaperClip className="text-base" />
          </button>
          <button
          id="support_messages_sendMessage"
            onClick={sendMessage}
            disabled={botTyping}
            className={botTyping ? "opacity-50" : ""}
          >
            <IoSend className="text-[#000000] text-base" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBotMessages;
