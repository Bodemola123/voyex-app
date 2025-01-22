import React, { useState } from "react";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ResetPasswordHome = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true); // Password is visible by default
  const [error, setError] = useState("");

  const handlePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const validatePassword = (password) => {
    const hasNumber = /\d/; // Check for a digit
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/; // Check for special characters
    const hasUpperCase = /[A-Z]/; // Check for uppercase letters

    if (!hasNumber.test(password)) {
      return "Password must contain at least one number.";
    }
    if (!hasSpecialChar.test(password)) {
      return "Password must contain at least one special character.";
    }
    if (!hasUpperCase.test(password)) {
      return "Password must contain at least one uppercase letter.";
    }
    if (password.length < 8) {
      return "Password must be at least 8 characters long.";
    }
    return null; // No errors
  };

  const handleResetPassword = () => {
    // Validate the password
    const validationError = validatePassword(password);
    if (validationError) {
      setError(validationError);
      return;
    }

    // Confirm passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Clear the error if validation passes
    setError("");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <div className="bg-[#000000] p-[26px] max-w-lg w-full rounded-[41px] flex flex-col gap-4">
        <h2 className="text-3xl font-bold text-center text-[#f4f4f4]">
          Reset Password
        </h2>

        {error && <p className="text-center text-red-500 mt-4">{error}</p>}

        <div className="mt-6">
          <label className="block text-[#f4f4f4] mb-2">New Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-[28px] bg-[#0a0a0b] text-[#f4f4f4] focus:ring-0 focus:outline-none"
              placeholder="Enter new password"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#f4f4f4] focus:ring-0 focus:outline-none"
              onClick={handlePasswordVisibility}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-[#f4f4f4] mb-2">Confirm New Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 rounded-[28px] bg-[#0a0a0b] text-[#f4f4f4] focus:ring-0 focus:outline-none"
              placeholder="Confirm new password"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#f4f4f4] focus:ring-0 focus:outline-none"
              onClick={handlePasswordVisibility}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        <Link
          href="/PasswordChangedHome"
          passHref
          onClick={(e) => {
            if (error) {
              e.preventDefault();
            } else {
              handleResetPassword();
            }
          }}
        >
          <button
            className="w-full bg-[#c088fb] text-[#131314] font-bold p-3 rounded-[33px] mt-6"
            disabled={error || !password || !confirmPassword} // Disable if any field is empty or validation fails
          >
            Reset Password
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ResetPasswordHome;
