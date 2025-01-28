import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";

function VerifyEmailAuthentication({ setCurrentSlide }) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(120); // 2 minutes timer
  const emailAddress = localStorage.getItem("user_email"); // Retrieve email from localStorage
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleResend = async () => {
    if (timer <= 0) {
      setTimer(120); // Reset timer to 2 minutes
    }

    try {
      // Resend OTP
      const sendOtpResponse = await axios.post(
        "https://xi92wp7t87.execute-api.eu-north-1.amazonaws.com/default/voyex_otp",
        { email: emailAddress }
      );

      if (sendOtpResponse.status === 200) {
        toast.success("OTP resent successfully! Please check your email.");
      } else {
        toast.error("Failed to resend OTP. Please try again.");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while resending OTP. Please try again.");
    }
  };

  const maskEmail = (email) => {
    if (!email) return "Invalid email"; // Handle undefined or null email
    const [localPart, domain] = email.split("@");
    if (!domain) return "Invalid email"; // Handle cases where split fails
    const maskedLocal = localPart[0] + "*".repeat(localPart.length - 1);
    return `${maskedLocal}@${domain}`;
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleOtpChange = (value, index) => {
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "ArrowRight" && index < otp.length - 1) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
    if (e.key === "ArrowLeft" && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
    if (e.key === "Enter" && otp.every((digit) => digit.trim() !== "")) {
      verifyOtp();
    }
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  const isOtpComplete = otp.every((digit) => digit.trim() !== "");

  // OTP verification logic
  const verifyOtp = async () => {
    if (!isOtpComplete) {
      toast.error("Please enter the complete OTP.");
      return;
    }

    setIsVerifying(true);

    const otpValue = otp.join(""); // Combine OTP digits into a single string
    try {
      // API call to verify OTP
      const verifyOtpResponse = await axios.get(
        `https://xi92wp7t87.execute-api.eu-north-1.amazonaws.com/default/voyex_otp?email=${emailAddress}&otp=${otpValue}`
      );

      if (verifyOtpResponse.status === 200) {
        toast.success("OTP verification successful! You can now reset your password.");
        setCurrentSlide("reset-password"); // Move to password reset page
      } else {
        toast.error("OTP is incorrect or expired. Please try again.");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while verifying the OTP. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black/50 z-50">
      <ToastContainer />
      <div className="bg-[#000000] p-[26px] max-w-[665px] w-full h-[600px] relative rounded-[41px]">
        <button
          className="absolute top-2 right-6 text-2xl font-bold text-white"
          onClick={() => setCurrentSlide("forgot-password-home")}
        >
          &times;
        </button>
        <div className="flex flex-col gap-7 items-center justify-center">
          <div className="flex justify-center items-center mt-2">
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
            <span className="font-bold">{maskEmail(emailAddress)}</span>
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
                onKeyDown={(e) => handleKeyDown(e, index)} // Handle keydown event
                className="w-16 h-16 text-center text-[#f4f4f4] rounded-[28px] bg-[#0a0a0b] focus:ring-0 focus:outline-none"
              />
            ))}
          </div>
          {timer > 0 ? (
            <button className="text-base font-medium text-white">
              Send code again <span className="text-[#c088fb]">{formatTime(timer)}</span>
            </button>
          ) : (
            <button
              className="text-base font-medium text-[#c088fb] hover:underline"
              onClick={handleResend}
            >
              Resend code
            </button>
          )}
          <button
            className={`w-full ${isOtpComplete ? "bg-[#c088fb]" : "bg-purple/50"} text-[#131314] font-bold p-3 rounded-[33px] mt-3`}
            onClick={verifyOtp}
            disabled={isVerifying || !isOtpComplete}
          >
            {isVerifying ? "Verifying..." : "Continue to Reset Password"}
          </button>
          <p className="text-center mb-4 text-[#f4f4f4]">
            Remember Password?{" "}
            <span className="text-[#c088fb] cursor-pointer" onClick={() => setCurrentSlide("signing")}>
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default VerifyEmailAuthentication;
