"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import TargetAudienceDropdown from "./TargetAudienceDropdown";
import { useRouter } from "next/navigation";
import DynamicCard from "../common/DynamicCard";

function OperationalDetails({
  handleOperationDetailsSlide,
  serviceInput,
  techUsedInput,
  setOrgAudience,
  loading,
  setCurrentSlide,
  setSpecialization
}) {
  const router = useRouter();
  return (
    <main className="relative grid grid-cols-2 gap-1 w-full h-full z-[2] p-4 overflow-y-auto overflow-x-hidden scrollbar-hide items-center justify-center">
      <DynamicCard/>
      <div className=" flex flex-col items-center justify-center h-full max-w-[444px] py-[33px] w-full mx-auto rounded-[29px] border border-[#D0D5DD1A] bg-black text-white overflow-y-scroll scrollbar-hide">
      <p className="text-center font-bold text-5xl mb-5">Voyex</p>
        <div className="flex items-center justify-center gap-2 max-w-[293px] w-full">
          <span className="w-[35px] h-[9px] rounded-[28px] bg-[#1D1D1F]"></span>
          <span className="w-[35px] h-[9px] rounded-[28px] bg-[#1D1D1F]"></span>
          <span className="w-[35px] h-[9px] rounded-[28px] bg-[#c088fb]"></span>
          <span className="w-[35px] h-[9px] rounded-[28px] bg-[#1D1D1F]"></span>
          <span className="w-[35px] h-[9px] rounded-[28px] bg-[#1D1D1F]"></span>
          <span className="w-[35px] h-[9px] rounded-[28px] bg-[#1D1D1F]"></span>
        </div>
        <h1 className="text-white text-3xl text-center font-bold capitalize my-4 tracking-wider">
          operational details
        </h1>

        <div className="space-y-[6px] w-full px-2">
          <Label htmlFor="email" className="text-white font-normal">
            Services/Products Offered
          </Label>
          <Input
            id="email"
            type="text"
            placeholder="service"
            onChange={serviceInput}
            className={`rounded-[28px] bg-card/30 border-none placeholder:text-white/20 text-white h-[56px]`}
          />
        </div> 
        <div className="space-y-[6px] w-full mt-5 px-2">
          <Label
            htmlFor="primary_contact_name"
            className="text-white font-normal"
          >
            Target Audience
          </Label>
          <TargetAudienceDropdown setOrgAudience={setOrgAudience} />
        </div>
        <div className="space-y-[6px] w-full mt-5 px-2">
          <Label htmlFor="tech" className="text-white font-normal">
            Technologies Used
          </Label>
          <Input
            id="tech"
            type="text"
            placeholder="tech"
            onChange={techUsedInput}
            className={`rounded-[28px] bg-card/30 border-none placeholder:text-white/20 text-white h-[56px]`}
          />
        </div>
        <div className="space-y-[6px] w-full mt-5 px-2">
          <Label htmlFor="tech" className="text-white font-normal">
            Specialization
          </Label>
          <Input
            id="specialization"
            type="text"
            placeholder="Specialization"
            onChange={setSpecialization}
            className={`rounded-[28px] bg-card/30 border-none placeholder:text-white/20 text-white h-[56px]`}
          />
        </div>
        <div className="flex items-center justify-between max-w-[500px] mt-6 w-full">
          <button
            className="text-base text-white font-medium rounded-[25px] px-6 py-3 border border-card"
            onClick={() => setCurrentSlide("contact-details")}
          >
            Back
          </button>
          <button
            className="text-base text-black font-medium rounded-[25px] px-6 py-3  bg-[#c088fb] hover:bg-[#c088fb]/70 transition-all"
            onClick={ handleOperationDetailsSlide}
          >
          Next
          </button>
        </div>
      </div>
    </main>
  );
}

export default OperationalDetails;
