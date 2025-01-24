import React, { useState } from "react";
import Link from "next/link";

const ForgotPasswordHome = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSendCode = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    // If valid, the user can click the Link to proceed to ResetVerifyOTP
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <div className="bg-[#000000] rounded-lg p-6 max-w-sm w-full relative">
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

        {/* Link Button */}
        <Link
          href={{
            pathname: "/ResetVerifyOTP",
            query: { userEmail: email }, // Pass the email as a query parameter
          }}
        >
          <button
            className="w-full bg-[#c088fb] text-[#131314] text-lg font-medium py-2 rounded-3xl"
            onClick={handleSendCode}
            disabled={!email || error} // Disable button if invalid input
          >
            Send Reset Code
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ForgotPasswordHome;
