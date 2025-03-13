"use client";

import { navbar } from "@/constants/settings-page";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { BiLogOutCircle } from "react-icons/bi";

function Collapsible() {

    const logoutUser = () => {
      // Clear tokens and user details from localStorage
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("userId");
      localStorage.removeItem("user_email");
      localStorage.removeItem("user_password");
  
      console.log("User logged out");
      toast("You are now Logged out");
  
      window.location.href = "/auth";// Redirect to login page
    };
  const pathname = usePathname(); // Get the current path

  const isActive = (href) => pathname === href; // Function to check active link
  return (
    <nav className="flex flex-col w-full bg-secondary h-screen pt-6">
      <div className="flex px-6 gap-4 flex-row items-center">
        <Image src={"/Crown.svg"} alt="crown" width={32} height={32} />
        <p className="font-extrabold text-3xl text-[#f4f4f4]">Voyex</p>
      </div>
      <div className="flex flex-col mt-10 px-2 gap-6 overflow-y-scroll scrollbar-hide scroll-container">
        {navbar.map((nav, i) => (
          <Link
            key={i}
            href={nav.link}
            className={`py-2 px-3 flex items-center gap-2.5 text-[20px] rounded-[123px] transition-all duration-300 capitalize ${
              isActive(`${nav.link}`)
                ? "bg-purple text-fontlight"
                : "hover:bg-purple/70 text-fontlight"
            }`}
          >
            {nav.name}
          </Link>
        ))}
      </div>

      <button
      onClick={logoutUser} 
      className="py-2 px-3 mx-2 mt-[66px] flex items-center gap-2 text-[20px] rounded-[123px] transition-all duration-300 capitalize hover:bg-purple/70">
        <BiLogOutCircle className="rotate-180 text-2xl" />
        log out
      </button>
    </nav>
  );
}

export default Collapsible;


