import Navbar from "@/components/common/Navbar";
import React from "react";
import "./galactimart.css";
import BenNavbar from "@/components/common/BenNavbar";


function SearchLayout({ children }) {
  return (
    <div className="flex items-center w-full h-full">
        {children}
    </div>
  );
}

export default SearchLayout;
