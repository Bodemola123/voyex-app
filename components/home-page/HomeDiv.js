"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { FaChevronRight } from "react-icons/fa";

function HomeDiv() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center max-w-[500px] w-full">
      <h1 className="text-8xl text-white font-bold">Voyex.</h1>
      <p className="flex items-center gap-1 text-base font-normal mt-9">
        Search for <span className="text-btnlime">anything</span>
      </p>

      <button
        className="flex items-center justify-center gap-3 text-base font-medium text-btnlime max-w-80 w-full p-3 border border-btnlime rounded-lg mt-3 hover:max-w-[390px] transition-all btn-start"
        onClick={() => router.push("/search")}
      >
        <div className="flex items-center gap-2">
          <span className="">Start Your Complete AI Journey</span>
          <div className="relative w-4 h-[2px] bg-btnlime rounded-xl arrow transition-all">
            <FaChevronRight className="absolute -top-[7px] -right-[7px]" />
          </div>
        </div>
      </button>
    </div>
  );
}

export default HomeDiv;
