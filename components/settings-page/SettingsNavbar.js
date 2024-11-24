"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { GoSidebarCollapse } from "react-icons/go";
import { usePathname } from "next/navigation";
import { PiGearSix } from "react-icons/pi";
import { navbar } from "@/constants/settings-page";

function SettingsNavbar() {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`flex flex-col items-center gap-5 justify-between py-4 rounded-xl z-10 ml-3 h-[96%] px-3 ${
        isOpen ? "w-64" : "w-[86px]"
      } bg-gradient-to-tr from-[#00a766]/10 to-[#999999]/10 overflow-hidden transition-all duration-300`}
    >
      <div className="flex flex-col gap-10 w-full">
        <div className="flex items-center justify-center w-full z-10">
          <div className="flex items-center gap-6 py-4 pl-4 w-full">
            <button onClick={toggleSidebar}>
              <GoSidebarCollapse className="text-2xl" />
            </button>
            {isOpen && (
              <Link
                href="/"
                className="text-xl text-white font-bold tracking-wider"
              >
                Voyex.
              </Link>
            )}
          </div>
        </div>

        <div className="flex flex-col items-start w-full gap-4 z-10 tracking-wider">
          {navbar.map((nav, i) => (
            <Link
              key={i}
              href={nav.link}
              className={`flex items-center px-4 py-3 border border-card rounded-[2.25rem] hover:text-fontlight hover:bg-card/20 whitespace-nowrap overflow-hidden ${
                pathname.includes(nav.link)
                  ? "text-fontlight bg-card/20"
                  : "text-fontfaded bg-none"
              }`}
            >
              <Image
                src={nav.img}
                alt={nav.name}
                width={24}
                height={24}
                className={`i ${pathname.includes(nav.link) ? "img" : ""}`}
              />
              {isOpen && (
                <span className={`text-base font-medium ml-2 capitalize`}>
                  {nav.name}
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>

      <div
        className={`flex flex-col items-center gap-2 w-full z-10 tracking-wide`}
      >
        <button
          title="Logout"
          className="flex items-center justify-center gap-3 text-fontlight text-base font-medium py-3 w-full h-12 rounded-xl bg-red-500 capitalize whitespace-nowrap overflow-hidden"
        >
          {<PiGearSix className="text-xl" />}
          {isOpen ? "log out" : ""}
        </button>
      </div>
    </div>
  );
}

export default SettingsNavbar;
