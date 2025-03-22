import { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import { FcFaq } from "react-icons/fc";
import { FaRobot, FaUser } from "react-icons/fa";
import { LuClipboard, LuImage, LuPlay, LuPlus, LuRefreshCcw, LuThumbsDown, LuThumbsUp } from "react-icons/lu";
import { PiSpeakerHigh } from "react-icons/pi";
import { toast } from "react-toastify";


export const typeText = (setTypedMessage, text, speed, setBotTyping) => {
  if (!text || typeof text !== "string") {
    console.error("Invalid text value:", text);
    setTypedMessage(""); // Ensure it doesn’t break
    setBotTyping(false);
    return;
  }

  setBotTyping(true);
  let charIndex = 0;

  const interval = setInterval(() => {
    const newText = text.slice(0, charIndex + 1);
    setTypedMessage(newText);

    if (charIndex >= text.length - 1) {
      clearInterval(interval);
      setBotTyping(false);
    }

    charIndex++;
  }, speed);
};


function ChatBotMessage({ messages, error, isLoading, setBotTyping }) {
  const scrollContainerRef = useRef(null);
  const [typedMessage, setTypedMessage] = useState("");
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);
  

  useEffect(() => {
    if (shouldAutoScroll) {
      scrollContainerRef.current?.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
      });
    }
  }, [messages, typedMessage, shouldAutoScroll]);

  useEffect(() => {
    const handleScroll = () => {
      setShouldAutoScroll(scrollContainerRef.current?.scrollHeight - scrollContainerRef.current?.scrollTop - scrollContainerRef.current?.clientHeight < 50);
    };

    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    const latestMessage = messages[messages.length - 1];
    if (latestMessage && latestMessage.role !== "user") {
      typeText(setTypedMessage, latestMessage.text, 10, setBotTyping);
    }
  }, [messages]);

  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [reactions, setReactions] = useState({});
  const [speakingMessages, setSpeakingMessages] = useState({});
  
  const handleReactionClick = (index, reaction) => {
    setReactions((prev) => ({
      ...prev,
      [index]: prev[index] === reaction ? null : reaction,
    }));
  };
  
  const handleTextToSpeech = (index, text) => {
    const synth = window.speechSynthesis;
    if (speakingMessages[index]) {
      synth.cancel(); // Stop speech if already playing
      setSpeakingMessages((prev) => ({ ...prev, [index]: false }));
    } else {
      const utterance = new SpeechSynthesisUtterance(text);
      synth.speak(utterance);
      setSpeakingMessages((prev) => ({ ...prev, [index]: true }));
      utterance.onend = () => setSpeakingMessages((prev) => ({ ...prev, [index]: false }));
    }
  };
  
  const renderedMessages = useMemo(() => {
    return messages.map((msg, index) => {
      const isMessageComponent = !!msg.component;
      const isUserMessage = msg.role === "user";
      const isBotMessage = msg.role === "bot";
      const isHovered = isBotMessage && hoveredIndex === index;
      const selectedReaction = reactions[index];
      const isSpeaking = speakingMessages[index];
  
      return (
        <div
          key={index}
          className={`pb-3 flex items-start gap-3 scrollbar-hide ${isUserMessage ? "flex-row-reverse" : "flex-row"}`}
          onMouseEnter={() => isBotMessage && setHoveredIndex(index)}
          onMouseLeave={() => isBotMessage && setHoveredIndex(null)}
        >
          <div className="w-8 h-8 flex items-center justify-center bg-gray-800 rounded-full text-white">
            {isUserMessage ? <FaUser /> : <FaRobot />}
          </div>
  
          <div className="flex flex-col gap-4 relative">
            <div
              className={`relative px-4 py-2 rounded-lg text-base text-fontlight font-normal ${
                isUserMessage ? "bg-[#4F46E5]" : "bg-[#1C1D1F]"
              } flex`}
              style={{ display: "inline-block", whiteSpace: "pre-wrap" }}
            >
              <div className="flex flex-col gap-2">
                <span className="flex-1 break-words">
                  {isMessageComponent ? msg.component : index === messages.length - 1 ? typedMessage : msg.text}
                </span>
                <div className="text-[10px] opacity-75 flex items-center justify-end gap-2 shrink-0">
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  <div>&#10003;&#10003;</div>
                </div>
              </div>
            </div>
  
            {/* HOVER ACTIONS */}
            {isHovered && (
              <div
                className={`absolute ${isMessageComponent ? "right-[-65px] top-0" : "left-0 top-[110%]"} flex ${
                  isMessageComponent ? "flex-col" : "flex-row"
                } gap-6 bg-[#000000] p-4 rounded-lg border-[#FFFFFF1A] border-[0.68px] transition-opacity duration-300 opacity-100`}
              >
                <LuRefreshCcw className="text-base text-[#7C7676] hover:text-[#c088fb]" />
                <LuThumbsUp
                  className={`text-base ${selectedReaction === "thumbsUp" ? "text-[#c088fb]" : "text-[#7C7676]"} hover:text-[#c088fb]`}
                  onClick={() => handleReactionClick(index, "thumbsUp")}
                />
                <LuThumbsDown
                  className={`text-base ${selectedReaction === "thumbsDown" ? "text-[#c088fb]" : "text-[#7C7676]"} hover:text-[#c088fb]`}
                  onClick={() => handleReactionClick(index, "thumbsDown")}
                />
                <LuClipboard
                  className="text-base text-[#7C7676] hover:text-[#c088fb]"
                  onClick={() => handleCopyToClipboard(msg.text)}
                />
                <PiSpeakerHigh
                  className={`text-base ${isSpeaking ? "text-[#c088fb]" : "text-[#7C7676]"} hover:text-[#c088fb]`}
                  onClick={() => handleTextToSpeech(index, msg.text)}
                />
              </div>
            )}
          </div>
        </div>
      );
    });
  }, [messages, typedMessage, hoveredIndex, reactions, speakingMessages]);
  
  
  
  
  
  return (
    <div className="relative w-full h-full pt-5 overflow-y-auto scrollbar-hide" ref={scrollContainerRef}>
      {renderedMessages}
      {(isLoading || error) && (
        <div className="flex items-start gap-3 pb-3">
          <div className="w-8 h-8 flex items-center justify-center bg-gray-800 rounded-full text-white">
            <FaRobot />
          </div>
          <div className="text-fontlight text-base font-normal px-4 py-2 rounded-lg bg-[#1C1D1F] min-w-[18%]">
            {isLoading ? (
              <>
                Typing<span className="animate-pulse">...</span>
              </>
            ) : (
              <span>{error}</span>
            )}
          </div>
        </div>
      )}
      {messages.length === 0 && (
        <div className="absolute flex items-center justify-center w-full h-full">
          <div className="flex flex-col items-center text-white/50">
            <FcFaq className="text-7xl" />
            <h1 className="text-3xl capitalize">nothing here!!!</h1>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatBotMessage;
