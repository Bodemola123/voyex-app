import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function BasicInfoContainer({
  handleSignup,
  emailInput,
  websiteInput,
  industryInput,
  locationInput,
  setCurrentSlide,
  instaSocialInput,
  yearFoundedInput,
  toolsAmountInput,
  loading,
}) {
  return (
    <main className="relative max-w-[666px] w-full h-[90vh] p-6 rounded-[29px] bg-black overflow-y-scroll">
      <div className=" flex flex-col items-center h-full max-w-[444px] w-full mx-auto">
        <div className="flex items-center justify-center gap-2 max-w-[293px] w-full">
          <span className="w-[35px] h-[9px] rounded-[28px] bg-purple"></span>
          <span className="w-[35px] h-[9px] rounded-[28px] bg-[#1D1D1F]"></span>
          <span className="w-[35px] h-[9px] rounded-[28px] bg-[#1D1D1F]"></span>
          <span className="w-[35px] h-[9px] rounded-[28px] bg-[#1D1D1F]"></span>
          <span className="w-[35px] h-[9px] rounded-[28px] bg-[#1D1D1F]"></span>
        </div>
        <h1 className="text-fontlight text-3xl text-center font-bold capitalize my-4 tracking-wider">
          basic organization information
        </h1>

        <div className="space-y-[6px] w-full">
          <Label htmlFor="email" className="text-fontlight font-normal">
            Email Address
          </Label>
          <Input
            id="email"
            type="text"
            placeholder="Your org email"
            onChange={emailInput}
            className={`rounded-[28px] bg-card/30 border-none placeholder:text-fontlight text-fontlight h-[56px]`}
          />
        </div>
        <div className="space-y-[6px] w-full mt-5">
          <Label htmlFor="website" className="text-fontlight font-normal">
            Website URL
          </Label>
          <Input
            id="website"
            type="text"
            placeholder="Add url"
            onChange={websiteInput}
            className={`rounded-[28px] bg-card/30 border-none placeholder:text-fontlight text-fontlight h-[56px]`}
          />
        </div>
        <div className="space-y-[6px] w-full mt-5">
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
        </div>
        <div className="space-y-[6px] w-full mt-5">
          <Label htmlFor="location" className="text-fontlight font-normal">
            Location
          </Label>
          <Input
            id="location"
            type="text"
            placeholder="Select location"
            onChange={locationInput}
            className={`rounded-[28px] bg-card/30 border-none placeholder:text-fontlight text-fontlight h-[56px]`}
          />
        </div>
        <div className="space-y-[6px] w-full mt-5">
          <Label htmlFor="social_media" className="text-fontlight font-normal">
            Social Media Links
          </Label>
          <Input
            id="social_media"
            type="text"
            placeholder="add url"
            onChange={instaSocialInput}
            className={`rounded-[28px] bg-card/30 border-none placeholder:text-fontlight text-fontlight h-[56px]`}
          />
        </div>
        <div className="flex items-center justify-between gap-2 mt-5 w-full">
          <div className="space-y-[6px] w-full">
            <Label
              htmlFor="year_founded"
              className="text-fontlight font-normal"
            >
              Year Founded
            </Label>
            <Input
              id="year_founded"
              type="number"
              placeholder="2024"
              onChange={yearFoundedInput}
              className={`rounded-[28px] bg-card/30 border-none placeholder:text-fontlight text-fontlight h-[56px]`}
            />
          </div>
          <div className="space-y-[6px] w-full ">
            <Label
              htmlFor="tools_amount"
              className="text-fontlight font-normal"
            >
              Tools Amount
            </Label>
            <Input
              id="tools_amount"
              type="number"
              placeholder="2"
              onChange={toolsAmountInput}
              className={`rounded-[28px] bg-card/30 border-none placeholder:text-fontlight text-fontlight h-[56px]`}
            />
          </div>
        </div>
        <div className="flex items-center justify-between max-w-[500px] mt-6 w-full">
          <button
            className="text-base text-fontlight font-medium rounded-[25px] px-6 py-3 border border-card"
            onClick={() => setCurrentSlide("signing")}
          >
            Return
          </button>
          <button
            className="text-base text-black font-medium rounded-[25px] px-6 py-3 bg-purple"
            onClick={() => handleSignup()}
          >
            {loading ? (
              <AiOutlineLoading3Quarters className="animate-spin text-black" />
            ) : (
              "Sign up"
            )}
          </button>
        </div>
      </div>
    </main>
  );
}

export default BasicInfoContainer;
