"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { IndustryDropdown } from "./IndustryDropdown";
import DynamicCard from "../common/DynamicCard";
import '../../app/globals.css';

import { LocationDropdown } from "./LocationDropdown";

function BasicInfoContainer({
  orgName, setOrgName, checkOrgNameExists,
  websiteInput,
  setOrgIndustry,
  locationInput,
  handleBasicInfoSlide,
  loading,
}) {
  const router = useRouter();

  // Check if any required field is empty
  const isDisabled = !orgName || !websiteInput || !setOrgIndustry || !locationInput;

  return (
    <main className="relative grid grid-cols-2 gap-1 w-full h-full z-[2] p-4 overflow-y-auto overflow-x-hidden scrollbar-hide items-center justify-center">
      <DynamicCard />
      <div className="flex flex-col items-center justify-start h-full max-w-[494px] py-[33px] w-full mx-auto pt-6 px-2 rounded-[29px] bg-black border border-[#D0D5DD1A] text-white overflow-y-scroll scrollbar-hide basic">
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
          Basic Organization Information
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
            onChange={(e) => setOrgName(e.target.value)}
            onBlur={() => checkOrgNameExists(orgName)}
            className="rounded-[28px] bg-card/30 border-none placeholder:text-white text-white placeholder:text-white/20 h-[56px]"
          />
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
            className="rounded-[28px] bg-card/30 border-none placeholder:text-white text-white placeholder:text-white/20 h-[56px]"
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
            className={`text-base font-medium rounded-[25px] px-6 py-3 bg-[#c088fb] ml-auto ${
              isDisabled ? "opacity-50 cursor-not-allowed" : "text-black"
            }`}
            onClick={handleBasicInfoSlide}
            disabled={isDisabled}
          >
            Next
          </button>
        </div>
      </div>
    </main>
  );
}

export default BasicInfoContainer;
