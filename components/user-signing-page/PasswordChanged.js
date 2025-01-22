import Image from "next/image";
import React from "react";

const PasswordChanged= ({ onClose }) =>{
  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black/50 z-50"
    >
      <div
        className="bg-[#000000] p-[26px] max-w-lg w-full relative rounded-[41px] flex flex-col items-center gap-[43px]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Circular Loading Animation */}
          <div className="flex justify-center items-center mt-4">
            <Image
              src="/loading.png"
              alt="loading"
              width={120}
              height={120}
              className="animate-spin"
            />
          </div>
          <div className="flex flex-col gap-4">
        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-[#f4f4f4]">
          Password Changed
        </h2>

        {/* Subtext */}
        <p className="text-center text-[#f4f4f4]">
          Your password has been changed successfully.
        </p>
          </div>

        {/* Return to Login Button */}
        <button
          onClick={onClose}
          className="w-full bg-[#c088fb] text-[#131314] font-medium text-lg py-3 px-[100px] rounded-[33px] hover:bg-[#b270fb] transition-all"
        >
          Return to Login
        </button>
      </div>
    </div>
  );
}

export default PasswordChanged;
