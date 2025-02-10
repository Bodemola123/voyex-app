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
import { FundingInformation } from "./FundingInformation";
import { RevenueMode } from "./RevenueMode";
import { ClientPartnerDropdown } from "./ClientPartner";

function FinancialInformation ({
  handleFinancialInformationSlide,
  revenueInput,
  fundingInput,
  clientInput,
  setCurrentSlide

}) {
  
  return (
    <main className="relative grid grid-cols-2 gap-1 w-full h-full z-[2] p-4 overflow-y-auto overflow-x-hidden items-center scrollbar-hide">
    <DynamicCard/>
    <div className=" flex flex-col items-center justify-start h-full max-w-[444px] py-[33px] w-full mx-auto rounded-[29px] bg-black overflow-y-scroll scrollbar-hide">
    <p className="text-center font-bold text-5xl mb-10">Voyex</p>
      <div className="flex items-center justify-center gap-2 max-w-[293px] w-full">
        <span className="w-[35px] h-[9px] rounded-[28px] bg-[#1D1D1F]"></span>
        <span className="w-[35px] h-[9px] rounded-[28px] bg-[#1D1D1F]"></span>
        <span className="w-[35px] h-[9px] rounded-[28px] bg-[#1D1D1F]"></span>
        <span className="w-[35px] h-[9px] rounded-[28px] bg-[#1D1D1F]"></span>
        <span className="w-[35px] h-[9px] rounded-[28px] bg-purple"></span>       
         <span className="w-[35px] h-[9px] rounded-[28px] bg-[#1D1D1F]"></span>
      </div>
      <h1 className="text-fontlight text-3xl text-center font-bold capitalize my-4 tracking-wider">
        Financial Information
      </h1>

      <div className="space-y-[6px] w-full px-2">
        <Label htmlFor="fundinginfo" className="text-fontlight font-normal flex flex-row gap-1 items-center">
          Funding Information
              <TooltipProvider>
                <Tooltip>
                <TooltipTrigger><IoMdInformationCircle className='text-base text-[#f4f4f4]'/></TooltipTrigger>
                <TooltipContent>
                <p>How the organization or startup raises and manages its capital</p>
                </TooltipContent>
                </Tooltip>
                </TooltipProvider>
        </Label>
        <FundingInformation fundingInput={fundingInput}/>
      </div> 
      <div className="space-y-[6px] w-full mt-5 px-2">
        <Label
          htmlFor="revenuemodes"
          className="text-fontlight font-normal flex flex-row gap-1 items-center"
        >
          Revenue Mode
              <TooltipProvider>
                <Tooltip>
                <TooltipTrigger><IoMdInformationCircle className='text-base text-[#f4f4f4]'/></TooltipTrigger>
                <TooltipContent>
                <p>How does the business generate income from its activities or products</p>
                </TooltipContent>
                </Tooltip>
                </TooltipProvider>
        </Label>
        <RevenueMode revenueInput={revenueInput}/>
      </div>
      <div className="space-y-[6px] w-full mt-5 px-2">
        <Label htmlFor="client" className="text-fontlight font-normal flex flex-row gap-1 items-center">
          Clients/Partners
              <TooltipProvider>
                <Tooltip>
                <TooltipTrigger><IoMdInformationCircle className='text-base text-[#f4f4f4]'/></TooltipTrigger>
                <TooltipContent>
                <p>Different types of relationships that your business may have with other entities.</p>
                </TooltipContent>
                </Tooltip>
                </TooltipProvider>
        </Label>
        <ClientPartnerDropdown clientInput={clientInput}/>
      </div>
      <div className="flex items-center justify-between max-w-[500px] mt-6 w-full">
        <button
          className="text-base text-fontlight font-medium rounded-[25px] px-6 py-3 border border-card"
          onClick={() => setCurrentSlide("leadership-team")}
        >
          Back
        </button>
        <button
          className="text-base text-black font-medium rounded-[25px] px-6 py-3  bg-purple hover:bg-purple/70 transition-all"
          onClick={handleFinancialInformationSlide}
        >
          Next
        </button>
      </div>
    </div>
  </main>
  )
}

export default FinancialInformation