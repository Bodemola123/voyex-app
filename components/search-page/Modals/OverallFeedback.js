"use client"
import Image from 'next/image';
import React, { useState } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';
import "../../../app/globals.css"
import { toast } from 'react-toastify';
import { SlClose } from 'react-icons/sl';
import { TbCalendarX } from 'react-icons/tb';
import { BsBarChart } from 'react-icons/bs';
import { IoWarningOutline } from 'react-icons/io5';


const OverallFeedback = ({onClose}) => {
  const [selectedReasons, setSelectedReasons] = useState([]);

const toggleReason = (reason) => {
  setSelectedReasons((prev) =>
    prev.includes(reason)
      ? prev.filter((r) => r !== reason)
      : [...prev, reason]
  );
};

const reasonOptions = [
  { label: "Inaccurate", icon: <SlClose className="text-2xl" /> },
  { label: "Out of date", icon: <TbCalendarX className="text-2xl" /> },
  { label: "Inconsistent Answers", icon: <BsBarChart className="text-2xl" /> },
  { label: "Wrong Information", icon: <IoWarningOutline className="text-2xl" /> },
];


      const [isSubmitting, setIsSubmitting] = useState(false);
      const [feedback, setFeedback] = useState("");

    
      const handleSubmit = () => {
        setIsSubmitting(true);
        setTimeout(() => {
          setIsSubmitting(false);
          toast.success("Feedback sent");
          onClose();
        }, 1500);
      };
  return (
    <div className="fixed inset-0 bg-[rgba(19,19,20,0.8)] flex items-center justify-center z-50">
      <div className="bg-[#1c1d1f] text-white rounded-[24px] gap-8 py-[30px] px-[29px] flex flex-col relative max-w-[623px]">
        {/* Header */}

          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
                <p className='text-2xl font-bold'>Help Us improve</p>
              <button onClick={onClose} className="flex items-center justify-center">
                <Image src={"/close-square.svg"} alt="Close" width={58} height={58} />
              </button>
            </div>   
              <div className="flex flex-col gap-4 justify-start items-start">
                <p className="font-bold text-base">
                How would you rate the overall recommendation process
                </p>
                <p className="font-medium text-base">
                We&apos;d love to hear what you think! Please take a moment to share your experience with voyex recommendations by leaving a review
                </p>
              </div>
<div className='flex flex-col gap-[11px] items-start'>
  <div className='flex flex-row gap-[11px] flex-wrap'>
    {reasonOptions.slice(0, 3).map((option) => (
      <button
        key={option.label}
        onClick={() => toggleReason(option.label)}
        className={`rounded-[28px] gap-2.5 flex flex-row items-center justify-center p-4
          ${
            selectedReasons.includes(option.label)
              ? "bg-[#f4f4f4] text-[#0a0a0b]"
              : "bg-[#0a0a0b] text-[#f4f4f4] hover:bg-[#f4f4f4] hover:text-[#0a0a0b]"
          }`}
      >
        {option.icon}
        <p className="text-base font-normal">{option.label}</p>
      </button>
    ))}
  </div>
  <button
    onClick={() => toggleReason("Wrong Information")}
    className={`rounded-[28px] gap-2.5 flex flex-row items-center justify-center p-4
      ${
        selectedReasons.includes("Wrong Information")
          ? "bg-[#f4f4f4] text-[#0a0a0b]"
          : "bg-[#0a0a0b] text-[#f4f4f4] hover:bg-[#f4f4f4] hover:text-[#0a0a0b]"
      }`}
  >
    <IoWarningOutline className="text-2xl" />
    <p className="text-base font-normal">Wrong Information</p>
  </button>
</div>

          </div>

        {/* Textarea */}
        <div className="flex flex-col gap-1.5">
          <p className="text-sm font-normal">Can you tell us more</p>
          <textarea
            placeholder="Add Feedback"
            className="px-4 py-[18px] resize-none rounded-[28px] placeholder:leading-none  bg-[#0a0a0b] text-[#FFFFFF] placeholder-[#FFFFFF] h-[153px] placeholder:text-base placeholder:font-normal font-normal text-base leading-none text-start outline-0 focus:ring-0"
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
  )
}

export default OverallFeedback
