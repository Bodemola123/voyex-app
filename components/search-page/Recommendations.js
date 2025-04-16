"use client";
import { useState } from "react";
import { GrTag } from "react-icons/gr";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { TbFilter } from "react-icons/tb";
import ChatProductCard from "./ChatProductCard";
import { LuRefreshCw } from "react-icons/lu";
import { FaStar, FaRegStar } from "react-icons/fa";
import OverallFeedback from "./Modals/OverallFeedback";

function Recommendations({ setShowRecommendations }) {
  const [contentPriceFilter, setContentPriceFilter] = useState(null);
  const [videoPriceFilter, setVideoPriceFilter] = useState(null);
  const [contentRatingFilter, setContentRatingFilter] = useState(null);
  const [videoRatingFilter, setVideoRatingFilter] = useState(null);
  const [contentOpenDropdown, setContentOpenDropdown] = useState(null);
  const [videoOpenDropdown, setVideoOpenDropdown] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredRating, setHoveredRating] = useState(null);

  const handleOverallFeedbackClick = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

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
        ratingFilter === null || ratingFilter === "All" || product.rating === ratingFilter;
      return matchesPrice && matchesRating;
    });
  };

  const renderStarRow = (sectionType) => {
    const selectedRating = sectionType === "content" ? contentRatingFilter : videoRatingFilter;
    const displayRating = hoveredRating ?? selectedRating;

    return (
      <div className="flex flex-col gap-2">
        <span
          className="cursor-pointer hover:bg-[#f4f4f4] hover:text-[#1c1d1f] px-2 py-1 rounded"
          onClick={() => {
            if (sectionType === "content") {
              setContentRatingFilter("All");
              setContentOpenDropdown(null);
            } else {
              setVideoRatingFilter("All");
              setVideoOpenDropdown(null);
            }
          }}
        >
          All
        </span>
        <div className="flex gap-1 items-center p-1 cursor-pointer">
          {Array.from({ length: 5 }, (_, i) => {
            const isFilled = displayRating && i < displayRating;
            return (
              <span
                key={i}
                onMouseEnter={() => setHoveredRating(i + 1)}
                onMouseLeave={() => setHoveredRating(null)}
                onClick={() => {
                  if (sectionType === "content") {
                    setContentRatingFilter(i + 1);
                    setContentOpenDropdown(null);
                  } else {
                    setVideoRatingFilter(i + 1);
                    setVideoOpenDropdown(null);
                  }
                }}
              >
                {isFilled ? (
                  <FaStar className="text-[#FCD53F] text-base" />
                ) : (
                  <FaRegStar className="text-[#FCD53F] text-base" />
                )}
              </span>
            );
          })}
        </div>
      </div>
    );
  };

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
                (sectionType === "content" && contentOpenDropdown === "price") ||
                (sectionType === "video" && videoOpenDropdown === "price")
                  ? "bg-[#f4f4f4] text-[#0a0a0b]"
                  : "bg-[#131314] text-white hover:bg-[#f4f4f4] hover:text-[#0a0a0b]"
              }`}
              onClick={() => {
                if (sectionType === "content") {
                  setContentOpenDropdown(contentOpenDropdown === "price" ? null : "price");
                } else {
                  setVideoOpenDropdown(videoOpenDropdown === "price" ? null : "price");
                }
              }}
            >
              <GrTag className="transform scale-x-[-1]" /> Price
            </button>
            {(sectionType === "content" && contentOpenDropdown === "price") ||
            (sectionType === "video" && videoOpenDropdown === "price") ? (
              <div className="absolute mt-2 bg-[#1c1d1f] p-2 rounded-[8px] flex flex-col gap-2 text-[#f4f4f4] z-50">
                {["Free", "Paid", "All"].map((option) => (
                  <span
                    key={option}
                    className="cursor-pointer hover:bg-[#f4f4f4] hover:text-[#1c1d1f] px-2 py-1 rounded"
                    onClick={() => {
                      if (sectionType === "content") {
                        setContentPriceFilter(option);
                        setContentOpenDropdown(null);
                      } else {
                        setVideoPriceFilter(option);
                        setVideoOpenDropdown(null);
                      }
                    }}
                  >
                    {option}
                  </span>
                ))}
              </div>
            ) : null}
          </div>

          <div className="relative">
            <button
              className={`w-24 h-8 gap-3 text-sm rounded-3xl flex justify-center items-center ${
                (sectionType === "content" && contentOpenDropdown === "rating") ||
                (sectionType === "video" && videoOpenDropdown === "rating")
                  ? "bg-[#f4f4f4] text-[#0a0a0b]"
                  : "bg-[#131314] text-white hover:bg-[#f4f4f4] hover:text-[#0a0a0b]"
              }`}
              onClick={() => {
                if (sectionType === "content") {
                  setContentOpenDropdown(contentOpenDropdown === "rating" ? null : "rating");
                } else {
                  setVideoOpenDropdown(videoOpenDropdown === "rating" ? null : "rating");
                }
              }}
            >
              <HiOutlineSquares2X2 /> Rating
            </button>
            {(sectionType === "content" && contentOpenDropdown === "rating") ||
            (sectionType === "video" && videoOpenDropdown === "rating") ? (
              <div className="absolute mt-2 bg-[#1c1d1f] p-2 rounded-[8px] flex flex-col gap-2 z-50">
                {renderStarRow(sectionType)}
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
    <>
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
          <button
            className="px-7 py-4 rounded-3xl border border-[#FFFFFF26] font-medium"
            onClick={handleOverallFeedbackClick}
          >
            Give Feedback
          </button>
          <button className="flex flex-row gap-2.5 px-7 py-4 rounded-3xl bg-white text-[#0a0a0b] text-xl font-bold items-center justify-center">
            <p className="text-base">Suggest More Tools</p>
            <LuRefreshCw />
          </button>
        </div>
      </div>

      {isModalOpen && <OverallFeedback onClose={handleCloseModal} />}
    </>
  );
}

export default Recommendations;
