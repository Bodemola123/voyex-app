import { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import { FcFaq } from "react-icons/fc";
import { FaRobot, FaUser } from "react-icons/fa";
import { LuClipboard, LuImage, LuPlay, LuPlus, LuRefreshCcw, LuThumbsDown, LuThumbsUp } from "react-icons/lu";
import { PiSpeakerHigh } from "react-icons/pi";
import { toast } from "react-toastify";
import ChatInput from "./ChatInput";
import BenFooter from "../common/BenFooter";
import PipelineComponent from "./PipelineComponent";


export const typeText = (setTypedMessage, text, speed, setBotTyping) => {
  if (!text || typeof text !== "string") {
    console.error("Invalid text value:", text);
    setTypedMessage(""); 
    setBotTyping(false);
    return;
  }

  setBotTyping(true);
  setTypedMessage("Typing..."); // Display "Typing..." first

  setTimeout(() => {
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
  }, 3000); // Delay before typing starts
};



function ChatBotMessage({ messages, error, isLoading, setBotTyping, userInput,
  setUserInput, isBotTyping,
  handleSendMessage,
  handleNewConversation, }) {
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
    if (messages.length === 0) return;
  
    const latestMessage = messages[messages.length - 1];
  
    // Clear previous message to avoid flickering
    setTypedMessage("");
  
    if (latestMessage.role === "bot") {
      typeText(setTypedMessage, latestMessage.text, 10, setBotTyping);
    }
  }, [messages]);
  
  
  

  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [reactions, setReactions] = useState({});
  const [speakingMessages, setSpeakingMessages] = useState({});
  const hoverTimeoutRef = useRef(null);
  
  const handleReactionClick = (index, reaction) => {
    setReactions((prev) => ({
      ...prev,
      [index]: prev[index] === reaction ? null : reaction,
    }));
  };
  const handleCopyToClipboard = (text) => {
    if (!text) {
      toast.error("Nothing to copy!");
      return;
    }
    navigator.clipboard.writeText(text).then(() => {
      toast.success("Copied to clipboard!"); 
    }).catch(() => {
      toast.error("Failed to copy text!");
    });
  };

  const handleTextToSpeech = (index, text) => {
    const synth = window.speechSynthesis;
    if (speakingMessages[index]) {
      synth.cancel();
      setSpeakingMessages((prev) => ({ ...prev, [index]: false }));
    } else {
      const utterance = new SpeechSynthesisUtterance(text);
      synth.speak(utterance);
      setSpeakingMessages((prev) => ({ ...prev, [index]: true }));
      utterance.onend = () => setSpeakingMessages((prev) => ({ ...prev, [index]: false }));
    }
  };
  const handleMouseEnter = (index) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current); // Cancel any pending timeout
    }
    setHoveredIndex(index);
  };
  
  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredIndex(null);
    }, 300); // 0.3 seconds delay
  };
  const renderedMessages = useMemo(() => {
    return messages.map((msg, index) => {
      const isUserMessage = msg.role === "user";
      const isBotMessage = msg.role === "bot";
      const isHovered = isBotMessage && hoveredIndex === index;
      const selectedReaction = reactions[index];
      const isSpeaking = speakingMessages[index];
      const containsPipeline = isBotMessage && msg.text.toLowerCase().includes("pipeline");
  
      // Fix flickering issue
      let displayedText = msg.text;
      if (isBotMessage && index === messages.length - 1) {
        displayedText = typedMessage || "Typing..."; // Show only `typedMessage` while typing
      }
  
      return (
        <div key={index} className="pb-3 flex flex-col gap-2">
          <div
            className="relative"
            onMouseEnter={() => isBotMessage && handleMouseEnter(index)}
            onMouseLeave={() => isBotMessage && handleMouseLeave()}
          >
            <div className={`flex items-start gap-3 ${isUserMessage ? "flex-row-reverse" : "flex-row"}`}>
              <div className="w-8 h-8 flex items-center justify-center bg-gray-800 rounded-full text-white">
                {isUserMessage ? <FaUser /> : <FaRobot />}
              </div>
  
              <div className="flex flex-col relative">
                <div
                  className={`relative px-4 py-2 rounded-lg text-base text-fontlight font-normal ${
                    isUserMessage ? "bg-[#1c1d1f] max-w-[564px]" : "bg-transparent w-full"
                  }`}
                  style={{ whiteSpace: "pre-wrap" }}
                >
                  <div className="flex flex-col gap-[2px]">
                    <span className="flex-1 break-words text-sm">
                      {displayedText} {/* Prevents flickering by only showing `typedMessage` when bot is typing */}
                    </span>
                  </div>
                </div>
  
                {/* HOVER ACTIONS (ONLY ON BOT MESSAGES) */}
                {isHovered && (
                  <div className="absolute z-20 bg-transparent p-4 rounded-lg transition-opacity duration-300 opacity-100 left-0 top-[100%] flex-row flex gap-6">
                    <LuRefreshCcw className="text-base text-[#7C7676] hover:text-[#c088fb]" />
                    <LuThumbsUp
                      className={`text-sm ${selectedReaction === "thumbsUp" ? "text-[#c088fb]" : "text-[#7C7676]"} hover:text-[#c088fb]`}
                      onClick={() => handleReactionClick(index, "thumbsUp")}
                    />
                    <LuThumbsDown
                      className={`text-sm ${selectedReaction === "thumbsDown" ? "text-[#c088fb]" : "text-[#7C7676]"} hover:text-[#c088fb]`}
                      onClick={() => handleReactionClick(index, "thumbsDown")}
                    />
                    <LuClipboard
                      className="text-sm text-[#7C7676] hover:text-[#c088fb]"
                      onClick={() => handleCopyToClipboard(msg.text)}
                    />
                    <PiSpeakerHigh
                      className={`text-sm ${isSpeaking ? "text-[#c088fb]" : "text-[#7C7676]"} hover:text-[#c088fb]`}
                      onClick={() => handleTextToSpeech(index, msg.text)}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
  
          {/* PIPELINE COMPONENT - SEPARATE, BELOW MESSAGE */}
          {containsPipeline && (
            <div className="mt-4">
              <PipelineComponent stepData={msg.text} />
            </div>
          )}
        </div>
      );
    });
  }, [messages, hoveredIndex, reactions, speakingMessages, typedMessage]);
  
  
  
  
  
  
  
  return (
    <div className="relative h-full w-[80%] pt-5 overflow-y-auto scrollbar-hide flex flex-col justify-between" ref={scrollContainerRef}>
      <div className="mb-9">
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
        {/* Sticky Input and Footer */}
        <div className="sticky bottom-0 w-full mx-auto bg-black z-30 px-0.5">
          <ChatInput
            userInput={userInput}
            setUserInput={setUserInput}
            handleSendMessage={handleSendMessage}
            handleNewConversation={handleNewConversation}
            isLoading={isLoading}
            isBotTyping={isBotTyping}
          />
          <div className="mt-2 pb-2">
          <BenFooter />
          </div>

        </div>
    </div>
  );
}

export default ChatBotMessage;
