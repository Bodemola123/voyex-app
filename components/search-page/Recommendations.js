"use client";
import { MdKeyboardArrowLeft } from "react-icons/md";

function Recommendations({ onBack }) {
  return (
    <div className="flex flex-col items-center w-[900px] h-full bg-[#131314] p-6">
      {/* Back Button */}
      <button
        className="w-[48px] h-[32px] border border-card gap-2.5 flex items-center justify-center rounded-lg"
        onClick={onBack} // Go back to chat
      >
        <MdKeyboardArrowLeft className="text-white text-[24px]" />
      </button>

      {/* Recommendation Content */}
      <div className="mt-4 text-white text-lg">Your Recommendations</div>
    </div>
  );
}

export default Recommendations;
