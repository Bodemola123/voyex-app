"use client";

import { navbar } from "@/constants/settings-page";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { BiLogOutCircle } from "react-icons/bi";
import { toast } from "react-toastify";

function Collapsible() {
  const [activeSection, setActiveSection] = useState(""); // Track the active section

  // Scroll to the section when clicking a nav item
  const handleScroll = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  // Detect which section is currently in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.6 } // Adjust for better accuracy
    );

    // Observe all settings sections
    navbar.forEach((nav) => {
      const section = document.getElementById(nav.id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect(); // Cleanup observer on unmount
  }, []);

  // Logout function
  const logoutUser = () => {
    localStorage.removeItem("userType");
    localStorage.removeItem("orgType");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("userId");
    localStorage.removeItem("user_email");
    localStorage.removeItem("user_password");
    localStorage.removeItem("fullName");
    localStorage.removeItem("firstName");
    localStorage.removeItem("userEmail")
    localStorage.removeItem("orgId")
    localStorage.removeItem('entityId')
    localStorage.removeItem("chat_id");
    localStorage.removeItem("messages");
    localStorage.removeItem('chats');
    localStorage.removeItem('orgEmail');
    localStorage.removeItem('orgName');
    localStorage.removeItem('poc')

    console.log("User logged out");
    toast.success("Logging out. Redirecting to Sign-in");

    window.location.href = "/auth/user"; // Redirect to login page
  };

  return (
    <nav className="flex flex-col w-full bg-secondary h-screen pt-6">
      <div className="flex px-6 gap-4 flex-row items-center">
        <Image src={"/Crown.svg"} alt="crown" width={32} height={32} />
        <p className="font-extrabold text-3xl text-[#f4f4f4]">Voyex</p>
      </div>

      {/* Sidebar Links */}
      <div className="flex flex-col mt-10 px-2 gap-6 overflow-y-scroll scrollbar-hide scroll-container">
        {navbar.map((nav, i) => (
          <button
            key={i}
            onClick={() => handleScroll(nav.id)}
            className={`py-2 px-3 flex items-center gap-2.5 text-[16px] transition-all duration-300 capitalize ${
              activeSection === nav.id
                ? "bg-[#1D1F20] text-fontlight"
                : "hover:bg-[#1D1F20] text-fontlight"
            }`}
          >
            {nav.name}
          </button>
        ))}
      </div>

      {/* Logout Button */}
      <button
        onClick={logoutUser}
        className="py-2 px-3 mx-2 mt-[66px] flex items-center gap-2  transition-all duration-300 capitalize text-red-500 hover:text-red-800"
      >
        <BiLogOutCircle className="rotate-180 text-xl" />
        log out
      </button>
    </nav>
  );
}

export default Collapsible;
