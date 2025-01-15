"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function ContactDetailsContainer({
  pocInput,
  twitterInput,
  linkedinInput,
  loading,
  setCurrentSlide,
  handleContactDetailsSlide,
}) {
  const router = useRouter();
  return (
    <main className="relative max-w-[666px] w-full h-[90vh] p-6 rounded-[29px] bg-black overflow-y-scroll">
      <div className=" flex flex-col items-center h-full max-w-[444px] w-full mx-auto">
        <div className="flex items-center justify-center gap-2 max-w-[293px] w-full">
          <span className="w-[35px] h-[9px] rounded-[28px] bg-[#1D1D1F]"></span>
          <span className="w-[35px] h-[9px] rounded-[28px] bg-purple"></span>
          <span className="w-[35px] h-[9px] rounded-[28px] bg-[#1D1D1F]"></span>
        </div>
        <h1 className="text-fontlight text-3xl text-center font-bold capitalize my-4 tracking-wider">
          contact details
        </h1>

        <div className="space-y-[6px] w-full mt-5">
          <Label htmlFor="poc" className="text-fontlight font-normal">
            Point of Contact
          </Label>
          <Input
            id="poc"
            type="text"
            placeholder="number/email"
            onChange={pocInput}
            className={`rounded-[28px] bg-card/30 border-none placeholder:text-fontlight text-fontlight h-[56px]`}
          />
        </div>
        <div className="space-y-[6px] w-full mt-5">
          <Label htmlFor="social_media" className="text-fontlight font-normal">
            Social Media Links(twitter)
          </Label>
          <Input
            id="social_media"
            type="text"
            placeholder="add url"
            onChange={twitterInput}
            className={`rounded-[28px] bg-card/30 border-none placeholder:text-fontlight text-fontlight h-[56px]`}
          />
        </div>
        <div className="space-y-[6px] w-full mt-5">
          <Label htmlFor="social_media2" className="text-fontlight font-normal">
            Social Media Link(linkedin)
          </Label>
          <Input
            id="social_media2"
            type="text"
            placeholder="add url"
            onChange={linkedinInput}
            className={`rounded-[28px] bg-card/30 border-none placeholder:text-fontlight text-fontlight h-[56px]`}
          />
        </div>
        <div className="flex items-center justify-between max-w-[400px] mt-6 w-full">
          <button
            className="text-base text-fontlight font-medium rounded-[25px] px-6 py-3 border  border-card"
            onClick={() => setCurrentSlide("basic-info")}
          >
            Back
          </button>
          <button
            className="text-base text-black font-medium rounded-[25px] px-6 py-3 bg-purple ml-auto"
            onClick={() => handleContactDetailsSlide()}
          >
            Next
          </button>
        </div>
      </div>
    </main>
  );
}

export default ContactDetailsContainer;
