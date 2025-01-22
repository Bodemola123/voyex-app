import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const ResetVerifyOTP = ({ userEmail }) => {
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
  };

  const maskEmail = (email) => {
    if (!email) return "Invalid email"; // Handle undefined or null email
    const [localPart, domain] = email.split("@");
    if (!domain) return "Invalid email"; // Handle cases where split fails
    return `${localPart}@${domain}`;
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <div className="bg-[#000000] p-[26px] max-w-lg w-full rounded-[41px]">
        <div className="flex flex-col gap-7 items-center justify-center">
          {/* Loading Animation */}
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
            Verify Email Authentication
          </h2>

          {/* Email Information */}
          <p className="text-base text-center text-[#f4f4f4]">
            We&apos;ve sent a mail with an activation code to your email
            <br />
            <span className="font-bold">{maskEmail(userEmail)}</span>
          </p>

          {/* OTP Inputs */}
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

          {/* Resend Timer */}
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

          {/* Proceed to ResetPassword */}
          <Link href="/ResetPasswordHome">
            <button
              className="w-full bg-[#c088fb] text-[#131314] text-lg font-medium py-2 rounded-3xl"
              disabled={otp.some((digit) => digit === "")} // Disable if OTP is incomplete
            >
              Verify OTP
            </button>
          </Link>

          {/* Return to Login */}
          <p className="text-center mb-4 text-[#f4f4f4]">
            Remember Password?{" "}
            <Link href="/Signing">
              <span className="text-[#c088fb] cursor-pointer hover:underline">
                Login
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetVerifyOTP;
