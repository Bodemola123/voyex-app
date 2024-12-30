import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function BasicInfoContainer({
  handleUserSignup,
  emailInput,
  countryInput,
  setCurrentSlide,
  loading,
}) {
  return (
    <main className="relative max-w-[666px] w-full h-[90vh] p-6 rounded-[29px] bg-black overflow-y-scroll">
      <div className=" flex flex-col items-center h-full max-w-[444px] w-full mx-auto">
        <div className="flex items-center justify-center gap-2 max-w-[293px] w-full">
          <span className="w-[35px] h-[9px] rounded-[28px] bg-purple"></span>
          <span className="w-[35px] h-[9px] rounded-[28px] bg-[#1D1D1F]"></span>
          <span className="w-[35px] h-[9px] rounded-[28px] bg-[#1D1D1F]"></span>
        </div>
        <h1 className="text-fontlight text-3xl text-center font-bold capitalize my-4 tracking-wider">
          basic user information
        </h1>

        <div className="space-y-1 w-full">
          <Label htmlFor="email" className="text-fontlight font-normal">
            Email address
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Your email"
            onChange={emailInput}
            className="rounded-[28px] bg-card/30 border-none placeholder:text-fontlight text-fontlight h-[56px]"
          />
        </div>
        <div className="space-y-[6px] w-full mt-5">
          <Label htmlFor="country" className="text-fontlight font-normal">
            Country
          </Label>
          <Input
            id="country"
            type="text"
            placeholder="Country name"
            onChange={countryInput}
            className={`rounded-[28px] bg-card/30 border-none placeholder:text-fontlight text-fontlight h-[56px]`}
          />
        </div>
        <div className="space-y-[6px] w-full mt-5">
          <Label htmlFor="user_type" className="text-fontlight font-normal">
            User Type
          </Label>
          <Input
            id="user_type"
            type="text"
            placeholder="regular"
            // onChange={industryInput}
            value="Regular"
            disabled
            className={`rounded-[28px] bg-card/30 border-none placeholder:text-fontlight text-fontlight h-[56px]`}
          />
        </div>
        <div className="flex items-center justify-between max-w-[400px] mt-6 w-full">
          <button
            className="text-base text-fontlight font-medium rounded-[25px] px-6 py-3 border border-card"
            onClick={() => setCurrentSlide("signing")}
          >
            Return
          </button>
          <button
            className="text-base text-black font-medium rounded-[25px] px-6 py-3 bg-purple"
            onClick={() => handleUserSignup()}
          >
            {loading ? (
              <AiOutlineLoading3Quarters className="animate-spin text-black" />
            ) : (
              "Sign Up"
            )}
          </button>
        </div>
      </div>
    </main>
  );
}

export default BasicInfoContainer;
