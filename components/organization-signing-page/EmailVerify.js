"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

function EmailVerify({
  value,
  setValue,
  loading,
  otpError,
  mins,
  secs,
  handleOrgResendOtp,
}) {
  useEffect(() => {
    localStorage.getItem("email") ? localStorage.getItem("email") : null;
  }, []);
  const first = localStorage.getItem("email").slice(0, 3);
  const last = localStorage.getItem("email").slice(13);

  /////// resend otp code if...
const elapsed = mins !== "00" || secs !== "00";

  return (
    <main className="relative max-w-[666px] w-full h-[600px] z-[2] p-6 rounded-[29px] bg-[#1C1D1F] border border-[#D0D5DD1A] overflow-y-scroll shadow-1s">
      <div className=" flex flex-col items-center justify-center gap-7 h-full">
        <div
          className={`w-28 h-28 border-[7px] border-t-purple border-r-purple border-b-purple border-purple/30 rounded-full animate-spin`}
        ></div>
        <h1 className="text-fontlight text-3xl font-bold text-center">
          Verify Email Authentication
        </h1>
        <p className="text-base text-fontlight text-center font-normal">
          We&apos;ve sent a mail with an activation code
          <br /> to your email
          <span className="font-bold ml-2">{first + "***" + last}</span>
        </p>
        <InputOTP
          maxLength={6}
          value={value}
          onChange={(value) => setValue(value)}
        >
          <InputOTPGroup className="gap-2 w-full justify-center">
            <InputOTPSlot
              index={0}
              className={`h-[60px] w-[90px] bg-[#0A0A0B]  rounded-[18px] p-4 text-3xl text-center  transition-opacity focus:outline-none focus:border-none outline-none focus:shadow-none${
                otpError && "border-opacity-100 text-red-500 border-red-500"
              }`}
            />
            <InputOTPSlot
              index={1}
              className={`h-[60px] w-[90px] bg-[#0A0A0B]  rounded-[18px] p-4 text-3xl text-center transition-opacity focus:outline-none focus:border-none outline-none focus:shadow-none${
                otpError && "border-opacity-100 text-red-500 border-red-500"
              }`}
            />
            <InputOTPSlot
              index={2}
              className={`h-[60px] w-[90px] bg-[#0A0A0B]  rounded-[18px] p-4 text-3xl text-center  transition-opacity focus:outline-none focus:border-none outline-none focus:shadow-none${
                otpError && "border-opacity-100 text-red-500 border-red-500"
              }`}
            />
            <InputOTPSlot
              index={3}
              className={`h-[60px] w-[90px] bg-[#0A0A0B]  rounded-[18px] p-4 text-3xl text-center transition-opacity focus:outline-none focus:border-none outline-none focus:shadow-none${
                otpError && "border-opacity-100 text-red-500 border-red-500"
              }`}
            />
            <InputOTPSlot
              index={4}
              className={`h-[60px] w-[90px] bg-[#0A0A0B]  rounded-[18px] p-4 text-3xl text-center  transition-opacity focus:outline-none focus:border-none outline-none focus:shadow-none${
                otpError && "border-opacity-100 text-red-500 border-red-500"
              }`}
            />
            <InputOTPSlot
              index={5}
              className={`h-[60px] w-[90px] bg-[#0A0A0B]  rounded-[18px] p-4 text-3xl text-center  transition-opacity focus:outline-none focus:border-none outline-none focus:shadow-none ${
                otpError && "border-opacity-100 text-red-500 border-red-500"
              }`}
            />
          </InputOTPGroup>
        </InputOTP>
{/* Timer / Resend OTP UI */}
<div className="flex items-center gap-2 text-base text-fontlight font-medium">
  {mins === "00" && secs === "00" ? (
    <button
      className="hover:underline transition-all duration-300"
      onClick={handleOrgResendOtp}
    >
      Send code again
    </button>
  ) : (
    <>
      <span>Time left:</span>
      <span className="text-purple font-normal">{`${mins} : ${secs}`}</span>
    </>
  )}
</div>

        <p
          className={`text-[#F54135] text-base font-normal ${
            otpError ? "opacity-100" : "opacity-0"
          }`}
        >
          Wrong code, please try again
        </p>
      </div>
      {/* <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center justify-center gap-3 text-base font-normal text-purple">
        <a href="https://voyex-landing.vercel.app/terms" target="_blank" rel="noopener noreferrer">
          Terms of use
        </a>
        <a href="https://voyex-landing.vercel.app/privacy" target="_blank" rel="noopener noreferrer">
          Privacy Policy
        </a>
      </div> */}
    </main>
  );
}

export default EmailVerify;
