// DISPLAY THIS IF ORGANIZATION HASN'T PROVIDED ADDITIONAL DETAILS AFTER SIGNING UP
"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import BasicInfoContainer from "./BasicInfoContainer";
import axios from "axios";
import UserUploadLoading from "./UserUploadLoading";
import UserUploadSuccess from "./UserUploadSuccess";
import UserPurpose from "./UserPurpose";
import { useRouter } from "next/navigation";

function UserUploadDetails({ setUserDisplay }) {
  const [userFullName, setUserFullName] = useState("");
  const [userLanguage, setUserLanguage] = useState("");
  const [skillLevel, setSkillLevel] = useState("");
  const [userCountry, setUserCountry] = useState("");
  const [clickedButtons, setClickedButtons] = useState([]);
  const router = useRouter()
  const [loading, setLoading] = useState(false);
  const [currentSlide, setCurrentSlide] = useState("basic-info");
  const firstName = userFullName.trim().split(" ")[0];
  localStorage.setItem("firstName", firstName);
  


  const usage = [
    {
      name: "conversation",
    },
    {
      name: "business",
    },
    {
      name: "exams",
    },
    {
      name: "marketing",
    },
    {
      name: "content creation",
    },
    {
      name: "programming",
    },
    {
      name: "writing",
    },
    {
      name: "vocabulary",
    },
    {
      name: "pronounciation",
    },
    {
      name: "training",
    },
    {
      name: "presentation",
    },
    {
      name: "research",
    },
    {
      name: "daily",
    },
    {
      name: "formal",
    },
    {
      name: "feedback",
    },
    {
      name: "automation",
    },
    {
      name: "experimentation",
    },
    {
      name: "analysis",
    },
    {
      name: "insights",
    },
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
  const uploadDetails = async () => {
    try {
        if (clickedButtons.length <= 1) {
            toast.warn("Must select more than one option.");
            return;
        }

        setLoading(true);
        setCurrentSlide("user-upload-loading");

        const accessToken = localStorage.getItem("access_token");
        console.log("Checking Access Token:", accessToken);  // Get token from localStorage

        if (!accessToken) {
            toast.warn("Access token is missing. Please log in again.");
            window.location.href = "/auth/user"// Redirect to login page
            return;
        }

        const userId = localStorage.getItem("userId");

        if (!userId) {
            toast.warn("User ID is missing.");
            return;
        }

        const requestBody = {
            user_id: Number(userId),
            fullname: userFullName,
            primary_language: userLanguage,
            skill_level: skillLevel,
            country: userCountry,
            user_type: "Regular",
            access_token: accessToken, // ✅ Token only in body
        };

        console.log("Uploading details with request body:", requestBody);

        const response = await axios.put(
            `https://cqceokwaza.execute-api.eu-north-1.amazonaws.com/default/users_voyex_api`,
            requestBody
        );

        console.log("Response:", response);

        if (response.status === 200) {
            toast.success(response.data.message);
            let userType = userId ? "user" : "organization"; // If user_id exists, it's a user; otherwise, it's an organization
            // Store user type in localStorage
            localStorage.setItem("userType", userType);

            const firstName = userFullName.trim().split(" ")[0];

            localStorage.setItem("firstName", firstName);
            localStorage.removeItem("user_email")
            localStorage.removeItem("user_password"); // Remove sensitive data
            setCurrentSlide("user-upload-success");
        } else {
            setCurrentSlide("basic-info");
        }
    } catch (error) {
        console.error("Upload error:", error);

        if (error.response?.data) {
            toast.error(error.response.data);
        } else {
            toast.error(error.message);
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
  const handleCurrentSlide = () => {
    if (currentSlide === "basic-info") {
      return (
        <BasicInfoContainer
          setUserFullName={setUserFullName}
          setUserLanguage={setUserLanguage}
          setSkillLevel={setSkillLevel}
          setUserCountry={setUserCountry}
          handleBasicInfoSlide={handleBasicInfoSlide}
          setCurrentSlide={setCurrentSlide}
          loading={loading}
        />
      );
    } else if (currentSlide === "user-purpose") {
      return (
        <UserPurpose
          usage={usage}
          clickedButtons={clickedButtons}
          handleButtonClick={handleButtonClick}
          handleUploadDetails={handleUploadDetails}
        />
      );
    } else if (currentSlide === "user-upload-loading") {
      return <UserUploadLoading />;
    } else if (currentSlide === "user-upload-success") {
      return <UserUploadSuccess />;
    } else
      return (
        <BasicInfoContainer
          setUserFullName={setUserFullName}
          setUserLanguage={setUserLanguage}
          setSkillLevel={setSkillLevel}
          setUserCountry={setUserCountry}
          handleBasicInfoSlide={handleBasicInfoSlide}
          setCurrentSlide={setCurrentSlide}
          loading={loading}
        />
      );
  };
  return (
    <div
      className="w-full h-full flex items-center justify-center"
      // onClick={(e) => setUserDisplay(false) + e.stopPropagation()}
    >
      {handleCurrentSlide()}

      {/* <UserPurpose
        usage={usage}
        clickedButtons={clickedButtons}
        handleButtonClick={handleButtonClick}
        handleUploadDetails={handleUploadDetails}
      /> */}
    </div>
  );
}

export default UserUploadDetails;
