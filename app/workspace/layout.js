import BenNavbar from "@/components/common/BenNavbar";
import WorkSpaceHeader from "@/components/workspace-page/Header";
import React from "react";

function WorkSpaceLayout({ children }) {
  return (
    <div className="flex items-center w-screen h-screen">
      <BenNavbar/>
      <div className="relative w-full h-full py-5 px-11 overflow-y-scroll tracking-wide">
        <WorkSpaceHeader />
        {children}
      </div>
    </div>
  );
}

export default WorkSpaceLayout;
