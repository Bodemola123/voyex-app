"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { GoSidebarCollapse } from "react-icons/go";
import { usePathname } from "next/navigation";
import { VscSignIn } from "react-icons/vsc";
import { FaUserCircle } from "react-icons/fa";

function Navbar() {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav
      className={`flex flex-col items-center gap-5 justify-between py-4 rounded-xl z-10 ml-3 h-[96%] px-3 ${
        isOpen ? "w-64" : "w-[86px]"
      } bg-gradient-to-tr from-[#00a766]/10 to-gray/10 overflow-hidden transition-all duration-300`}
    >
      <div className="flex flex-col items-center justify-center w-full">
        <div className="flex items-center justify-center w-full z-10">
          <div className="flex items-center pl-4 w-full overflow-hidden  whitespace-nowrap">
            <button onClick={toggleSidebar}>
              {/* <Image
                src="/collapse.png"
                alt="collapse"
                width={24}
                height={24}
                className="mr-auto block"
              /> */}
              <GoSidebarCollapse className="text-2xl" />
            </button>
            {isOpen && (
              <Link
                href="/"
                className="text-xl text-white font-bold ml-5 tracking-wider"
              >
                Voyex.
              </Link>
            )}
          </div>
        </div>

        <div className="flex flex-col items-center w-full gap-2 pt-[50px] z-10 tracking-wide">
          <Link
            href="/search"
            className={`flex items-center w-full py-3 pl-4 bg-none hover:text-fontlight border hover:border-fontlight rounded-full ${
              pathname.includes("search")
                ? "text-fontlight border-fontlight"
                : "text-fontfaded border-fontfaded"
            }`}
          >
            <Image
              src="/search.png"
              alt="search logo"
              width={24}
              height={24}
              className={`i ${pathname.includes("search") ? "img" : ""}`}
            />
            {isOpen && (
              <span className="text-base font-medium ml-2">Search</span>
            )}
          </Link>
          <Link
            href="/templates"
            className={`flex items-center w-full py-3 pl-4 bg-none hover:text-fontlight border hover:border-fontlight rounded-full 
            ${
              pathname.includes("templates")
                ? "text-fontlight border-fontlight"
                : "text-fontfaded border-fontfaded"
            }
          `}
          >
            <Image
              src="/clipboard-text.png"
              alt="chatgpt logo"
              width={24}
              height={24}
              className={`i ${pathname.includes("templates") ? "img" : ""}`}
            />
            {isOpen && (
              <span className="text-base font-medium ml-2">Templates</span>
            )}
          </Link>
          <Link
            href="/galactimart"
            className={`flex items-center w-full py-3 pl-4 bg-none hover:text-fontlight border hover:border-fontlight rounded-full ${
              pathname.includes("galactimart")
                ? "text-fontlight border-fontlight"
                : "text-fontfaded border-fontfaded"
            }`}
          >
            <Image
              src="/shopping-bag.png"
              alt="shopping-bag logo"
              width={24}
              height={24}
              className={`i ${pathname.includes("galactimart") ? "img" : ""}`}
            />
            {isOpen && (
              <span className="text-base font-medium ml-2">GalactiMart</span>
            )}
          </Link>
          <Link
            href="/workspace"
            className={`flex items-center w-full py-3 pl-4 bg-none hover:text-fontlight border hover:border-fontlight rounded-full ${
              pathname.includes("workspace")
                ? "text-fontlight border-fontlight"
                : "text-fontfaded border-fontfaded"
            }`}
          >
            <Image
              src="/lock.png"
              alt="lock logo"
              width={24}
              height={24}
              className={`i ${pathname.includes("workspace") ? "img" : ""}`}
            />
            {isOpen && (
              <span className="text-base font-medium ml-2">Workspace</span>
            )}
          </Link>
        </div>
      </div>

      <div
        className={`flex flex-col items-center gap-2 w-full z-10 tracking-wide`}
      >
        <Link
          href="/sign-up"
          title="Signup"
          className="flex items-center justify-start text-btnlime text-base font-medium py-3 pl-4 w-full h-12 rounded-xl bg-none capitalize overflow-x-hidden whitespace-nowrap"
        >
          {/* <VscSignIn className="text-2xl" /> */}
          <FaUserCircle className="text-xl" />
          {isOpen ? <span className="ml-3">Sign up</span> : ""}
        </Link>
        <button
          title="Login"
          className="flex items-center justify-start gap-3 text-fontlight text-base font-medium py-3 pl-4 w-full h-12 rounded-xl bg-btnlime capitalize overflow-x-hidden whitespace-nowrap"
        >
          <FaUserCircle className="text-xl" />
          {isOpen ? "log in" : ""}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
