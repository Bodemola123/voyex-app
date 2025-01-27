import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function ForgotPassword({ setCurrentSlide }) {
  const [email, setEmail] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  const handleSendCode = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Invalid email format. Please enter a valid email address.");
      return;
    }
  
    setIsVerifying(true);
  
    try {
      // Save email in localStorage
      localStorage.setItem("user_email", email);
  
      // Send OTP to the email
      const sendOtpResponse = await axios.post(
        "https://xi92wp7t87.execute-api.eu-north-1.amazonaws.com/default/voyex_otp",
        { email }
      );
  
      if (sendOtpResponse.status === 200) {
        toast.success("OTP sent successfully! Please check your email.");
        setCurrentSlide("reset-verifyotp");  // Pass control to OTP verification screen
      } else {
        toast.error("Failed to send OTP. Please try again.");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while verifying the email. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };
  

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black/50 z-50">
      <ToastContainer />
      <div className="bg-[#000000] rounded-lg p-[70px] max-w-[665px] w-full h-[600px] relative flex justify-center items-center flex-col">
        <button
          className="absolute top-2 right-6 text-2xl font-bold text-white"
          onClick={() => setCurrentSlide("forgot-password-home")}
        >
          &times;
        </button>
        <h2 className="text-lg font-bold text-center mb-4 text-[#f4f4f4]">Forgot Password</h2>
        <p className="text-sm text-center mb-4 text-[#f4f4f4]">
          Enter your email address below, and we&apos;ll send you a code to reset your password.
        </p>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
          className="w-full max-w-[402px] p-2 rounded-3xl mb-4 text-[#000000] placeholder:text-grey focus:outline-none focus:ring-0"
        />
        <button
          className="w-full max-w-[402px] bg-[#c088fb] text-[#131314] text-lg font-medium py-2 rounded-3xl"
          onClick={handleSendCode}
          disabled={isVerifying}
        >
          {isVerifying ? "Verifying..." : "Send Reset Code"}
        </button>
      </div>
    </div>
  );
}

export default ForgotPassword;
