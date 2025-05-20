"use client"
import React, { useEffect, useState } from "react";

function SettingsHeader({ activeTab, onTabChange }) {
  const [isOrg, setIsOrg] = useState(false); // State to track if it's an organization

  useEffect(() => {
    const userType = localStorage.getItem("userType");
    const orgType = localStorage.getItem("orgType");

    // Set isOrg to true if orgType is found, false if it's a user
    if (orgType) {
      setIsOrg(true); // It's an organization
    } else if (userType) {
      setIsOrg(false); // It's a user
    }
  }, []); // Run on component mount

  return (
    <div className="flex items-center justify-end w-full z-10">
      {/* <div className="flex items-center justify-center gap-2">
        <h3 className="text-3xl text-fontlight font-bold capitalize">
          settings
        </h3>
      </div> */}
      <div className="flex items-center gap-4 justify-center text-xl">
        <button
          className={`text-base font-semibold ${activeTab === 'account' ? 'text-[#565656]' : 'text-[#f4f4f4]'} hover:text-[#565656]`}
          onClick={() => onTabChange('account')}
        >
          Account
        </button>
        
        {isOrg && (
          <button
            className={`text-base font-semibold ${activeTab === 'profile' ? 'text-[#565656]' : 'text-[#f4f4f4]'} hover:text-[#565656]`}
            onClick={() => onTabChange('profile')}
          >
            Profile
          </button>
        )}
      </div>
    </div>
  );
}

export default SettingsHeader;
