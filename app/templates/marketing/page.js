import Image from "next/image";
import React from "react";

function Marketing() {
  return (
    <div className="w-full">
      <h1 className="text-5xl leading-[61.44px] text-white font-bold">
        Streamline Your Marketing Efforts! Clear Steps for Every Approach
      </h1>

      <Image
        src="/video-pic.png"
        alt="video"
        width={731}
        height={354}
        className="mt-6 w-full h-auto inline-flex"
      />
    </div>
  );
}

export default Marketing;
