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
import ChatTop from "./ChatTop";
import Recommendations from "./Recommendations";
import { AiOutlineLoading3Quarters } from "react-icons/ai";


const TypingAnimation = () => {
  return (
    <div className="flex space-x-1">
      <span className="animate-bounce delay-0">.</span>
      <span className="animate-bounce delay-100">.</span>
      <span className="animate-bounce delay-200">.</span>
    </div>
  );
};


export const typeText = (setTypedMessage, text, speed, setBotTyping) => {
  if (!text || typeof text !== "string") {
    console.error("Invalid text value:", text);
    setTypedMessage(""); 
    setBotTyping(false);
    return;
  }

  setBotTyping(true);
  setTypedMessage("__typing__"); 
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
  }, 2000); // Delay before typing starts
};



function ChatBotMessage({ messages, error, isLoading, setBotTyping, userInput,
  setUserInput, isBotTyping,
  handleSendMessage,
  handleNewConversation, setShowChat, selectedFeatures, setSelectedFeatures, setShowRecommendationButton, showRecommendationButton,visibleButtons, setVisibleButtons,   resetRecommendation,
  setResetRecommendation,       handleResetRecommendationButton,   selectionCount,setSelectionCount}) {
  const scrollContainerRef = useRef(null);
  const [typedMessage, setTypedMessage] = useState("");
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);
    // Track whether the message is sent
    const [isMessageSent, setIsMessageSent] = useState(false);
    const [showRecommendations, setShowRecommendations] = useState(false);

// This function will ensure the container scrolls to the bottom
const scrollToBottom = () => {
  if (scrollContainerRef.current) {
    scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
  }
};

useEffect(() => {
  if (!showRecommendations) {
    // Scroll to the bottom when returning to the chat section
    scrollToBottom();
  }
}, [showRecommendations]);

  

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

  const buttonOptions = {
    "type of marketing": ["Brand Awareness", "Engagement", "User Acquisition"],
    "social media content creation": ["Educate", "Entertain", "Inspire", "Promote"],
    "area of business": ["Product-based", "Digital"],
    "ideas are you brainstorming": ["Educate", "Business"],
    "task management": ["Daily to-do lists", "Project planning", "Collaboration tools"],
    "aspect of design": ["Motion graphics", "Graphic design"],
    "automation": ["Marketing", "Schedule", "Data Entry"],
    "data analysis": ["Business Analytics", "Research Data", "Machine Learning"],
    "writing skills": ["Creative writing", "Copywriting", "Technical Writing"],
    "kind of collaboration": ["Project Management", "Document Sharing", "Team Communication"],
    "online course": ["Content Creation", "Course Hosting", "Student Engagement"],
    "digital business": ["Content Creation", "Software Development"],
    "educating your audience":["Videos", "Blog Posts"],
    "product-based business":["Production", "Customer Acquisition"],
    "type of videos":["Long", "Short"],
    "type of blog posts":["Fictional", "Non-Fictional"]
  };

  const [hiddenMessages, setHiddenMessages] = useState([]); // to track hidden messages


  useEffect(() => {
    const timers = [];
  
    messages.forEach((msg, index) => {
      const isBotMessage = msg.role === "bot";
      const matchingKey = Object.keys(buttonOptions).find((key) =>
        msg.text.toLowerCase().includes(key)
      );
  
      if (isBotMessage && matchingKey && !visibleButtons[index]) {
        const timer = setTimeout(() => {
          setVisibleButtons((prev) => ({ ...prev, [index]: true }));
        }, 3000);
  
        timers.push(timer);
      }
    });
  
    return () => timers.forEach((timer) => clearTimeout(timer));
  }, [messages]);
  


  const renderedMessages = useMemo(() => {
  
    
    return messages.map((msg, index) => {
          // Don't render hidden messages
    if (hiddenMessages.includes(msg.text)) {
      return null; // Return null if message is in hiddenMessages
    }
      const isUserMessage = msg.role === "user";
      const isBotMessage = msg.role === "bot";
      const isHovered = isBotMessage && hoveredIndex === index;
      const selectedReaction = reactions[index];
      const isSpeaking = speakingMessages[index];
      const containsPipeline = isBotMessage && msg.text.toLowerCase().includes("pipeline");
  
      let displayedText = msg.text;
      if (isBotMessage && index === messages.length - 1) {
        displayedText = typedMessage;
      }

// Option click handler to track new selections
const handleOptionClick = (index, option) => {
  if (selectedFeatures.hasOwnProperty(index)) return;

  const newSelectedFeatures = {
    ...selectedFeatures,
    [index]: option,
  };

  setSelectedFeatures(newSelectedFeatures);

  // Add the selected option to hiddenMessages to prevent display in the UI
  setHiddenMessages((prev) => [...prev, option]);

  // Send the selected option as a message but without displaying it as a user message
  setTimeout(() => {
    handleSendMessage(option); // Send the option but don't display as user message
  }, 0);

  // Track the number of new selections after reset
  setSelectionCount((prev) => prev + 1);

  // After three selections, set showRecommendationButton to true
  if (selectionCount + 1 === 3) {
    setShowRecommendationButton(true);
  }
};
      
      
      // Find if the message text contains any of the button options
      const matchingKey = Object.keys(buttonOptions).find((key) =>
        msg.text.toLowerCase().includes(key)
      );
  
      return (
        <div key={index} className="pb-3 flex flex-col gap-2">
          <div
            className="relative"
            onMouseEnter={() => isBotMessage && handleMouseEnter(index)}
            onMouseLeave={() => isBotMessage && handleMouseLeave()}
          >
            <div className={`flex items-start gap-3 ${isUserMessage ? "flex-row-reverse" : "flex-row"}`}>
              <div className="w-8 h-8 flex items-center justify-start bg-gray-800 rounded-full text-white">
                {isUserMessage ? <FaUser /> : <FaRobot />}
              </div>
  
              <div className="flex flex-col relative gap-2 mb-9">
                {/* MESSAGE TEXT */}
                <div
                  className={`relative px-4 py-2 rounded-lg text-base text-fontlight font-normal ${
                    isUserMessage ? "bg-[#4F46E5] max-w-[564px]" : "bg-[#1c1d1f] w-fit max-w-[650px]"
                  }`}
                  style={{ whiteSpace: "pre-wrap" }}
                >
                                    <span className="flex-1 break-words text-sm">
  {displayedText === "__typing__" ? <TypingAnimation /> : displayedText}
</span>
                </div>
  
                {/* Render Buttons if Matching Key is Found */}
                {matchingKey && visibleButtons[index] && (
  <div className="flex flex-row gap-2">
    {buttonOptions[matchingKey].map((option) => (
      <button
        key={option}
        className={`py-2 px-4 rounded-3xl transition-colors duration-200 text-sm ${
          selectedFeatures[index] === option
            ? "bg-[#f4f4f4] text-[#1C1D1F]"
            : selectedFeatures[index]
            ? "bg-[#1C1D1F] text-[#f4f4f4]"
            : "bg-[#1C1D1F] text-[#f4f4f4] hover:bg-[#f4f4f4] hover:text-[#1C1D1F]"
        }`}
        onClick={() => handleOptionClick(index, option)}
        disabled={!!selectedFeatures[index]}
      >
        {option}
      </button>
    ))}
  </div>
)}


  
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
  
          {/* PIPELINE COMPONENT */}
          {containsPipeline && (
            <div className="mt-4">
              <PipelineComponent stepData={msg.text} />
            </div>
          )}
        </div>
      );
    });
  }, [messages, hoveredIndex, reactions, speakingMessages, typedMessage, selectedFeatures, visibleButtons]);
  
  
 
  return (
    <div className="relative w-[1000px]" >
            {showRecommendations ? (
        <Recommendations setShowRecommendations={setShowRecommendations} /> 
      ) :
      <div className="h-full w-full flex flex-col justify-between bg-transparent py-4">
      <div className="flex flex-col overflow-hidden">
                      {/* Top section for chat header */}
          <ChatTop
          messages={messages}
          setShowChat={setShowChat}
          handleNewConversation={handleNewConversation}
          handleResetRecommendationButton={handleResetRecommendationButton}
        />
      <div className="pb-9 px-1 overflow-y-auto scrollbar-hide pt-5 " ref={scrollContainerRef}>
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
      </div>                          
        {/* Sticky Input and Footer */}
        <div className="sticky bottom-0 mx-auto flex flex-col items-center justify-center gap-6 bg-transparent z-30 p-1">
             {/* Render "Show Recommendation" button conditionally */}
        {showRecommendationButton && (
      <div className="flex justify-center mx-auto pt-1">
        <button className="py-4 px-6 rounded-3xl transition-colors font-bold duration-200 text-base text-[#0a0a0b] bg-[#f4f4f4]" onClick={() => setShowRecommendations(true)} >
          Show Recommendation
        </button>
      </div>
    )}
    <div className="flex flex-col gap-2 bg-black w-[900px] items-center justify-center">
    <ChatInput
            userInput={userInput}
            setUserInput={setUserInput}
            handleSendMessage={(message) => {
              handleSendMessage(message);
              setShowRecommendationButton(false); // Hide button when user sends message
              setIsMessageSent(true); // Mark the message as sent
            }}
            handleNewConversation={handleNewConversation}
            isLoading={isLoading}
            isBotTyping={isBotTyping}
            handleResetRecommendationButton={handleResetRecommendationButton}
          />
          <div>
          <BenFooter />
          </div>
    </div>
        </div>
      </div>
  }
    </div>
  );
}

export default ChatBotMessage;
