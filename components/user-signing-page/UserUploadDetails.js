"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import BasicInfoContainer from "./BasicInfoContainer";
import axios from "axios";
import UserUploadLoading from "./UserUploadLoading";
import UserUploadSuccess from "./UserUploadSuccess";
import UserPurpose from "./UserPurpose";

function UserUploadDetails({ setUserDisplay }) {
  const [userFullName, setUserFullName] = useState("");
  const [userLanguage, setUserLanguage] = useState("");
  const [skillLevel, setSkillLevel] = useState("");
  const [userCountry, setUserCountry] = useState("");
  const [clickedButtons, setClickedButtons] = useState([]);

  const [loading, setLoading] = useState(false);
  const [currentSlide, setCurrentSlide] = useState("basic-info");

  const usage = [
    { name: "conversation" },
    { name: "business" },
    { name: "exams" },
    { name: "marketing" },
    { name: "content creation" },
    { name: "programming" },
    { name: "writing" },
    { name: "vocabulary" },
    { name: "pronounciation" },
    { name: "training" },
    { name: "presentation" },
    { name: "research" },
    { name: "daily" },
    { name: "formal" },
    { name: "feedback" },
    { name: "automation" },
    { name: "experimentation" },
    { name: "analysis" },
    { name: "insights" },
  ];

  ///////////////// HANDLE USER PURPOSE SELECT ///////////////
  const handleButtonClick = (buttonName) => {
    setClickedButtons(
      (prevState) =>
        prevState.includes(buttonName)
          ? prevState.filter((name) => name !== buttonName) // Remove the button name if it exists
          : [...prevState, buttonName] // Add the button name if it doesn't exist
    );
  };
  console.log(clickedButtons);

  //////////////// USER UPLOAD DETAILS /////////////////////////////////
  const handleBasicInfoSlide = () => {
    if (!userFullName || !userLanguage || !skillLevel || !userCountry) {
      toast.warn("complete all fields!!!");
      return;
    } else setCurrentSlide("user-purpose");
  };

  // Token expiry and retry logic
  const uploadDetails = async () => {
    try {
      if (!clickedButtons || clickedButtons.length <= 1) {
        toast.warn("Must select more than one");
        return;
      }

      setLoading(true);
      setCurrentSlide("user-upload-loading");

      let accessToken = localStorage.getItem("access_token");
      const refreshToken = localStorage.getItem("refresh_token");

      if (!accessToken || !refreshToken) {
        toast.warn("Session expired. Please sign in again.");
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        setCurrentSlide("basic-info");
        return;
      }

      // Step 1: Validate the access token
      try {
        const checkAccessResponse = await axios.post(
          `https://cqceokwaza.execute-api.eu-north-1.amazonaws.com/default/users_voyex_api`,
          {
            action: "access_check",
            access_token: accessToken,
          }
        );

        if (checkAccessResponse.status === 200 && checkAccessResponse.data.valid === false) {
          // Step 2: Refresh token if access token is expired
          const refreshResponse = await axios.post(
            `https://cqceokwaza.execute-api.eu-north-1.amazonaws.com/default/users_voyex_api`,
            {
              action: "refresh_token",
              refresh_token: refreshToken,
            }
          );

          if (refreshResponse.status === 200 && refreshResponse.data.access_token) {
            accessToken = refreshResponse.data.access_token;
            localStorage.setItem("access_token", accessToken);
            toast.success("Session refreshed. Proceeding...");
          } else {
            throw new Error("Session expired. Please log in again.");
          }
        }
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        toast.warn("Session expired. Please log in again.");
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        setCurrentSlide("basic-info");
        return;
      }

      // Step 3: Proceed with uploading details
      const response = await axios.put(
        `https://cqceokwaza.execute-api.eu-north-1.amazonaws.com/default/users_voyex_api`,
        {
          user_id: Number(localStorage.getItem("user_id")), // Fixed key name
          fullname: userFullName,
          primary_language: userLanguage,
          skill_level: skillLevel,
          country: userCountry,
          user_type: "Regular",
          metadata: {
            purpose: clickedButtons,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Attach the updated token
          },
        }
      );

      console.log("response", response);

      if (response.status === 200) {
        toast.success(response.data.message);
        setCurrentSlide("user-upload-success");
        localStorage.removeItem("user_password");
      } else {
        setCurrentSlide("basic-info");
      }
    } catch (error) {
      console.error("Upload error:", error);

      if (!navigator.onLine) {
        toast.error("No internet connection. Please check your network and try again.");
      } else if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }

      setCurrentSlide("basic-info");
    } finally {
      setLoading(false);
    }
  };

  const handleUploadDetails = async () => {
    uploadDetails();
  };

  ////////////// HANDLE CURRENT SLIDE ////////////////////////
  const slides = {
    "basic-info": (
      <BasicInfoContainer
        setUserFullName={setUserFullName}
        setUserLanguage={setUserLanguage}
        setSkillLevel={setSkillLevel}
        setUserCountry={setUserCountry}
        handleBasicInfoSlide={handleBasicInfoSlide}
        setCurrentSlide={setCurrentSlide}
        loading={loading}
      />
    ),
    "user-purpose": (
      <UserPurpose
        usage={usage}
        clickedButtons={clickedButtons}
        handleButtonClick={handleButtonClick}
        handleUploadDetails={handleUploadDetails}
      />
    ),
    "user-upload-loading": <UserUploadLoading />,
    "user-upload-success": <UserUploadSuccess />,
  };

  return (
    <div className="fixed z-10 w-full h-full inset-0 flex items-center justify-center backdrop-blur-sm">
      {slides[currentSlide] || <BasicInfoContainer {...props} />}
    </div>
  );
}

export default UserUploadDetails;
