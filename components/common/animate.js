import Image from "next/image";
import React from "react";

function Animate() {
  return (
    <>
      <div className="fixed w-full h-full">
        <div className="relative w-full h-full animate-1">
          <Image
            className="absolute right-[500px] top-40 bg-contain "
            src="/chatgpt.svg"
            alt="chatgpt image"
            width={20}
            height={20}
          />
        </div>
      </div>
      <div className="fixed w-full h-full">
        <div className="relative w-full h-full animate-2">
          <Image
            className="absolute left-96 top-80 bg-contain "
            src="/gemini.png"
            alt="gemini image"
            width={24}
            height={24}
          />
        </div>
      </div>
      <div className="fixed w-full h-full">
        <div className="relative w-full h-full animate-3">
          <Image
            className="absolute right-96 bottom-36 bg-contain "
            src="/synthesia.png"
            alt="synthesia image"
            width={15}
            height={15}
          />
        </div>
      </div>
    </>
  );
}

export default Animate;
