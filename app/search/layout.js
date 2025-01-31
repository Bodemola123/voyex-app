"use client";
import BenNavbar from "@/components/common/BenNavbar";
import React, { useEffect, useState } from "react";
import "../../app/globals.css";
import SearchNavOpen from "@/components/search-page/SearchNavOpen";

function SearchLayout({ children }) {

  return (
    <div className="flex items-center w-full h-screen">
      <main className="flex-grow relative flex h-full w-full flex-col gap-10  justify-between items-center overflow-y-scroll scrollbar-hide scroll-container">
        {children}
      </main>
    </div>
  );
}

export default SearchLayout;
