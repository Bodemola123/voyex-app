import React, { useState, useEffect } from "react";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword"; // Import the ResetPassword modal
import Image from "next/image";

const VerifyEmailAuthentication = ({ onClose, userEmail }) => {
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(20);

  // Timer logic
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleResend = () => {
    setTimer(20); // Reset timer to 20 seconds
  };

  const handleOtpChange = (value, index) => {
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    // Automatically focus on the next input if a value is entered
    if (value && index < 3) {
      document.getElementById(`otp-${index + 1}`).focus();
    }

    // Check if all OTP fields are filled
    if (updatedOtp.every((digit) => digit !== "")) {
      setTimeout(() => setShowResetPassword(true), 200); // Navigate to Reset Password modal
    }
  };

  const maskEmail = (email) => {
    if (!email) return "Invalid email"; // Handle undefined or null email
    const [localPart, domain] = email.split("@");
    if (!domain) return "Invalid email"; // Handle cases where split fails
    return `${localPart}@${domain}`;
  };

  if (showForgotPassword) {
    return <ForgotPassword onClose={onClose} />;
  }

  if (showResetPassword) {
    return <ResetPassword onClose={onClose} />;
  }

  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black/50 z-50"
    >
      <div
        className="bg-[#000000] p-[26px] max-w-lg w-full relative rounded-[41px]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-2xl font-bold text-white"
          onClick={() => setShowForgotPassword(true)}
        >
          &times;
        </button>
        <div className="flex flex-col gap-7 items-center justify-center">
          <div className="flex justify-center items-center mt-4">
            <Image
              src="/loading.png"
              alt="loading"
              width={120}
              height={120}
              className="animate-spin"
            />
          </div>
          <h2 className="text-3xl font-bold text-center text-[#f4f4f4]">
            Verify Email Authentication
          </h2>
          <p className="text-base text-center text-[#f4f4f4]">
            We&apos;ve sent a mail with an activation code to your email
            <br />
            <span className="font-bold">{maskEmail(userEmail)}</span>
          </p>
          <div className="flex justify-center gap-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleOtpChange(e.target.value, index)}
                className="w-16 h-16 text-center text-[#f4f4f4] rounded-[28px] bg-[#0a0a0b] focus:ring-0 focus:outline-none"
              />
            ))}
          </div>
          {timer > 0 ? (
            <button className="text-base font-medium text-white">
              Send code again{" "}
              <span className="text-[#c088fb]">00:{timer.toString().padStart(2, "0")}</span>
            </button>
          ) : (
            <button
              className="text-base font-medium text-[#c088fb] hover:underline"
              onClick={handleResend}
            >
              Resend code
            </button>
          )}
          <p className="text-center mb-4 text-[#f4f4f4]">
            Remember Password?{" "}
            <span className="text-[#c088fb] cursor-pointer" onClick={onClose}>
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default VerifyEmailAuthentication;
