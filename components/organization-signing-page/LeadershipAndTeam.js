"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useRouter } from "next/navigation";
import DynamicCard from "../common/DynamicCard";
import React from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { IoMdInformationCircle } from "react-icons/io";

function LeadershipAndTeam ({
  handleLeadershipAndTeamSlide,
  founderInput,
  excoInput,
  setTeamsize,
  setCareerspage,
  setCurrentSlide

}) {
  
  return (
    <main className="relative grid grid-cols-2 gap-1 w-full h-full z-[2] p-4 overflow-y-auto scrollbar-hide overflow-x-hidden items-center justify-center">
    <DynamicCard/>
    <div className=" flex flex-col items-center justify-center h-full max-w-[444px] py-[33px] w-full mx-auto text-white rounded-[29px] border border-[#D0D5DD1A] bg-[#0D0D0D] overflow-y-scroll scrollbar-hide">
    <p className="text-center font-bold text-5xl mb-10">Voyex</p>
      <div className="flex items-center justify-center gap-2 max-w-[293px] w-full">
        <span className="w-[35px] h-[9px] rounded-[28px] bg-[#1D1D1F]"></span>
        <span className="w-[35px] h-[9px] rounded-[28px] bg-[#1D1D1F]"></span>
        <span className="w-[35px] h-[9px] rounded-[28px] bg-[#1D1D1F]"></span>
        <span className="w-[35px] h-[9px] rounded-[28px] bg-[#c088fb]"></span>
        <span className="w-[35px] h-[9px] rounded-[28px] bg-[#1D1D1F]"></span>
        <span className="w-[35px] h-[9px] rounded-[28px] bg-[#1D1D1F]"></span>
      </div>
      <h1 className="text-white text-3xl text-center font-bold capitalize my-4 tracking-wider">
        Leadership and Team
      </h1>

      <div className="space-y-[6px] w-full px-2">
        <Label htmlFor="founder" className="text-white font-normal flex flex-row gap-1 items-center">
          Founder(s)
              <TooltipProvider>
                <Tooltip>
                <TooltipTrigger><IoMdInformationCircle className='text-base text-[#f4f4f4]'/></TooltipTrigger>
                <TooltipContent>
                <p>Who founded the organisation</p>
                </TooltipContent>
                </Tooltip>
                </TooltipProvider>
        </Label>
        <Input
          id="founder"
          type="text"
          placeholder="Name(s)"
          onChange={founderInput}
          className={`rounded-[28px] bg-card/30 border-none placeholder:text-white/20 text-white h-[56px] focus:outline-none focus:border-none`}
        />
      </div> 
      <div className="space-y-[6px] w-full mt-5 px-2">
        <Label
          htmlFor="keyexcos"
          className="text-white font-normal flex flex-row gap-1 items-center"
        >
          Key Executives
              <TooltipProvider>
                <Tooltip>
                <TooltipTrigger><IoMdInformationCircle className='text-base text-[#f4f4f4]'/></TooltipTrigger>
                <TooltipContent>
                <p>Who are the key Excos</p>
                </TooltipContent>
                </Tooltip>
                </TooltipProvider>
        </Label>
        <Input
          id="executives"
          type="text"
          placeholder="Name(s)"
          onChange={excoInput}
          className={`rounded-[28px] bg-card/30 border-none placeholder:text-white/20 text-white h-[56px] focus:outline-none focus:border-none`}
        />
      </div>
      <div className="space-y-[6px] w-full mt-5 px-2">
        <Label htmlFor="team_size" className="text-white font-normal flex flex-row gap-1 items-center">
          Team size
              <TooltipProvider>
                <Tooltip>
                <TooltipTrigger><IoMdInformationCircle className='text-base text-[#f4f4f4]'/></TooltipTrigger>
                <TooltipContent>
                <p>How many are you?</p>
                </TooltipContent>
                </Tooltip>
                </TooltipProvider>
        </Label>
        <Input
          id="teamsize"
          type="text"
          placeholder="Team size"
          onChange={setTeamsize}
          className={`rounded-[28px] bg-card/30 border-none placeholder:text-white/20 text-white h-[56px] focus:outline-none focus:border-none`}
        />
      </div>
      <div className="space-y-[6px] w-full mt-5 px-2">
        <Label htmlFor="career_page" className="text-white font-normal flex flex-row gap-1 items-center">
          Careers page
              <TooltipProvider>
                <Tooltip>
                <TooltipTrigger><IoMdInformationCircle className='text-base text-[#f4f4f4]'/></TooltipTrigger>
                <TooltipContent>
                <p>Add URL to your Careers page</p>
                </TooltipContent>
                </Tooltip>
                </TooltipProvider>
        </Label>
        <Input
          id="careerspage"
          type="text"
          placeholder="Enter URL"
          onChange={setCareerspage}
          className={`rounded-[28px] bg-card/30 border-none placeholder:text-white/20 text-white h-[56px] focus:outline-none focus:border-none focus:ring-0`}
        />
      </div>
      <div className="flex items-center justify-between max-w-[500px] mt-6 w-full">
        <button
          className="text-base text-white font-medium rounded-[25px] px-6 py-3 border border-card"
          onClick={() => setCurrentSlide("operational-details")}
        >
          Back
        </button>
        <button
          className="text-base text-black font-medium rounded-[25px] px-6 py-3  bg-[#c088fb] hover:bg-[#c088fb]/70 transition-all"
          onClick={handleLeadershipAndTeamSlide}
        >
          Next
        </button>
      </div>
    </div>
  </main>
  )
}

export default LeadershipAndTeam