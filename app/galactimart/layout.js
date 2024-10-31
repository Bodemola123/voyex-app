import Navbar from "@/components/common/Navbar";
import React from "react";
import "./GalactiMart.css";

function SearchLayout({ children }) {
  return (
    <div className="flex items-center w-screen h-screen">
      <Navbar />
      <div className="relative w-full h-full py-5 px-11 overflow-y-scroll">
        {children}
      </div>
    </div>
  );
}

export default SearchLayout;
