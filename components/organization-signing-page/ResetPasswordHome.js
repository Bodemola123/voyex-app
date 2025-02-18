"use client";

import axios from "axios";
import React, { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import { Button } from "../ui/button";
import { LuFolderKey } from "react-icons/lu";

function ResetPassword({ setCurrentSlide }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Toggle for the password field
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Toggle for the confirm password field
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
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

  const handleResetPassword = async () => {
    const validationError = validatePassword(password);
    try {
      // Validate the password
      if (validationError) {
        // setError(validationError);
        toast(validationError);
        return;
      }
      // Confirm passwords match
      if (password !== confirmPassword) {
        // setError("Passwords do not match.");
        toast("Passwords do not match");
        return;
      }

      /////////// if password passes? push to api
      //  validation passes

      setLoading(true);
      /////////////// check if otp is legit from email //////////////////
      const response = await axios.put(
        `https://p2xeehk5x9.execute-api.ap-southeast-2.amazonaws.com/default/org_voyex_api`,
        {
          email: localStorage.getItem("reset_password_email"),
          password: confirmPassword,
          action: "password_reset",
        }
      );
      console.log("PasswordReset 🚨🚨🚨", response);
      if (response.status === 200) {
        // toast(response.data.message);
        toast("Password reset");
        setCurrentSlide("password-changed"); // Navigate to PasswordChangedHome
      }
    } catch (error) {
      console.log(error);
      if (error.response?.data?.error) {
        toast(error.response.data.error);
      } else toast(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center">
      <div className="bg-[#000000] p-[26px] max-w-[665px] w-full h-[600px] relative rounded-[41px] flex flex-col gap-4 justify-center items-center shadow-1s">
        <LuFolderKey className="text-[7rem] text-purple" />
        <h2 className="text-3xl font-bold text-center text-[#f4f4f4]">
          Reset Password
        </h2>

        {/* {error && <p className="text-center text-red-500 mt-4">{error}</p>} */}

        <div className="mt-5">
          <label className="block text-[#f4f4f4] mb-2">New Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-[402px] h-[56px] p-3 rounded-[28px] bg-[#0a0a0b] text-[#f4f4f4] focus:ring-0 focus:outline-none"
              placeholder="Enter new password"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple focus:ring-0 focus:outline-none"
              onClick={handlePasswordVisibility}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        <div className="mt-5">
          <label className="block text-[#f4f4f4] mb-2">
            Confirm New Password
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="p-3 w-[402px] h-[56px] rounded-[28px] bg-[#0a0a0b] text-[#f4f4f4] focus:ring-0 focus:outline-none"
              placeholder="Confirm new password"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple focus:ring-0 focus:outline-none"
              onClick={handleConfirmPasswordVisibility}
              aria-label={
                showConfirmPassword
                  ? "Hide confirm password"
                  : "Show confirm password"
              }
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        <Button
          className=" text-black text-base font-medium h-[56px] bg-purple hover:bg-purple/70 transition-all w-full max-w-[402px] rounded-[33px] mt-5"
          disabled={loading}
          onClick={handleResetPassword}
        >
          {loading ? (
            <AiOutlineLoading3Quarters className="animate-spin text-black" />
          ) : (
            "Reset Password"
          )}
        </Button>
      </div>
    </div>
  );
}

export default ResetPassword;
