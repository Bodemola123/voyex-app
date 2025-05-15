import React from "react";
// import "../galactimart.css";

function SearchLayout({ children }) {
  return (
    <div className=" flex items-center w-full h-full relative scroll-container scrollbar-hide">
      {children}
    </div>
  );
}

export default SearchLayout;
