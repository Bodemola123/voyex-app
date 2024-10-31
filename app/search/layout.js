import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import React from "react";

function SearchLayout({ children }) {
  return (
    <div className="flex items-center w-full h-full">
      <Navbar />
      <div className="relative w-full h-full">
        {children}
        <Footer />
      </div>
    </div>
  );
}

export default SearchLayout;
