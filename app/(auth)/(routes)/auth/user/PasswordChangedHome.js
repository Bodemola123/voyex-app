import React from "react";
import Link from "next/link";
import Image from "next/image";

const PasswordChangedHome = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <div className="bg-[#000000] p-[26px] max-w-lg w-full rounded-[41px] flex flex-col items-center gap-[43px]">
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

        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-[#f4f4f4]">
          Password Changed
        </h2>

        {/* Subtext */}
        <p className="text-center text-[#f4f4f4]">
          Your password has been changed successfully.
        </p>

        {/* Return to Login Button */}
        <Link href="/Signing" passHref>
          <button className="w-full bg-[#c088fb] text-[#131314] font-medium text-lg py-3 px-[100px] rounded-[33px] hover:bg-[#b270fb] transition-all">
            Return to Login
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PasswordChangedHome;
