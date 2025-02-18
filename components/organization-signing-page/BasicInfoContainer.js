"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { IndustryDropdown } from "./IndustryDropdown";
import DynamicCard from "../common/DynamicCard";
import '../../app/globals.css';
import { LocationDropdown } from "./LocationDropdown";
import axios from "axios"; // Import axios

function BasicInfoContainer({
  orgNameInput,
  websiteInput,
  setOrgIndustry,
  locationInput,
  handleBasicInfoSlide,
  loading,
}) {
  const [orgName, setOrgName] = useState("");
  const [orgNameError, setOrgNameError] = useState("");
  const router = useRouter();

  // Check if organization name exists via the API
  const checkOrgNameAvailability = async (orgName) => {
    if (!orgName) return;

    try {
      const response = await axios.get(
        `https://p2xeehk5x9.execute-api.ap-southeast-2.amazonaws.com/default/org_voyex_api?org_name=${orgName}`
      );
      
      if (response.status === 200) {
        setOrgNameError("This organization name already exists.");
      } else if (response.status === 404) {
        setOrgNameError(""); // Clear error if name doesn't exist
      }
    } catch (error) {
      // Handle network or other errors
      setOrgNameError("Failed to check organization name availability.");
    }
  };

  // Update org name and check availability on input change
  const handleOrgNameChange = (e) => {
    const name = e.target.value;
    setOrgName(name);
    orgNameInput(name);
    checkOrgNameAvailability(name); // Check availability as the user types
  };

  return (
    <main className="relative grid grid-cols-2 gap-1 w-full h-full z-[2] p-4 overflow-y-auto overflow-x-hidden scrollbar-hide items-center">
      <DynamicCard />
      <div className="flex flex-col items-center justify-start h-full max-w-[494px] py-[33px] w-full mx-auto pt-6 px-2 rounded-[29px] bg-black text-white overflow-y-scroll scrollbar-hide basic">
        <p className="text-center font-bold text-5xl mb-10">Voyex</p>
        <div className="flex items-center justify-center gap-2 max-w-[293px] w-full">
          <span className="w-[35px] h-[9px] rounded-[28px] bg-[#c088fb]"></span>
          <span className="w-[35px] h-[9px] rounded-[28px] bg-[#1D1D1F]"></span>
          <span className="w-[35px] h-[9px] rounded-[28px] bg-[#1D1D1F]"></span>
          <span className="w-[35px] h-[9px] rounded-[28px] bg-[#1D1D1F]"></span>
          <span className="w-[35px] h-[9px] rounded-[28px] bg-[#1D1D1F]"></span>
          <span className="w-[35px] h-[9px] rounded-[28px] bg-[#1D1D1F]"></span>
        </div>
        <h1 className="text-white text-3xl text-center font-bold capitalize my-4 tracking-wider">
          basic organization information
        </h1>

        <div className="space-y-[6px] w-full px-2">
          <Label htmlFor="orgName" className="text-white font-normal">
            Organization Name
          </Label>
          <Input
            id="orgName"
            type="text"
            placeholder="Your organization's name"
            value={orgName}
            onChange={handleOrgNameChange}
            className={`rounded-[28px] bg-card/30 border-none placeholder:text-white text-white placeholder:text-white/20 h-[56px]`}
          />
          {/* Show error message if organization name already exists */}
          {orgNameError && (
            <p className="text-red-500 text-sm">{orgNameError}</p>
          )}
        </div>

        <div className="space-y-[6px] w-full mt-5 px-2">
          <Label htmlFor="website" className="text-white font-normal">
            Website URL
          </Label>
          <Input
            id="website"
            type="text"
            placeholder="Add url"
            onChange={websiteInput}
            className={`rounded-[28px] bg-card/30 border-none placeholder:text-white text-white placeholder:text-white/20 h-[56px]`}
          />
        </div>
        <div className="space-y-[6px] w-full mt-5 px-2">
          <Label htmlFor="industry" className="text-white font-normal">
            Industry
          </Label>
          <IndustryDropdown setOrgIndustry={setOrgIndustry} />
        </div>
        <div className="space-y-[6px] w-full mt-5 px-2">
          <Label htmlFor="location" className="text-white font-normal">
            Location
          </Label>
          <LocationDropdown locationInput={locationInput} />
        </div>

        <div className="flex items-center justify-between max-w-[500px] py-6 w-full">
          <button
            className="text-base text-white font-medium rounded-[25px] px-6 py-3 border border-card"
            onClick={() => router.push("/search")}
          >
            Skip
          </button>
          <button
            className="text-base text-black font-medium rounded-[25px] px-6 py-3 bg-[#c088fb] ml-auto"
            onClick={handleBasicInfoSlide}
            disabled={!!orgNameError} // Disable the Next button if there is an error
          >
            Next
          </button>
        </div>
      </div>
    </main>
  );
}

export default BasicInfoContainer;
