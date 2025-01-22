import React, { useState } from "react";
import VerifyEmailAuthentication from "./VerifyEmailAuthentication";

const ForgotPassword = ({ onClose }) => {
  const [showVerifyEmail, setShowVerifyEmail] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSendCode = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setShowVerifyEmail(true);
  };

  if (showVerifyEmail) {
    return <VerifyEmailAuthentication onClose={onClose} userEmail={email} />;
  }

  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black/50 z-50"
    >
      <div
        className="bg-[#000000] rounded-lg p-6 max-w-sm w-full relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-2xl font-bold text-[#ffffff]"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-lg font-bold text-center mb-4 text-[#f4f4f4]">
          Forgot Password
        </h2>
        <p className="text-sm text-center mb-4 text-[#f4f4f4]">
          Enter your email address below, and we&apos;ll send you a code to reset
          your password.
        </p>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
          className="w-full p-2 rounded-3xl mb-4 text-[#000000] placeholder:text-grey focus:outline-none focus:ring-0"
        />
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <button
          className="w-full bg-[#c088fb] text-[#131314] text-lg font-medium py-2 rounded-3xl"
          onClick={handleSendCode}
        >
          Send Reset Code
        </button>
      </div>
    </div>
  );
}

export default ForgotPassword;
