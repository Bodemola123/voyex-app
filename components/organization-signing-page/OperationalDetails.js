"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import TargetAudienceDropdown from "./TargetAudienceDropdown";

function OperationalDetails({
  handleUploadDetails,
  serviceInput,
  techUsedInput,
  setOrgAudience,
  loading,
  setCurrentSlide,
}) {
  return (
    <main className="relative max-w-[666px] w-full h-[90vh] p-6 rounded-[29px] bg-black overflow-y-scroll">
      <div className=" flex flex-col items-center h-full max-w-[444px] w-full mx-auto">
        <div className="flex items-center justify-center gap-2 max-w-[293px] w-full">
          <span className="w-[35px] h-[9px] rounded-[28px] bg-[#1D1D1F]"></span>
          <span className="w-[35px] h-[9px] rounded-[28px] bg-[#1D1D1F]"></span>
          <span className="w-[35px] h-[9px] rounded-[28px] bg-purple"></span>
        </div>
        <h1 className="text-fontlight text-3xl text-center font-bold capitalize my-4 tracking-wider">
          operational details
        </h1>

        <div className="space-y-[6px] w-full">
          <Label htmlFor="email" className="text-fontlight font-normal">
            Services/Products Offered
          </Label>
          <Input
            id="email"
            type="text"
            placeholder="service"
            onChange={serviceInput}
            className={`rounded-[28px] bg-card/30 border-none placeholder:text-fontlight text-fontlight h-[56px]`}
          />
        </div>
        <div className="space-y-[6px] w-full mt-5">
          <Label
            htmlFor="primary_contact_name"
            className="text-fontlight font-normal"
          >
            Target Audience
          </Label>
          {/* <Input
            id="primary_contact_name"
            type="text"
            placeholder="student"
            onChange={audienceInput}
            className={`rounded-[28px] bg-card/30 border-none placeholder:text-fontlight text-fontlight h-[56px]`}
          /> */}
          <TargetAudienceDropdown setOrgAudience={setOrgAudience} />
        </div>
        <div className="space-y-[6px] w-full mt-5">
          <Label htmlFor="tech" className="text-fontlight font-normal">
            Technologies Used
          </Label>
          <Input
            id="tech"
            type="text"
            placeholder="tech"
            onChange={techUsedInput}
            className={`rounded-[28px] bg-card/30 border-none placeholder:text-fontlight text-fontlight h-[56px]`}
          />
        </div>
        <div className="flex items-center justify-between max-w-[500px] mt-6 w-full">
          <button
            className="text-base text-fontlight font-medium rounded-[25px] px-6 py-3 border border-card"
            onClick={() => setCurrentSlide("contact-details")}
          >
            Back
          </button>
          <button
            className="text-base text-black font-medium rounded-[25px] px-6 py-3  bg-purple"
            onClick={() => handleUploadDetails()}
          >
            {loading ? (
              <AiOutlineLoading3Quarters className="animate-spin text-black" />
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </div>
    </main>
  );
}

export default OperationalDetails;
