"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import { useState } from "react";
import DynamicCard from "../common/DynamicCard";

function ContactDetailsContainer({
  EmailInput,
  pcpName,
  NumberInput,
  loading,
  setCurrentSlide,
  handleContactDetailsSlide,
  twitterInput,
  linkedinInput,
}) {
  const [showLinkedIn, setShowLinkedIn] = useState(false); // Manage visibility of LinkedIn input
  const router = useRouter();

  return (
    <main className="relative grid grid-cols-2 gap-1 w-full h-full z-[2] p-4 overflow-y-auto scrollbar-hide overflow-x-hidden items-center justify-center">
      <DynamicCard />
      <div className=" flex flex-col items-center justify-center h-full max-w-[444px] py-[33px] w-full mx-auto rounded-[29px] text-white border border-[#D0D5DD1A] bg-[#0D0D0D] overflow-y-scroll scrollbar-hide">
      <p className="text-center font-bold text-5xl mb-10">Voyex</p>
        <div className="flex items-center justify-center gap-2 max-w-[293px] w-full">
          <span className="w-[35px] h-[9px] rounded-[28px] bg-[#1D1D1F]"></span>
          <span className="w-[35px] h-[9px] rounded-[28px] bg-[#c088fb]"></span>
          <span className="w-[35px] h-[9px] rounded-[28px] bg-[#1D1D1F]"></span>
          <span className="w-[35px] h-[9px] rounded-[28px] bg-[#1D1D1F]"></span>
          <span className="w-[35px] h-[9px] rounded-[28px] bg-[#1D1D1F]"></span>
          <span className="w-[35px] h-[9px] rounded-[28px] bg-[#1D1D1F]"></span>
        </div>
        <h1 className="text-white text-3xl text-center font-bold capitalize my-4 tracking-wider">
          contact details
        </h1>

        <div className="space-y-[6px] w-full mt-5 px-2">
          <Label htmlFor="email" className="text-white font-normal">
            Email Address
          </Label>
          <Input
            id="email"
            type="text"
            placeholder="Email Address"
            onChange={EmailInput}
            className={`rounded-[28px] bg-card/30 border-none placeholder:text-white text-white placeholder:text-white/20 h-[56px]`}
          />
        </div>
        <div className="space-y-[6px] w-full mt-5 px-2">
          <Label htmlFor="pcp_name" className="text-white font-normal">
            Primary Contact Person&apos;s Name
          </Label>
          <Input
            id="pcp_name"
            type="text"
            placeholder="Your Name"
            onChange={pcpName}
            className={`rounded-[28px] bg-card/30 border-none placeholder:text-white text-white placeholder:text-white/20 h-[56px]`}
          />
        </div>
        <div className="space-y-[6px] w-full mt-5 px-2">
          <Label htmlFor="phone_number" className="text-white font-normal">
            Phone number
          </Label>
          <Input
            id="phonenumber"
            type="text"
            placeholder="Your Phone Number"
            onChange={NumberInput}
            className={`rounded-[28px] bg-card/30 border-none placeholder:text-white text-white placeholder:text-white/20 h-[56px]`}
          />
        </div>
        <div className="space-y-[6px] w-full mt-5 px-2">
          <Label htmlFor="social_media" className="text-white font-normal">
            Social Media Links(twitter)
          </Label>
          <Input
            id="social_media"
            type="text"
            placeholder="add url"
            onChange={twitterInput}
            className={`rounded-[28px] bg-card/30 border-none placeholder:text-white text-white placeholder:text-white/20 h-[56px]`}
          />
        </div>
        
        {/* Conditionally render the "Add more links" button or LinkedIn input */}
        {!showLinkedIn && (
          <p className="text-center">
            <button
              className="text-[#c088fb] text-base mt-5"
              onClick={() => setShowLinkedIn(true)} // Show the LinkedIn input
            >
              Add more links
            </button>
          </p>
        )}

        {showLinkedIn && (
          <div className="space-y-[6px] w-full mt-5 px-2">
            <Label htmlFor="social_media2" className="text-white font-normal">
              Social Media Link(linkedin)
            </Label>
            <Input
              id="social_media2"
              type="text"
              placeholder="add url"
              onChange={linkedinInput}
              className={`rounded-[28px] bg-card/30 border-none placeholder:text-white text-white placeholder:text-white/20 h-[56px]`}
            />
          </div>
        )}

        <div className="flex items-center justify-between max-w-[400px] mt-6 w-full">
          <button
            className="text-base text-white font-medium rounded-[25px] px-6 py-3 border  border-card"
            onClick={() => setCurrentSlide("basic-info")}
          >
            Back
          </button>
          <button
            className="text-base text-black font-medium rounded-[25px] px-6 py-3 bg-[#c088fb] hover:bg-[#c088fb]/70 ml-auto transition-all"
            onClick={handleContactDetailsSlide}
          >
            Next
          </button>
        </div>
      </div>
    </main>
  );
}

export default ContactDetailsContainer;
