"use client";

import { ChangeEvent, KeyboardEvent, MouseEvent, useCallback } from "react";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import TypewriterComponent from "typewriter-effect";
import {
  suggestions,
  trendingSearches,
  recentlyAddedItems,
  UseCases,
} from "@/constants/search-page";
import { BsSend } from "react-icons/bs";
import { LuClock4, LuMessageCircleHeart } from "react-icons/lu";
import TrendingModal from "./TrendingModal";
import RecentlyAddedModal from "./RecentlyAddedModal";
import Image from "next/image";
import { MdImageSearch } from "react-icons/md";
import { GoLightBulb } from "react-icons/go";
import { LuEye } from "react-icons/lu";
import '../../app/globals.css'
import React, {useEffect } from "react";
import dynamic from "next/dynamic";
import { GrAttachment } from "react-icons/gr";
import { GrMicrophone } from "react-icons/gr";
import { IoArrowUp } from "react-icons/io5";
import { HiXMark } from "react-icons/hi2"; // Import HiXMark from react-icons
import '../../app/globals.css';
import BenNavbar from "../common/BenNavbar";
import BenFooter from "../common/BenFooter";
import HomeNav from "./HomeNav";
import Banner from "../common/Banner";

function SearchMain({
  messages,
  error,
  userInput,
  setShowChat,
  setUserInput,
  handleSendMessage,
}) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [predictiveText, setPredictiveText] = useState("");
  // const [showTrendingModal, setShowTrendingModal] = useState(false);
  const [showRecentlyAddedModal, setShowRecentlyAddedModal] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState(suggestions); // Initial state is all suggestions

  const [isHistoryVisible, setIsHistoryVisible] = useState(false);
  
  // const firstName = localStorage.getItem("firstName") || "Explorer";

  useEffect(() => {
    const savedState = localStorage.getItem("isHistoryVisible");
    if (savedState !== null) {
      setIsHistoryVisible(JSON.parse(savedState));
    }
  }, []);

  const toggleHistoryVisibility = () => {
    setIsHistoryVisible((prev) => {
      const newState = !prev;
      localStorage.setItem("isHistoryVisible", JSON.stringify(newState));
      return newState;
    });
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  // const [attachedFile, setAttachedFile] = useState(null);
  // const [isRecording, setIsRecording] = useState(false);
  // const [audioBlobUrl, setAudioBlobUrl] = useState("");
  const [isClient, setIsClient] = useState(false); // To track if we're on the client
  // const [uploadSuccessful, setUploadSuccessful] = useState(false); // Track if upload is valid
  const [randomTrendingSearches, setRandomTrendingSearches] = useState([]);

// Function to select 3 random trending searches
const getRandomTrendingSearches = () => {
  const randomSearches = [];
  while (randomSearches.length < 3) {
    const randomIndex = Math.floor(Math.random() * trendingSearches.length);
    const randomSearch = trendingSearches[randomIndex];
    if (!randomSearches.includes(randomSearch)) {
      randomSearches.push(randomSearch);
    }
  }
  setRandomTrendingSearches(randomSearches);
};

// Call the function when the component mounts
useEffect(() => {
  getRandomTrendingSearches();
}, []);


  // const handleTrendingClick = (query) => {
  //   setUserInput(query);
  //   setShowTrendingModal(false);
  //   setShowSuggestions(false);
  // };


  // const closeTrendingModal = useCallback(() => {
  //   setShowTrendingModal(false);
  // }, []);

  // const closeRecentlyAddedModal = useCallback(() => {
  //   setShowRecentlyAddedModal(false);
  // }, []);

  const handleKeyPress = (e) => {
    if (!userInput.trim()) {
      return;
    }
    if (e.key === "Enter") {
      e.preventDefault();

      setShowChat(true);
      handleSendMessage();
    } else if (e.key === "Tab" || e.key === "ArrowRight") {
      // To auto fill in search bar
      e.preventDefault();
      setUserInput("");
      setPredictiveText("");
      setShowSuggestions(false);
    }
  };
  // const handleFileChange = (event) => {
  //   setAttachedFile(event.target.files[0]);
  // };


  const handleInputChange = (e) => {
    const input = e.target.value;
    setUserInput(input);
  
    // Filter suggestions based on the input
    const filteredSuggestions = suggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(input.toLowerCase()) // Adjust this filter logic if needed
    );
  
    // Update the state for filtered suggestions
    if (filteredSuggestions.length > 0) {
      setShowSuggestions(true); // Show the suggestions if we have matches
    } else {
      setShowSuggestions(false); // Hide suggestions if no matches
    }
  
    // Set the filtered suggestions to a state
    setFilteredSuggestions(filteredSuggestions);
  };
  
  

  const handleButtonPress = (e) => {
    e.preventDefault();
    if (!userInput.trim()) {
      return;
    }
    setShowChat(true);
    handleSendMessage();
  };
  // const handleUpload = () => {
  //   if (userInput || attachedFile) {
  //     alert(
  //       `Uploading:\\nText: ${userInput}\\nFile: ${
  //         attachedFile ? attachedFile.name : "None"
  //       }`
  //     );
  //     setAttachedFile(null);
  //     setAudioBlobUrl(""); // Reset audio
  //     setUploadSuccessful(true); // Mark upload as successful
  //   } else {
  //     setUploadSuccessful(false); // Set upload to unsuccessful
  //     alert("Please provide text or attach a file before uploading.");
  //   }
  // };
  // const handleRemoveFile = () => {
  //   setAttachedFile(null);
  //   setAudioBlobUrl(""); // Reset audio
  // };

    // Only render the ReactMediaRecorder component on the client side
    if (!isClient) {
      return (
null
      );
    }
  return (
    <div className="flex items-center w-full h-screen">
      <div className="flex flex-row">
      <BenNavbar
        toggleHistoryVisibility={toggleHistoryVisibility}
        isHistoryVisible={isHistoryVisible}
      />

      {/* History with Smooth Transition */}
      <div
        className={`transition-all duration-300 ${
          isHistoryVisible ? "w-[250px]" : "w-0"
        } bg-[#131314] overflow-hidden`}
      >
        {isHistoryVisible && <HomeNav />}
      </div>
      </div>
      <div className="flex-grow relative flex flex-col w-full h-full justify-between items-center overflow-y-scroll py-6 px-6 scrollbar-hide scroll-container">
        <Banner/>
      <div className="relative w-full items-center justify-center flex gap-14 flex-col">
      <div className='flex flex-col gap-[8px] justify-center items-center'>
<div className='flex flex-row gap-4 justify-center items-center '>
  <p className='text-transparent bg-clip-text bg-gradient-to-r from-[#C088FB] via-[#8E3EFF] to-[#8E3EFF] md:text-[48px] leading-[57.6px] font-bold text-center text-2xl'>
    Hi Explorer, meet Voyex
  </p>
  <Image src={'/Sparkle.svg'} alt='sparkles' width={40} height={40} className='message-bubble md:flex hidden'/>
</div>

      <p className='text-[#f4f4f4] font-bold text-center text-2xl'>Launch into discovery. Voyex will pilot your journey.</p>
    </div>
      <div className={`flex items-center bg-[#1C1D1F] px-4 py-2 space-x-2 shadow-lg w-full max-w-[573px] border-[0.5px] border-transparent ${
      showSuggestions && userInput
        ? "rounded-t-[37px] bg-[#1C1D1F] backdrop-blur-[3.4px]  max-w-[573px]"
        : "rounded-[37px]  max-w-[573px]"
    } group`}
  >
      {/* Glowing orb before the input */}
      <div className="relative w-10 h-10 flex items-center justify-center">
  <div className="absolute w-10 h-10 rounded-full glass-orb overflow-hidden shadow-inner backdrop-blur-sm">
    {/* Lava blobs */}
    <div className="relative w-full h-full">
      <span
        className={`lava-blob blob1 ${userInput ? "animate-blob1" : "blob-inactive"}`}
      />
      <span
        className={`lava-blob blob2 ${userInput ? "animate-blob2" : "blob-inactive"}`}
      />
      <span
        className={`lava-blob blob3 ${userInput ? "animate-blob3" : "blob-inactive"}`}
      />
      <span
        className={`lava-blob blob4 ${userInput ? "animate-blob4" : "blob-inactive"}`}
      />
      <span
        className={`lava-blob blob5 ${userInput ? "animate-blob5" : "blob-inactive"}`}
      />
    </div>
    {/* Reflection */}
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
      <div className="w-[80%] h-[40%] bg-white/10 blur-sm rounded-full absolute top-1 left-1/2 transform -translate-x-1/2 rotate-[-20deg]" />
    </div>
  </div>
</div>





      {/* File attachment icon
      <label className="cursor-pointer ">
        <input
          type="file"
          className="hidden"
          onChange={handleFileChange}
          accept="image/*, video/*, audio/*"
        />
        <GrAttachment className="text-[#94a3b8] text-[16px] md:text-[20px]" />
      </label>

      Display the file (image/video/audio)
      {attachedFile && attachedFile.type.startsWith("image/") && (
        <div className="relative">
          <img
            src={URL.createObjectURL(attachedFile)}
            alt="Attachment"
            className="w-14 h-14 object-cover rounded-lg"
          />
          <button
            onClick={handleRemoveFile}
            className="absolute top-0 right-0 bg-black text-white text-xs rounded-full w-4 h-4 flex items-center justify-center"
          >
            <HiXMark className="text-[#ffffff]" />
          </button>
        </div>
      )}
      {attachedFile && attachedFile.type.startsWith("video/") && (
        <div className="relative">
          <video
            controls
            className="w-14 h-14 object-cover rounded-lg"
            src={URL.createObjectURL(attachedFile)}
          />
          <button
            onClick={handleRemoveFile}
            className="absolute top-0 right-0 bg-black text-white text-xs rounded-full w-4 h-4 flex items-center justify-center"
          >
            <HiXMark className="text-[#ffffff]" />
          </button>
        </div>
      )}
   {audioBlobUrl && (
      <div className="relative">
        <audio controls className="w-14 h-14">
          <source src={audioBlobUrl} type="audio/mpeg" />
        </audio>
        <button
          onClick={() => {
            console.log("Audio file being removed..."); // Debugging line to check removal
            setAudioBlobUrl(""); // Reset the audio URL
          }}
          className="absolute top-0 right-0 bg-black text-white text-xs rounded-full w-4 h-4 flex items-center justify-center"
        >
          <HiXMark className="text-[#ffffff]" />
        </button>
      </div>
    )} */}
      {/* Expandable Input field */}
      <div className="relative w-full flex items-center justify-center my-auto">
      <textarea
        placeholder="Start Exploration"
        value={userInput}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        className="flex-grow bg-[#1C1D1F] text-white placeholder-gray-500 outline-none text-xs md:text-base md:placeholder:text-base placeholder:text-xs placeholder:font-medium font-medium resize-none scrollbar-hide scroll-container max-h-[112px] rounded-lg px-3 py-2 w-[100%]"
        rows={1}
      />
            {/* {predictiveText && (
              <span className="absolute top-0 left-0 py-3 pointer-events-none opacity-50 max-w-[532px] overflow-hidden text-ellipsis whitespace-nowrap">
                <span>{userInput}</span>
                <span className="text-[#ebe7e7]">{predictiveText}</span>
              </span>
            )} */}
      </div>

          <button
            className="focus:outline-none"
          >
            <GrMicrophone
              className={`md:text-[20px] text-[16px] text-[#94a3b8]`}
            />
          </button>


      {/* Upload button */}
        <button
        onClick={(e) => { handleButtonPress(e)}} // First, handle the upload logic
          disabled={!userInput} // Disable button if no text/file
          className={`flex items-center justify-center p-1.5 bg-[#C088fb] rounded-full focus:outline-none ${!userInput && "opacity-50 cursor-not-allowed"}`}
        >
          <IoArrowUp className="text-[#ffffff] text-[18px] md:text-[20px] lg:text-[24px]" />
        </button>
    </div>
    {showSuggestions && userInput && (
  <div className="absolute top-[150px] md:top-[198px] mx-auto max-h-[200px] overflow-y-scroll scrollbar-hide w-[573px] bg-[#1c1d1f] border-t-transparent rounded-b-[37px] z-10 mt-1 p-2">
    <ul className="">
      {filteredSuggestions.map((suggestion, index) => (
        <li
          key={index}
          className="px-3 py-3 flex items-center text-white hover:text-[#0a0a0b] hover:bg-[#c088fb] rounded-[37px] cursor-pointer"
          onClick={() => {
            setUserInput(suggestion);
            setShowSuggestions(false);
            setPredictiveText(""); // Reset the predictive text when a suggestion is clicked
          }}
        >
          <span className="mr-2">
            <LuClock4 />
          </span>
          <span className="text-[16px] md:text-sm font-medium">{suggestion}</span>
        </li>
      ))}
    </ul>
  </div>
)}
      <div className="md:grid grid-cols-3 gap-6 flex flex-col">
  {randomTrendingSearches.map((search, index) => (
    <div
      key={index}
      className="w-[210px] h-[167px] hover:scale-105 transition-all"
      style={{
        background:
          index === 0
            ? 'linear-gradient(236.35deg, rgba(255, 255, 255, 0.3) 1.57%, rgba(34, 63, 250, 0.5) 48.49%, rgba(47, 130, 239, 0.2) 95.41%)'
            : index === 1
            ? 'linear-gradient(236.35deg, rgba(255, 255, 255, 0.4) 1.67%, rgba(255, 127, 0, 0.5) 52.47%, rgba(255, 198, 142, 0.2) 95.5%)'
            : 'linear-gradient(236.35deg, rgba(255, 255, 255, 0.3) 1.67%, rgba(55, 195, 144, 0.5) 48.59%, rgba(153, 248, 214, 0.2) 95.5%)',
        padding: '2px',
        borderRadius: '24px',
      }}
    >
      <button
        className="relative w-full h-full bg-[#0a0a0b] text-[#bfbdbd] flex rounded-3xl items-center justify-center px-4"
        onClick={() => {
          setUserInput(search); // Set the random trending search to userInput
          setShowSuggestions(false); // Hide suggestions once a search is selected
        }}
      >
        {/* Display random trending search text */}
        <p className="text-base text-center">{search}</p>

        {/* Icon on the button */}
        <div
          className="absolute bottom-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg cursor-pointer"
        >
          {/* Display different icons based on index */}
          {index === 0 && <MdImageSearch className="text-[18px] text-[#2f82ef]" />}
          {index === 1 && <GoLightBulb className="md:text-[24px] sm:text-[18px] text-[#f1a62d]" />}
          {index === 2 && <LuEye className="md:text-[24px] sm:text-[18px] text-[#3fc390]" />}
        </div>
      </button>
    </div>
  ))}
      </div>
      </div>
      <BenFooter/>

      {/* {showTrendingModal && (
        <>
          <TrendingModal
            trendingSearches={trendingSearches}
            onClose={closeTrendingModal}
            onQueryClick={handleTrendingClick}
          />
        </>
      )}
      {showRecentlyAddedModal && (
        <RecentlyAddedModal
          recentlyAddedItems={recentlyAddedItems}
          onClose={closeRecentlyAddedModal}
        />
      )} */}
      </div>
    </div>

  );
}

export default SearchMain;
