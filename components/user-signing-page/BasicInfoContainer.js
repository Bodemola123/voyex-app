import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import SkillLevelDropdown from "./SkillLevelDropdown";
import DynamicCard from "../common/DynamicCard";
import CountryDropdown from "./CountryDropdown";
import LanguageDropdown from "./Languagedropdown";

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
      <div className=" flex flex-col items-center max-w-[444px] py-10 px-4 w-full h-max rounded-[29px] bg-[#0D0D0D] mx-auto border border-[#D0D5DD1A] overflow-y-scroll">
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
            className={`rounded-[28px] bg-[#0A0A0B]  border-none placeholder:text-fontlight text-fontlight placeholder:text-fontlight/20 h-[56px] focus:ring-0 focus:outline-none focus:border-none focus:shadow-none`}
          />
        </div>
        <div className="space-y-[6px] w-full mt-5 px-2">
          <Label htmlFor="language" className="text-fontlight font-normal">
            Primary Language
          </Label>
          <LanguageDropdown setUserLanguage={setUserLanguage} />
        </div>
        <div className="space-y-[6px] w-full mt-5 px-2">
          <Label htmlFor="industry" className="text-fontlight font-normal">
            AI Exposure
          </Label>
          <SkillLevelDropdown setSkillLevel={setSkillLevel} />
        </div>
        <div className="space-y-[6px] w-full mt-5 px-2">
          <Label htmlFor="country" className="text-fontlight font-normal">
            Country of residence
          </Label>
          <CountryDropdown setUserCountry={setUserCountry}/>
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
