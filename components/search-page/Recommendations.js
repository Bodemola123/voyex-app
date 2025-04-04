"use client";
import { useState } from "react";
import { GrTag } from "react-icons/gr";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { TbFilter } from "react-icons/tb";
import ChatProductCard from "./ChatProductCard";
import { LuRefreshCw } from "react-icons/lu";

function Recommendations({ setShowRecommendations }) {

const [products] =useState([
    {id: 1, price: "$4.00 -$8.00"},
    {id: 2, price: "$4.00 -$8.00"},
    {id: 3, price: "Freemium"},
    {id: 4, price: "$4.00 -$8.00"}
])

  return (
    <div className="flex flex-col gap-9 w-full h-full bg-transparent p-6 text-[#f4f4f4] overflow-y-auto scrollbar-hide">
        <div className="flex flex-row gap-3 items-center justify-start">
                  {/* Back Button */}
      <button
        className="w-[48px] h-[32px] border border-card gap-2.5 flex items-center justify-center rounded-lg"
        onClick={() => setShowRecommendations(false)} // Hide recommendations when clicked
      >
        <MdKeyboardArrowLeft className="text-white text-[24px]" />
      </button>

      {/* Recommendation Content */}
      <p className="text-base font-bold">Showing Recommendations</p>
        </div>
        <div className="flex flex-col gap-6">
            <div className="flex flex-row justify-between">
                <h1 className="text-2xl font-bold">Content Creation</h1>
                <div className="flex flex-row gap-2">
          <button className="w-24 h-8 gap-3 text-sm rounded-3xl flex justify-center items-center bg-[#131314]">
            <TbFilter /> Filter
          </button>
          <button className="w-24 h-8 gap-3 text-sm rounded-3xl flex justify-center items-center bg-[#131314]">
            <GrTag className="transform scale-x-[-1]" /> Price
          </button>
          <button className="w-24 h-8 gap-3  text-sm rounded-3xl flex justify-center items-center bg-[#131314]">
            <HiOutlineSquares2X2 /> Rating
          </button>
                </div>
            </div>
            <div className="grid grid-cols-2 grid-rows-2 gap-4">
                {products.map((product) => (
                    <ChatProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
        <div className="flex flex-col gap-6">
            <div className="flex flex-row justify-between">
                <h1 className="text-2xl font-bold">Video Generation</h1>
                <div className="flex flex-row gap-2">
          <button className="w-24 h-8 gap-3 text-sm rounded-3xl flex justify-center items-center bg-[#131314]">
            <TbFilter /> Filter
          </button>
          <button className="w-24 h-8 gap-3 text-sm rounded-3xl flex justify-center items-center bg-[#131314]">
            <GrTag className="transform scale-x-[-1]" /> Price
          </button>
          <button className="w-24 h-8 gap-3  text-sm rounded-3xl flex justify-center items-center bg-[#131314]">
            <HiOutlineSquares2X2 /> Rating
          </button>
                </div>
            </div>
            <div className="grid grid-cols-2 grid-rows-2 gap-4">
                {products.map((product) => (
                    <ChatProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
        <div className="flex flex-row justify-between">
            <button className="px-12 py-4 rounded-3xl border border-[#FFFFFF26] font-medium">
                Give Feedback
            </button>
            <button className="flex flex-row gap-2.5 px-7 py-4 rounded-3xl bg-white text-[#0a0a0b] text-xl font-bold items-center justify-center">
                <p className="text-base">Suggest More Tools</p>
                <LuRefreshCw/>
            </button>
        </div>
    </div>
  );
}

export default Recommendations;
