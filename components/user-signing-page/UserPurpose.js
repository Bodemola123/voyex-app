import React from "react";
import { IoIosAdd } from "react-icons/io";
import DynamicCard from "../common/DynamicCard";

function UserPurpose({
  usage,
  clickedButtons,
  handleButtonClick,
  handleUploadDetails,
}) {
  return (
    <main className="relative grid grid-cols-2 gap-1 w-full h-full z-[2] p-4 overflow-y-hidden overflow-x-hidden items-center justify-center">
      <DynamicCard/>
      <section className=" flex flex-col items-center max-w-[650px] w-full mx-auto px-2 py-10 rounded-[29px] bg-[#1C1D1F] border border-[#D0D5DD1A] overflow-y-scroll">
        <div className="flex items-center justify-center gap-2 max-w-[293px] w-full">
          <span className="w-[35px] h-[9px] rounded-[28px] bg-[#1D1D1F]"></span>
          <span className="w-[35px] h-[9px] rounded-[28px] bg-purple"></span>
        </div>
        <h1 className="text-fontlight text-3xl text-center font-bold capitalize my-4 tracking-wider">
          Purpose and Usage Goals
        </h1>

        <div className="flex items-center justify-center flex-wrap gap-2.5 w-full mt-[30px]">
          {usage.map((btn, i) => (
            <button
              key={i}
              className={`flex items-center justify-center gap-1 text-base font-normal text-fontlight h-[56px] px-4 bg-card/20 hover:bg-card/40 transition-all rounded-[28px] border-[1.5px] border-purple ${
                clickedButtons.includes(btn.name)
                  ? "border-opacity-100"
                  : "border-opacity-0"
              }`}
              onClick={() => handleButtonClick(btn.name)}
            >
              {btn.name}
              <span className={`text-xl`}>
                <IoIosAdd
                  className={`transition-transform duration-300 ${
                    clickedButtons.includes(btn.name) ? "rotate-45" : "rotate-0"
                  }`}
                />
              </span>
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between max-w-[500px] py-6 w-full">
           <button
            className="text-base text-fontlight font-medium rounded-[25px] px-6 py-3 border border-card"
            onClick={() => router.push("/search")}
          >
            Skip
          </button>
          <button
            className="text-base text-black font-medium rounded-[25px] px-6 py-3 bg-purple hover:bg-purple/70 transition-all ml-auto"
            onClick={() => handleUploadDetails()}
          >
            Save Changes
          </button>
        </div>
      </section>
    </main>
  );
}

export default UserPurpose;
