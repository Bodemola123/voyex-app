"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

function AccountError({ setCurrentSlide }) {
  const router = useRouter();
  return (
    <main className="relative max-w-[666px] w-full h-[600px] z-[2] p-6 rounded-[29px] bg-[#1c1d1f] overflow-y-scroll border border-[#D0D5DD1A]">
      <div className=" flex flex-col items-center justify-center gap-7 h-full">
        <Image
          src="/loading.png"
          alt="loading"
          width={136}
          height={136}
          className=""
        />
        <h1 className="text-red-500 text-3xl font-bold text-center">
          Account Creation Failed
        </h1>
        <p className="text-base text-fontlight text-center font-light">
          Your account was not created
          <br /> successfully
        </p>
        <div className="flex items-center justify-center max-w-[400px] w-full">
          {/* <button className="text-base text-fontlight font-medium rounded-[25px] px-6 py-3 border  border-card">
            Skip
          </button> */}
          <button
            className="text-base text-fontlight font-medium rounded-[25px] px-6 py-3 border border-card"
            onClick={() => setCurrentSlide("basic-info")}
          >
            Return
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

export default AccountError;
