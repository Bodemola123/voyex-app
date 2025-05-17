import Image from "next/image";
import React from "react";
import { FiCheckCircle } from "react-icons/fi";

function PasswordChanged({ setCurrentSlide }) {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center">
      <div
        className="bg-[#1C1D1F] p-[26px] max-w-[665px] w-full h-[600px] relative rounded-[41px] flex flex-col items-center justify-center gap-[43px] border border-[#D0D5DD1A]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Circular Loading Animation */}
        <div className="flex justify-center items-center mt-4">
          <FiCheckCircle className="text-9xl text-green-500" />
        </div>
        <div className="flex flex-col gap-4">
          {/* Title */}
          <h2 className="text-3xl font-bold text-center text-[#f4f4f4]">
            Password Updated
          </h2>

          {/* Subtext */}
          <p className="text-center text-[#f4f4f4]">
            Your password has been changed
            <br /> successfully.
          </p>
        </div>

        {/* Return to Login Button */}
        <button
          onClick={() => setCurrentSlide("signing")}
          className="w-full max-w-[382px] bg-[#c088fb] text-black font-medium text-lg py-3 px-[100px] rounded-[33px] hover:bg-[#b270fb] transition-all"
        >
          Return to Sign in
        </button>
      </div>
    </div>
  );
}

export default PasswordChanged;
