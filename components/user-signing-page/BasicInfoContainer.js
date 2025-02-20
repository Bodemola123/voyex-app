import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import SkillLevelDropdown from "./SkillLevelDropdown";
import DynamicCard from "../common/DynamicCard";

function BasicInfoContainer({
  setUserFullName,
  setUserLanguage,
  setSkillLevel,
  setUserCountry,
  handleBasicInfoSlide,
  setCurrentSlide,
  loading,
}) {
  return (
    <main className="relative grid grid-cols-2 gap-1 w-full h-full z-[2] p-4 overflow-y-hidden overflow-x-hidden items-center justify-center">
      <DynamicCard/>
      <div className=" flex flex-col items-center max-w-[444px] w-full rounded-[29px] bg-black mx-auto overflow-y-scroll">
        <div className="flex items-center justify-center gap-2 max-w-[293px] w-full">
          <span className="w-[35px] h-[9px] rounded-[28px] bg-purple"></span>
          <span className="w-[35px] h-[9px] rounded-[28px] bg-[#1D1D1F]"></span>
        </div>
        <h1 className="text-fontlight text-3xl text-center font-bold capitalize my-4 tracking-wider">
          Basic Information
        </h1>

        <div className="space-y-1 w-full px-2">
          <Label htmlFor="name" className="text-fontlight font-normal">
            Full name
          </Label>
          <Input
            id="name"
            type="text"
            placeholder="Your name"
            onChange={(e) => setUserFullName(e.target.value)}
            className={`rounded-[28px] bg-card/30 border-none placeholder:text-fontlight text-fontlight placeholder:text-fontlight/20 h-[56px]`}
          />
        </div>
        <div className="space-y-[6px] w-full mt-5 px-2">
          <Label htmlFor="language" className="text-fontlight font-normal">
            Primary Language
          </Label>
          <Input
            id="language"
            type="text"
            placeholder="language"
            onChange={(e) => setUserLanguage(e.target.value)}
            className={`rounded-[28px] bg-card/30 border-none placeholder:text-fontlight text-fontlight placeholder:text-fontlight/20 h-[56px]`}
          />
        </div>
        <div className="space-y-[6px] w-full mt-5 px-2">
          <Label htmlFor="industry" className="text-fontlight font-normal">
            Skill Level
          </Label>
          <SkillLevelDropdown setSkillLevel={setSkillLevel} />
        </div>
        <div className="space-y-[6px] w-full mt-5 px-2">
          <Label htmlFor="country" className="text-fontlight font-normal">
            Region/TimeZone
          </Label>
          <Input
            id="country"
            type="text"
            placeholder="Country name"
            onChange={(e) => setUserCountry(e.target.value)}
            className={`rounded-[28px] bg-card/30 border-none placeholder:text-fontlight text-fontlight placeholder:text-fontlight/20 h-[56px]`}
          />
        </div>
        <div className="flex items-center justify-between max-w-[500px] py-6 w-full px-2">
          <button
            className="text-base text-fontlight font-medium rounded-[25px] px-6 py-3 border border-card"
            onClick={() => router.push("/search")}
          >
            Skip
          </button> 
          <button
            className="text-base text-black font-medium rounded-[25px] px-6 py-3 bg-purple ml-auto"
            onClick={() => handleBasicInfoSlide()}
          >
            Next
          </button>
        </div>
      </div>
    </main>
  );
}

export default BasicInfoContainer;
