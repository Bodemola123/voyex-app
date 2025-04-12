"use client";
import { useState } from "react";
import { GrTag } from "react-icons/gr";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { TbFilter } from "react-icons/tb";
import ChatProductCard from "./ChatProductCard";
import { LuRefreshCw } from "react-icons/lu";
import { FaStar, FaRegStar } from "react-icons/fa";

function Recommendations({ setShowRecommendations }) {
  const [contentPriceFilter, setContentPriceFilter] = useState(null);
  const [videoPriceFilter, setVideoPriceFilter] = useState(null);
  const [contentRatingFilter, setContentRatingFilter] = useState(null);
  const [videoRatingFilter, setVideoRatingFilter] = useState(null);
  const [contentPriceDropdownOpen, setContentPriceDropdownOpen] = useState(null);
  const [videoPriceDropdownOpen, setVideoPriceDropdownOpen] = useState(null);
  const [contentRatingDropdownOpen, setContentRatingDropdownOpen] = useState(null);
  const [videoRatingDropdownOpen, setVideoRatingDropdownOpen] = useState(null);

  const [products] = useState([
    { id: 1, price: "$4.00 -$8.00", rating: 2 },
    { id: 2, price: "$4.00 -$8.00", rating: 4 },
    { id: 3, price: "Freemium", rating: 3 },
    { id: 4, price: "$4.00 -$8.00", rating: 5 },
  ]);

  const filterProducts = (list, priceFilter, ratingFilter) => {
    return list.filter((product) => {
      const matchesPrice =
        priceFilter === null ||
        priceFilter === "All" ||
        (priceFilter === "Free" && product.price.toLowerCase() === "freemium") ||
        (priceFilter === "Paid" && product.price.toLowerCase() !== "freemium");
      const matchesRating =
        ratingFilter === null || product.rating === ratingFilter;
      return matchesPrice && matchesRating;
    });
  };

  const renderRatingOption = (value) => (
    <div
      key={value}
      className="flex gap-1 items-center p-1 cursor-pointer hover:bg-[#f4f4f4] rounded-[6px]"
      onClick={() => {
        setContentRatingFilter(value);
        setContentRatingDropdownOpen(null);
      }}
    >
      {Array.from({ length: 5 }, (_, i) =>
        i < value ? (
          <FaStar key={i} className="text-[#FCD53F] text-xl" />
        ) : (
          <FaRegStar key={i} className="text-[#FCD53F] text-xl" />
        )
      )}
    </div>
  );

  const renderSection = (title, sectionType) => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row justify-between">
        <h1 className="text-2xl font-bold">{title}</h1>
        <div className="flex flex-row gap-2 relative">
          <button className="w-24 h-8 gap-3 text-sm rounded-3xl flex justify-center items-center bg-[#131314]">
            <TbFilter /> Filter
          </button>
          <div className="relative">
            <button
              className={`w-24 h-8 gap-3 text-sm rounded-3xl flex justify-center items-center ${
                sectionType === "content" && contentPriceDropdownOpen
                  ? "bg-[#f4f4f4] text-[#0a0a0b]"
                  : sectionType === "video" && videoPriceDropdownOpen
                  ? "bg-[#f4f4f4] text-[#0a0a0b]"
                  : "bg-[#131314] text-white hover:bg-[#f4f4f4] hover:text-[#0a0a0b]"
              }`}
              onClick={() => {
                if (sectionType === "content") {
                  setContentPriceDropdownOpen(contentPriceDropdownOpen ? null : title);
                } else {
                  setVideoPriceDropdownOpen(videoPriceDropdownOpen ? null : title);
                }
              }}
            >
              <GrTag className="transform scale-x-[-1]" /> Price
            </button>
            {(sectionType === "content" && contentPriceDropdownOpen === title) ||
            (sectionType === "video" && videoPriceDropdownOpen === title) ? (
              <div className="absolute mt-2 bg-[#1c1d1f] p-2 rounded-[8px] flex flex-col gap-2 text-[#f4f4f4] z-50">
                <span
                  className="cursor-pointer hover:bg-[#f4f4f4] hover:text-[#1c1d1f] px-2 py-1 rounded"
                  onClick={() => {
                    sectionType === "content"
                      ? setContentPriceFilter("Free")
                      : setVideoPriceFilter("Free");
                  }}
                >
                  Free
                </span>
                <span
                  className="cursor-pointer hover:bg-[#f4f4f4] hover:text-[#1c1d1f] px-2 py-1 rounded"
                  onClick={() => {
                    sectionType === "content"
                      ? setContentPriceFilter("Paid")
                      : setVideoPriceFilter("Paid");
                  }}
                >
                  Paid
                </span>
                {/* Add "All" option to reset filter */}
                <span
                  className="cursor-pointer hover:bg-[#f4f4f4] hover:text-[#1c1d1f] px-2 py-1 rounded"
                  onClick={() => {
                    sectionType === "content"
                      ? setContentPriceFilter("All")
                      : setVideoPriceFilter("All");
                  }}
                >
                  All
                </span>
              </div>
            ) : null}
          </div>
          <div className="relative">
            <button
              className={`w-24 h-8 gap-3 text-sm rounded-3xl flex justify-center items-center ${
                sectionType === "content" && contentRatingDropdownOpen
                  ? "bg-[#f4f4f4] text-[#0a0a0b]"
                  : sectionType === "video" && videoRatingDropdownOpen
                  ? "bg-[#f4f4f4] text-[#0a0a0b]"
                  : "bg-[#131314] text-white hover:bg-[#f4f4f4] hover:text-[#0a0a0b]"
              }`}
              onClick={() => {
                if (sectionType === "content") {
                  setContentRatingDropdownOpen(contentRatingDropdownOpen ? null : title);
                } else {
                  setVideoRatingDropdownOpen(videoRatingDropdownOpen ? null : title);
                }
              }}
            >
              <HiOutlineSquares2X2 /> Rating
            </button>
            {(sectionType === "content" && contentRatingDropdownOpen === title) ||
            (sectionType === "video" && videoRatingDropdownOpen === title) ? (
              <div className="absolute mt-2 bg-[#1c1d1f] p-2 rounded-[8px] flex flex-col gap-2 z-50">
                {[1, 2, 3, 4, 5].map((val) => renderRatingOption(val))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 grid-rows-2 gap-4">
        {filterProducts(
          products,
          sectionType === "content" ? contentPriceFilter : videoPriceFilter,
          sectionType === "content" ? contentRatingFilter : videoRatingFilter
        ).map((product) => (
          <ChatProductCard key={`${title}-${sectionType}-${product.id}`} product={product} />
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-9 w-full h-full bg-transparent p-6 text-[#f4f4f4] overflow-y-auto scrollbar-hide">
      <div className="flex flex-row gap-3 items-center justify-start">
        <button
          className="w-[48px] h-[32px] border border-card gap-2.5 flex items-center justify-center rounded-lg"
          onClick={() => setShowRecommendations(false)}
        >
          <MdKeyboardArrowLeft className="text-white text-[24px]" />
        </button>
        <p className="text-base font-bold">Showing Recommendations</p>
      </div>
      {renderSection("Content Creation", "content")}
      {renderSection("Video Generation", "video")}
      <div className="flex flex-row justify-between">
        <button className="px-12 py-4 rounded-3xl border border-[#FFFFFF26] font-medium">
          Give Feedback
        </button>
        <button className="flex flex-row gap-2.5 px-7 py-4 rounded-3xl bg-white text-[#0a0a0b] text-xl font-bold items-center justify-center">
          <p className="text-base">Suggest More Tools</p>
          <LuRefreshCw />
        </button>
      </div>
    </div>
  );
}

export default Recommendations;
