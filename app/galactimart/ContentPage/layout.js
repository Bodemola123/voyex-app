import React from "react";
import "../galactimart.css";

function SearchLayout({ children }) {
  return (
    <div className=" flex items-center w-full h-[92%] relative scroll-container scrollbar-hide">
      {children}
    </div>
  );
}

export default SearchLayout;
