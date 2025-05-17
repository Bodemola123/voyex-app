"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from 'react-toastify';
import "../../../app/globals.css"

const ProductFeedback = ({ product, onClose }) => {
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [lastClickedStar, setLastClickedStar] = useState(null);

  const handleRatingClick = (value) => {
    if (lastClickedStar === value) {
      setRating(value - 0.5);
    } else {
      setRating(value);
    }
    setLastClickedStar(value);
    setSubmitted(true);
  };

  const renderStars = (value, size = "text-[55px]") => {
    return (
      <div className="flex flex-row gap-2 items-center justify-center text-[#FCD53F]">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star}>
            {value >= star ? (
              <FaStar className={size} />
            ) : value >= star - 0.5 ? (
              <FaStarHalfAlt className={size} />
            ) : (
              <FaRegStar className={size} />
            )}
          </span>
        ))}
      </div>
    );
  };
  

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Feedback sent");
      onClose();
    }, 1500);
  };

  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-[rgba(19,19,20,0.8)] flex items-center justify-center z-50">
      <div className="bg-[#1C1D1F] border border-[#D0D5DD1A] text-white rounded-[24px] gap-8 py-[30px] px-[29px] flex flex-col relative max-w-[513px]">
        {/* Header */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <div className="flex flex-row justify-center items-center gap-2">
                <Image src={"/BigChatGPT.svg"} alt="image" width={78} height={78} />
                <h2 className="text-2xl font-bold">ChatGPT</h2>
              </div>
              <button onClick={onClose} className="flex items-center justify-center">
                <Image src={"/close-square.svg"} alt="Close" width={58} height={58} />
              </button>
            </div>

            {/* Conditional Content */}
            {!submitted ? (
              <div className="flex flex-col gap-4 justify-start items-start">
                <p className="font-bold text-base">
                  Was the tool able to get your work done?
                </p>
                <p className="font-medium text-base">
                  We&apos;d love to hear what you think! Please take a moment to share your experience with ChatGPT by leaving a review
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-4 text-center items-center justify-center">
                <p className="font-bold text-base">Thank you</p>
                <p className="font-medium text-base">
                  We appreciate your feedback. We will continue to improve Voyex to better serve our customers
                </p>
              </div>
            )}

            {/* Star Ratings */}
            {!submitted ? (
              <div className="flex flex-row gap-8 items-center justify-center text-[#FCD53F]">
                {[1, 2, 3, 4, 5].map((val) => (
                  <button key={val} onClick={() => handleRatingClick(val)}>
                    <FaRegStar className="text-[55px]" />
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-2">
                <p className="text-[66px] font-bold">{rating}</p>
                <div className="text-base">
                {renderStars(rating, "text-[20px]")}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Textarea */}
        <div className="flex flex-col gap-1.5">
          <p className="text-sm font-normal">Can you tell us more</p>
          <textarea
            placeholder="Add Feedback"
            className="px-4 py-[18px] resize-none rounded-[28px] bg-[#0a0a0b] text-[#FFFFFF] placeholder-[#FFFFFF] h-[153px] placeholder:text-base placeholder:font-normal font-normal text-base placeholder:leading-none leading-none text-start outline-0 focus:ring-0"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-transparent text-white rounded-[25px] hover:bg-gray-600 border border-[#FFFFFF26] transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || feedback.trim() === ""}
            className={`px-5 py-2.5 rounded-[25px] text-base font-medium transition flex items-center gap-2 ${
                isSubmitting || feedback.trim() === ""
                  ? "bg-purple/70 text-[#0a0a0b]"
                  : "bg-[#c088fb] text-[#0a0a0b]"
              }`}
          >
            {isSubmitting ? (
              <>
                <AiOutlineLoading3Quarters className="animate-spin" />
                Sending...
              </>
            ) : (
              "Submit Feedback"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductFeedback;
