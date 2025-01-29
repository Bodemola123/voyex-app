"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { HiOutlineHome } from "react-icons/hi";
import {
  LuClipboardList,
  LuLockKeyhole,
  LuSettings,
  LuShoppingCart,
} from "react-icons/lu";
import { RxAvatar } from "react-icons/rx";

const BenNavbar = ({ toggleHistoryVisibility, isHistoryVisible }) => {
  const pathname = usePathname(); // Get the current path

  const isActive = (href) => pathname === href; // Function to check active link

  return (
    <nav className="h-screen z-10 w-16 bg-[#131314] flex flex-col justify-between items-center py-12 text-white">
      <div className="flex flex-col gap-8 justify-center items-center">
        {/* Toggle History Button */}
        <button
          onClick={toggleHistoryVisibility}
          className="bg-[#000000] border-[0.5px] border-[#FFFFFF52] rounded-[12px] w-8 flex items-center justify-center text-[20px] font-black text-transparent"
        >
          <p className="bg-clip-text bg-gradient-to-r from-[#C088FB] via-[#8E3EFF] to-[#8E3EFF]">
            {isHistoryVisible ? "V" : "V"}
          </p>
        </button>
        {/* Navigation Links */}
        <div className="flex flex-col justify-center items-center gap-4">
          {/* Home Link */}
          <div className="relative group">
            <Link
              href="/search"
              className={`p-2 flex justify-center items-center gap-2.5 rounded-[123px] ${
                isActive("/") ? "bg-[#C088fb]" : "hover:bg-[#C088fb]"
              }`}
            >
              <HiOutlineHome
                className={`text-[20px] ${
                  isActive("/") ? "text-[#f4f4f4]" : "text-[#C088fb]"
                } group-hover:text-[#f4f4f4]`}
              />
            </Link>
            <span className="absolute top-full -mt-2 left-full text-sm text-[#ffffff] text-center font-medium bg-[#131314] px-2.5 py-1.5 rounded-[13px] flex gap-2.5 opacity-0 group-hover:opacity-100 transition-opacity">
              Home
            </span>
          </div>

          {/* Templates Link */}
          <div className="relative group">
            <Link
              href="/templates"
              className={`p-2 flex justify-center items-center gap-2.5 rounded-[123px] ${
                isActive("/templates") ? "bg-[#C088fb]" : "hover:bg-[#C088fb]"
              }`}
            >
              <LuClipboardList
                className={`text-[20px] ${
                  isActive("/templates") ? "text-[#f4f4f4]" : "text-[#C088fb]"
                } group-hover:text-[#f4f4f4]`}
              />
            </Link>
            <span className="absolute top-full text-sm -mt-2 left-full text-[#ffffff] text-center font-medium bg-[#131314] px-2.5 py-1.5 rounded-[13px] flex gap-2.5 opacity-0 group-hover:opacity-100 transition-opacity">
              Templates
            </span>
          </div>

          {/* Galactimart Link */}
          <div className="relative group">
            <Link
              href="/galactimart"
              className={`p-2 flex justify-center items-center gap-2.5 rounded-[123px] ${
                isActive("/galactimart") ? "bg-[#C088fb]" : "hover:bg-[#C088fb]"
              }`}
            >
              <LuShoppingCart
                className={`text-[20px] ${
                  isActive("/galactimart") ? "text-[#f4f4f4]" : "text-[#C088fb]"
                } group-hover:text-[#f4f4f4]`}
              />
            </Link>
            <span className="absolute top-full text-sm -mt-2 left-full text-[#ffffff] text-center font-medium bg-[#131314] px-2.5 py-1.5 rounded-[13px] flex gap-2.5 opacity-0 group-hover:opacity-100 transition-opacity">
              Galactimart
            </span>
          </div>

          {/* Workspace Link */}
          <div className="relative group">
            <Link
              href="/workspace"
              className={`p-2 flex justify-center items-center gap-2.5 rounded-[123px] ${
                isActive("/workspace") ? "bg-[#C088fb]" : "hover:bg-[#C088fb]"
              }`}
            >
              <LuLockKeyhole
                className={`text-[20px] ${
                  isActive("/workspace") ? "text-[#f4f4f4]" : "text-[#C088fb]"
                } group-hover:text-[#f4f4f4]`}
              />
            </Link>
            <span className="absolute top-full text-sm -mt-2 left-full text-[#ffffff] text-center font-medium bg-[#131314] px-2.5 py-1.5 rounded-[13px] flex gap-2.5 opacity-0 group-hover:opacity-100 transition-opacity">
              Workspace
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col gap-4 justify-center items-center">
        {/* Settings Link */}
        <div className="relative group">
          <Link
            href="/settings"
            className={`p-2 flex justify-center items-center gap-2.5 rounded-[123px] ${
              isActive("/settings") ? "bg-[#C088fb]" : "hover:bg-[#C088fb]"
            }`}
          >
            <LuSettings
              className={`text-[20px] ${
                isActive("/settings") ? "text-[#f4f4f4]" : "text-[#C088fb]"
              } group-hover:text-[#f4f4f4]`}
            />
          </Link>
          <span className="absolute top-full text-sm -mt-2 left-full text-[#ffffff] text-center font-medium bg-[#131314] px-2.5 py-1.5 rounded-[13px] flex gap-2.5 opacity-0 group-hover:opacity-100 transition-opacity">
            Settings
          </span>
        </div>

        {/* Profile Avatar */}
        <button className="flex justify-center items-center gap-2.5">
          <RxAvatar className="text-[28px]" />
        </button>
      </div>
    </nav>
  );
};

export default BenNavbar;
