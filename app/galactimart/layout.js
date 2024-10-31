import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import React from "react";
import './GalactiMart.css';

function SearchLayout({ children }) {
  return (
    <div className="flex items-center w-full h-full px-11">
      <Navbar />
      <div className="relative w-full h-full scroll-container scrollbar-hide">
        {children}
      </div>
      <Footer/>
    </div>
  );
}

export default SearchLayout;
