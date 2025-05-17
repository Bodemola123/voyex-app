import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { TbLockExclamation } from "react-icons/tb";
import { IoArrowBackOutline } from "react-icons/io5";

function ForgotPassword({
  setCurrentSlide,
  setForgotEmail,
  handleUserForgotPassword,
  loading,
}) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleUserForgotPassword();
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50">
      <div className="bg-[#1C1D1F] rounded-[29px] p-10 max-w-[665px] w-full h-[600px] relative flex justify-center items-center flex-col border border-[#D0D5DD1A]">
        <button
          className="absolute top-6 left-6 text-2xl font-bold p-2 bg-purple bg-opacity-0 hover:bg-opacity-20 rounded-xl text-white transition-opacity duration-800"
          onClick={() => setCurrentSlide("signing")}
        >
          <IoArrowBackOutline />
        </button>
        <TbLockExclamation className="text-[7rem] text-purple" />
        <h2 className="text-2xl font-medium text-center mt-5 text-[#f4f4f4]">
          Forgot Password
        </h2>
        <p className="text-base text-center mt-1 text-[#f4f4f4]">
          Enter your email address below, and we&apos;ll send you a<br /> code
          to reset your password.
        </p>
        <div className="flex flex-col w-full space-y-5 mt-5 mx-auto">
          <div className="space-y-1 max-w-[402px] w-full mx-auto">
            <Label htmlFor="email" className="text-fontlight font-normal">
              Email address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter email"
              // value={email}
              onChange={(e) => setForgotEmail(e.target.value)}
              onKeyDown={handleKeyDown} // Detect Enter key press
              className="rounded-[28px] bg-card/30 border-none placeholder:text-fontlight/20 text-fontlight h-[56px]"
            />
          </div>
          <Button
            className="text-[#131314] font-medium h-[56px] bg-purple hover:bg-purple/70 max-w-[402px] w-full mx-auto rounded-[33px]"
            disabled={loading}
            onClick={handleUserForgotPassword}
          >
            {loading ? (
              <AiOutlineLoading3Quarters className="animate-spin text-black" />
            ) : (
              "Send reset code"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
