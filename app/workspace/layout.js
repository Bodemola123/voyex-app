"use client";
import BenFooter from "@/components/common/BenFooter";
import BenNavbar from "@/components/common/BenNavbar";
import NavOpen from "@/components/workspace-page/NavOpen";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";  // To programmatically redirect

function WorkSpaceLayout({ children }) {
  const [isHistoryVisible, setIsHistoryVisible] = useState(false);
  const router = useRouter();

  // On component mount, retrieve state from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem("isHistoryVisible");
    if (savedState !== null) {
      setIsHistoryVisible(JSON.parse(savedState)); // Parse boolean value from localStorage
    }

    // Check if user is logged in as an organization
    const orgType = localStorage.getItem("orgType");

    if (orgType !== "organization") {
      // If not an organization, redirect them to another page (e.g., homepage or an access denied page)
      router.push("/search"); // Redirect to access-denied page
    }
  }, [router]); // Make sure router is available

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
      <div className="flex flex-row">
        <BenNavbar
          toggleHistoryVisibility={toggleHistoryVisibility}
          isHistoryVisible={isHistoryVisible}
        />
        <div
          className={`transition-all duration-300 ${
            isHistoryVisible ? "w-[280px]" : "w-0"
          } bg-[#131314] overflow-hidden`}
        >
          {isHistoryVisible && <NavOpen />}
        </div>
      </div>
      <div className="relative flex-grow w-full h-full p-6 overflow-y-scroll flex flex-col justify-between gap-4 tracking-wide">
        {children}
      </div>
    </div>
  );
}

export default WorkSpaceLayout;
