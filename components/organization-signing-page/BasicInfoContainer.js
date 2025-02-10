"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { IndustryDropdown } from "./IndustryDropdown";
import DynamicCard from "../common/DynamicCard";
import '../../app/globals.css'
import { LocationDropdown } from "./LocationDropdown";

function BasicInfoContainer({
  orgNameInput,
  websiteInput,
  industryInput,
  locationInput,
  handleBasicInfoSlide,
  loading,
}) {
  
  const router = useRouter();
  return (
    <main className="relative grid grid-cols-2 gap-1 w-full h-full z-[2] p-4 overflow-y-auto overflow-x-hidden scrollbar-hide items-center">
      <DynamicCard/>
      <div className=" flex flex-col items-center justify-start h-full max-w-[494px] py-[33px] w-full mx-auto pt-6 rounded-[29px] bg-black overflow-y-scroll scrollbar-hide basic">
        <p className="text-center font-bold text-5xl mb-10">Voyex</p>
        <div className="flex items-center justify-center gap-2 max-w-[293px] w-full">
          <span className="w-[35px] h-[9px] rounded-[28px] bg-purple"></span>
          <span className="w-[35px] h-[9px] rounded-[28px] bg-[#1D1D1F]"></span>
          <span className="w-[35px] h-[9px] rounded-[28px] bg-[#1D1D1F]"></span>
          <span className="w-[35px] h-[9px] rounded-[28px] bg-[#1D1D1F]"></span>
          <span className="w-[35px] h-[9px] rounded-[28px] bg-[#1D1D1F]"></span>
          <span className="w-[35px] h-[9px] rounded-[28px] bg-[#1D1D1F]"></span>
        </div>
        <h1 className="text-fontlight text-3xl text-center font-bold capitalize my-4 tracking-wider">
          basic organization information
        </h1>

        <div className="space-y-[6px] w-full px-2">
          <Label htmlFor="orgName" className="text-fontlight font-normal">
            Organization Name
          </Label>
          <Input
            id="orgName"
            type="text"
            placeholder="Your organization's name"
            onChange={orgNameInput}
            className={`rounded-[28px] bg-card/30  border-none placeholder:text-fontlight text-fontlight placeholder:text-fontlight/20 h-[56px]`}
          />
        </div>
        <div className="space-y-[6px] w-full mt-5 px-2">
          <Label htmlFor="website" className="text-fontlight font-normal">
            Website URL
          </Label>
          <Input
            id="website"
            type="text"
            placeholder="Add url"
            onChange={websiteInput}
            className={`rounded-[28px] bg-card/30 border-none placeholder:text-fontlight text-fontlight placeholder:text-fontlight/20 h-[56px]`}
          />
        </div>
        <div className="space-y-[6px] w-full mt-5 px-2">
          <Label htmlFor="industry" className="text-fontlight font-normal">
            Industry
          </Label>
          <IndustryDropdown industryInput={industryInput} />
          {/* <div className="space-y-[6px] w-full mt-5">
          <Label htmlFor="industry" className="text-fontlight font-normal">
            Industry
          </Label>
          <Input
            id="industry"
            type="text"
            placeholder="Select industry"
            onChange={industryInput}
            className={`rounded-[28px] bg-card/30 border-none placeholder:text-fontlight text-fontlight h-[56px]`}
          />
        </div> */}
        </div>
        <div className="space-y-[6px] w-full mt-5 px-2">
          <Label htmlFor="location" className="text-fontlight font-normal">
            Location
          </Label>
          <LocationDropdown locationInput={locationInput}/>
        </div>

        <div className="flex items-center justify-between max-w-[500px] py-6 w-full">
          <button
            className="text-base text-fontlight font-medium rounded-[25px] px-6 py-3 border border-card"
            onClick={() => router.push("/search")}
          >
            Skip
          </button> 
          <button
            className="text-base text-black font-medium rounded-[25px] px-6 py-3 bg-purple ml-auto"
            onClick={handleBasicInfoSlide}
          >
            Next
          </button>
        </div>
      </div>
    </main>
  );
}

export default BasicInfoContainer;
