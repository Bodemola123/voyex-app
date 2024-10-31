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
import { LuClock4 } from "react-icons/lu";
import TrendingModal from "./TrendingModal";
import RecentlyAddedModal from "./RecentlyAddedModal";

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
  const [showTrendingModal, setShowTrendingModal] = useState(false);
  const [showRecentlyAddedModal, setShowRecentlyAddedModal] = useState(false);

  const handleTrendingClick = (query) => {
    setUserInput(query);
    setShowTrendingModal(false);
    setShowSuggestions(false);
  };

  const handleSurpriseClick = () => {
    const randomSearch =
      trendingSearches[Math.floor(Math.random() * trendingSearches.length)];
    setUserInput(randomSearch);
    setShowSuggestions(false);
  };

  const closeTrendingModal = useCallback(() => {
    setShowTrendingModal(false);
  }, []);

  const closeRecentlyAddedModal = useCallback(() => {
    setShowRecentlyAddedModal(false);
  }, []);

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
      setUserInput(userInput + predictiveText);
      setPredictiveText("");
      setShowSuggestions(false);
    }
  };

  const handleInputChange = (e) => {
    const input = e.target.value;
    setUserInput(input);
    setShowSuggestions(true);

    if (input === "") {
      setPredictiveText("");
    } else {
      const match = suggestions.find((suggestion) =>
        suggestion.toLowerCase().startsWith(input.toLowerCase())
      );

      if (match) {
        setPredictiveText(match.substring(input.length));
      } else {
        setPredictiveText("");
      }
    }
  };

  const handleButtonPress = (e) => {
    e.preventDefault();
    if (!userInput.trim()) {
      return;
    }
    setShowChat(true);
    handleSendMessage();
  };

  return (
    <div className="flex flex-col items-center max-w-[500px] w-full">
      <h1 className="text-8xl text-white font-bold">Voyex.</h1>
      <div className="flex items-center gap-1 text-2xl font-normal mt-5">
        Search for
        <span className="text-green-600">
          <TypewriterComponent
            options={{
              strings: UseCases,
              autoStart: true,
              loop: true,
              delay: 80,
            }}
          />
        </span>
      </div>

      <div className="relative w-full">
        <form
          action=""
          className={`flex items-center justify-between gap-2 w-full mt-5 px-3 border ${
            showSuggestions && userInput
              ? "rounded-t-lg bg-[#31313140] backdrop-blur-[3.4px] border-x-[#46BA3C] border-t-[#46BA3C]"
              : "rounded-full border-[#d0d5dd] "
          } hover:shadow-md hover:border-[#46BA3C] group`}
        >
          <CiSearch className="text-4xl" />
          <div className="relative w-full">
            <input
              type="text"
              value={userInput}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
              className="outline-none bg-transparent py-3 w-full placeholder:text-base placeholder:text-fontlight placeholder:font-normal"
              placeholder="Start your search voyex 🚀"
            />
            {predictiveText && (
              <span className="absolute top-0 left-0 py-3 pointer-events-none opacity-50 w-full overflow-hidden text-ellipsis whitespace-nowrap">
                <span>{userInput}</span>
                <span className="text-[#ebe7e7]">{predictiveText}</span>
              </span>
            )}
          </div>
          <button
            className={`py-3 pr-[2px] flex items-center justify-center w-9 h-8 rounded-full ${
              userInput
                ? "bg-white text-black transform transition-transform duration-200 rotate-45"
                : "bg-transparent text-white transform transition-transform duration-200 group-hover:rotate-45 group-hover:text-[#46BA3C]"
            } border`}
            onClick={handleButtonPress}
          >
            <BsSend />
          </button>
        </form>
        {showSuggestions && userInput && (
          <div className="absolute top-[65px] left-0 w-full bg-[#31313140] backdrop-blur-[3.4px] border border-x-[#46BA3C] border-b-[#46BA3C] border-t-transparent rounded-b-lg z-10 mt-1 p-2">
            <ul className="py-2">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="px-4 py-2 flex items-center text-white hover:bg-[#012b29] rounded-lg cursor-pointer"
                  onClick={() => {
                    setUserInput(suggestion);
                    setShowSuggestions(false);
                    setPredictiveText("");
                  }}
                >
                  <span className="mr-2">
                    <LuClock4 />
                  </span>
                  <span className="text-sm font-normal">{suggestion}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div
        className={`flex flex-col-reverse gap-3 text-base text-fontlight font-normal w-full ${
          showSuggestions && userInput ? "mt-[196px]" : "mt-10"
        }`}
      >
        <button
          className="italic p-3 border border-[#d0d5dd] rounded-md transition-all duration-200 ease-in-out hover:shadow-md hover:border-[#46BA3C]"
          onClick={() => setShowRecentlyAddedModal(true)}
        >
          <span className="transition-transform duration-200 ease-in-out hover:scale-110 inline-block w-full">
            🔥 Recently Added
          </span>
        </button>
        <div className="flex items-center gap-3 w-full">
          <button
            className="italic p-3 border border-[#d0d5dd] rounded-md w-1/2 transition-all duration-200 ease-in-out hover:shadow-md hover:border-[#46BA3C]"
            onClick={handleSurpriseClick}
          >
            <span className="transition-transform duration-200 ease-in-out hover:scale-110 inline-block w-full">
              🔥 Surprise ME!
            </span>
          </button>
          <button
            className="italic p-3 border border-[#d0d5dd] rounded-lg w-1/2 transition-all duration-200 ease-in-out hover:shadow-md hover:border-[#46BA3C]"
            onClick={() => setShowTrendingModal(true)}
          >
            <span className="transition-transform duration-200 ease-in-out hover:scale-110 inline-block w-full">
              🔥 Trending Searches
            </span>
          </button>
        </div>
      </div>
      {showTrendingModal && (
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
      )}
    </div>
  );
}

export default SearchMain;
