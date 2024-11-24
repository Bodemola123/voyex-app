import SettingsHeader from "@/components/settings-page/Header";
import SettingsNavbar from "@/components/settings-page/SettingsNavbar";
import React from "react";

function SettingsPageLayout({ children }) {
  return (
    <div className="flex items-center w-screen h-screen">
      <SettingsNavbar />
      <div className="relative w-full h-full py-5 px-11 overflow-y-scroll tracking-wide">
        <SettingsHeader />
        {children}
      </div>
    </div>
  );
}

export default SettingsPageLayout;
