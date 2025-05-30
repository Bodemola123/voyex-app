import React from 'react'
import { GoPlus } from 'react-icons/go'
import { IoCube } from 'react-icons/io5'

const FirstAddModelpage = ({ openModal }) => {
    return (
      <div className="bg-[#0a0a0b] rounded-[23px] gap-[24px] flex flex-col p-6 max-w-[557px] max-h-[344px] shadow-[0px_0px_20px_4px_rgba(255,255,255,0.13)]">
        <div className="flex items-center justify-start">
          <div className="flex p-3 rounded-[49px] bg-[#131314]">
            <IoCube className="text-[#ffffff] text-[41px]" />
          </div>
        </div>
        <div className="flex flex-col gap-6 max-w-[509px]">
          <p className="text-4xl text-[#ffffff] font-bold">Create first version of your tool</p>
          <p className="text-base font-normal text-[#FFFFFF]">Upload tool files and create the first version of your tool.</p>
        </div>
        <div className="flex items-center justify-center gap-2 text-xl">
          <button onClick={openModal} className="py-4 px-9 rounded-[27px] flex flex-row gap-2.5 bg-[#c088fb] text-[#0a0a0b] hover:scale-105 ">
            <GoPlus className="text-[24px]" />
            <p className="text-base">Add first tool</p>
          </button>
        </div>
      </div>
    );
  };
  
  export default FirstAddModelpage;
  