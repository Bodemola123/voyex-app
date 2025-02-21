"use client";

import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoMdInformationCircle } from "react-icons/io";
import { useRouter } from "next/navigation";
import DynamicCard from "../common/DynamicCard";
import DocumentUploader from "./DocumentUploader";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Certifications } from "./Certification";
import { DataPrivacy } from "./DataPrivacy";

function ComplianceandCert ({
  handleUploadDetails,
  certificationsInput,
  privacyInput,
  setCurrentSlide,
  loading,
  uploadedFile,
  handleIndividualFileUpload,
  handleIndividualFileRemove
}) {

  return (
    <main className="relative grid grid-cols-2 gap-1 w-full h-full z-[2] p-4 overflow-y-auto overflow-x-hidden scrollbar-hide items-center justify-center">
      <DynamicCard />
      <div className="flex flex-col items-center justify-start h-full max-w-[677px] py-[33px] w-full mx-auto rounded-[29px] bg-black overflow-y-scroll scrollbar-hide">
        <p className="text-center font-bold text-5xl mb-10">Voyex</p>
        <div className="flex items-center justify-center gap-2 max-w-[293px] w-full">
          <span className="w-[35px] h-[9px] rounded-[28px] bg-[#1D1D1F]"></span>
          <span className="w-[35px] h-[9px] rounded-[28px] bg-[#1D1D1F]"></span>
          <span className="w-[35px] h-[9px] rounded-[28px] bg-[#1D1D1F]"></span>
          <span className="w-[35px] h-[9px] rounded-[28px] bg-[#1D1D1F]"></span>
          <span className="w-[35px] h-[9px] rounded-[28px] bg-[#1D1D1F]"></span>  
          <span className="w-[35px] h-[9px] rounded-[28px] bg-purple"></span>
        </div>
        <h1 className="text-fontlight text-3xl text-center font-bold capitalize my-4 tracking-wider">
          Compliance and Certification
        </h1>

        {/* Data Privacy Section */}
        <div className="space-y-[6px] w-full px-2">
          <label className="text-fontlight font-normal flex flex-row gap-1 items-center">
            Data Privacy Policies
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <IoMdInformationCircle className='text-base text-[#f4f4f4]' />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Guidelines and regulations that govern how personal and sensitive information is collected, used, stored, and shared in your organization.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </label>
          <DataPrivacy privacyInput={privacyInput} />
        </div> 

        {/* Certifications Section */}
        <div className="space-y-[6px] w-full mt-5 px-2">
          <label className="text-fontlight font-normal flex flex-row gap-1 items-center">
            Certifications
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <IoMdInformationCircle className='text-base text-[#f4f4f4]' />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Formal attestations issued by a recognized authority, verifying that a person, organization, or product meets specific standards or requirements.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </label>
          <Certifications certificationsInput={certificationsInput} />
        </div>

        {/* File Upload Section */}
        <div className="space-y-[6px] w-full mt-5">
          <div className='flex flex-col gap-4 bg-[#0a0a0b] rounded-[25px] p-4'>
            <p className='text-[#c088fb] font-medium text-base'>Upload Certificate</p>
            <div className='flex gap-2.5 w-full px-10 h-[188px] bg-[#131314] p-4 justify-center items-center rounded-[26px]'>
              <DocumentUploader
                onFileUpload={handleIndividualFileUpload}
                uploadedFile={uploadedFile}
                onFileRemove={handleIndividualFileRemove}
              />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-between mt-6 w-full px-2">
          <button
            className="text-base text-fontlight font-medium rounded-[25px] px-6 py-3 border border-card"
            onClick={() => setCurrentSlide("leadership-team")}
          >
            Back
          </button>
          <button
            className="text-base text-black font-medium rounded-[25px] px-6 py-3 bg-purple hover:bg-purple/70 transition-all"
            onClick={handleUploadDetails}
          >
            {loading ? (
              <AiOutlineLoading3Quarters className="animate-spin text-black" />
            ) : (
              "Submit Details"
            )}
          </button>
        </div>
      </div>
    </main>
  );
}

export default ComplianceandCert;
