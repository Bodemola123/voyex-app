"use client";

import { useRouter } from "next/navigation"; // Import useRouter for programmatic navigation
import BenFooter from "@/components/common/BenFooter";
import BenNavbar from "@/components/common/BenNavbar";
import Collapsible from "@/components/settings-page/Collapsible";
import React, { useEffect, useState } from "react";

function SettingsPageLayout({ children }) {
  const [isHistoryVisible, setIsHistoryVisible] = useState(false);
  const router = useRouter(); // Get the router instance for navigation

  // On component mount, check for userType or orgType in localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserType = localStorage.getItem("userType");
      const storedOrgType = localStorage.getItem("orgType");

      // If neither userType nor orgType is present, redirect to login
      if (!storedUserType && !storedOrgType) {
        router.push("/auth"); // Redirect to login page
      }
    }
  }, [router]); // Run this effect once when the component mounts

  // On component mount, retrieve state from localStorage for history visibility
  useEffect(() => {
    const savedState = localStorage.getItem("isHistoryVisible");
    if (savedState !== null) {
      setIsHistoryVisible(JSON.parse(savedState)); // Parse boolean value from localStorage
    }
  }, []);

  // Update localStorage whenever the state changes
  const toggleHistoryVisibility = () => {
    setIsHistoryVisible((prev) => {
      const newState = !prev;
      localStorage.setItem("isHistoryVisible", JSON.stringify(newState));
      return newState;
    });
  };

  return (
    <div className="flex flex-row items-center w-screen h-screen">
      <BenNavbar
        toggleHistoryVisibility={toggleHistoryVisibility}
        isHistoryVisible={isHistoryVisible}
      />
      {/* <div
        className={`transition-all duration-300 ${
          isHistoryVisible ? "w-[360px]" : "w-0"
        } bg-[#131314] overflow-hidden`}
      >
        {isHistoryVisible && <Collapsible />}
      </div> */}
      <div className="relative flex-grow w-full h-full py-5 px-11 overflow-y-scroll flex flex-col gap-4 justify-between tracking-wide">
        <div className="flex flex-col xl:w-[1000px] lg:w-[900px] justify-center mx-auto">
          {children}
        </div>
        <BenFooter />
      </div>
    </div>
  );
}

export default SettingsPageLayout;
