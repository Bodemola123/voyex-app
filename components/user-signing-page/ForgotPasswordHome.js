import React, { useState } from "react";

function ForgotPassword({ setCurrentSlide, setEmailAddress }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false); // To handle loading state

  const handleSendCode = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError(""); // Clear any existing errors
    setIsVerifying(true); // Set loading state

    try {
      // Call Hunter.io API
      const response = await fetch(
        `https://api.hunter.io/v2/email-verifier?email=${email}&api_key=96038781561cc3023000da4e3dbd7478d113e249`
      );
      const data = await response.json();

      if (response.ok && data.data && data.data.result === "deliverable") {
        // Email is valid and exists
        setEmailAddress(email); // Save the email to the parent state
        setCurrentSlide("reset-verifyotp"); // Navigate to ResetVerifyOTP
      } else {
        // Invalid email or not deliverable
        setError("The email address is invalid or does not exist.");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while verifying the email. Please try again.");
    } finally {
      setIsVerifying(false); // Reset loading state
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black/50 z-50">
      <div className="bg-[#000000] rounded-lg p-[70px] max-w-[665px] w-full h-[600px] relative flex justify-center items-center flex-col">
        <button
          className="absolute top-2 right-2 text-2xl font-bold text-[#ffffff]"
          onClick={() => setCurrentSlide("signing")}
        >
          &times;
        </button>
        <h2 className="text-lg font-bold text-center mb-4 text-[#f4f4f4]">
          Forgot Password
        </h2>
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
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <button
          className="w-full max-w-[402px] bg-[#c088fb] text-[#131314] text-lg font-medium py-2 rounded-3xl"
          onClick={handleSendCode}
          disabled={isVerifying} // Disable button while verifying
        >
          {isVerifying ? "Verifying..." : "Send Reset Code"}
        </button>
      </div>
    </div>
  );
}

export default ForgotPassword;
