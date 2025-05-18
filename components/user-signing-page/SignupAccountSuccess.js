import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { FiCheckCircle } from "react-icons/fi";

function SignupAccountSuccess({ setCurrentSlide }) {
  const router = useRouter();
  return (
    <main className="relative max-w-[666px] w-full h-[600px] z-[2] p-6 rounded-[29px] bg-[#1C1D1F] border border-[#D0D5DD1A] overflow-y-scroll">
      <div className=" flex flex-col items-center justify-center gap-7 h-full">
        <FiCheckCircle className="text-9xl text-green-500" />
        <h1 className="text-fontlight text-3xl font-bold text-center">
          Account Created
        </h1>
        <p className="text-base text-fontlight text-center font-light">
          Your account has been created
          <br /> successfully
        </p>
        <div className="flex items-center max-w-[400px] justify-between w-full">
           <button className="text-base text-fontlight font-medium rounded-[25px] px-5 py-2.5 border  border-card"   onClick={() => {
    setCurrentSlide(""); // Reset to default or an initial state
    router.push("/search");
  }}>
            Skip
          </button>
          <button
            className="text-base text-black font-medium rounded-[25px] px-5 py-2.5 bg-purple hover:bg-purple/70 transition-all"
            onClick={() => setCurrentSlide("user-upload-details")}
          >
            Upload Info
          </button>
        </div>
      </div>
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center justify-center gap-3 text-base font-normal text-purple">
        <a href="https://voyex-landing.vercel.app/terms" target="_blank" rel="noopener noreferrer">
          Terms of use
        </a>
        <a href="https://voyex-landing.vercel.app/privacy" target="_blank" rel="noopener noreferrer">
          Privacy Policy
        </a>
      </div>
    </main>
  );
}

export default SignupAccountSuccess;
