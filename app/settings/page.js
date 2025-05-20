"use client";
import React, { useState } from "react";
import DataControl from "@/components/settings-page/DataControl";
import General from "@/components/settings-page/General";
import Personalization from "@/components/settings-page/Personalization";
import Security from "@/components/settings-page/Security";

import SettingsHeader from "@/components/settings-page/Header";
import Profile from "@/components/settings-page/Profile";

function Settings() {
  const [activeTab, setActiveTab] = useState('account'); // Default to account tab

  const handleTabChange = (tab) => {
    setActiveTab(tab); // Update the active tab when clicked
  };

  return (
    <div className="flex flex-col overflow-y-auto gap-4 scrollbar-hide">
      <SettingsHeader activeTab={activeTab} onTabChange={handleTabChange} />      
      {activeTab === 'account' ? (
        <div className="flex flex-col gap-4">
          {/* <div id="general"><General /></div> */}
          <div id="personalization"><Personalization /></div>
          {/* <div id="data-control"><DataControl /></div> */}
          <div id="security"><Security /></div>
        </div>
      ) : (
        <div id="profile">
          <Profile /> {/* Only show Profile.js when 'profile' tab is selected */}
        </div>
      )}
    </div>
  );
}

export default Settings;
