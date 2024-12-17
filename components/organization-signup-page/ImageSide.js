import Image from "next/image";
import React from "react";

function ImageSide() {
  return (
    <figure className="w-[45%] h-full relative hidden lg:block lg:bg-transparent">
      <section className="fixed top-0 h-full w-[45%]">
        <Image
          src="/planet.png"
          alt="smiling cartoon illustration art"
          decoding="async"
          width={500}
          height={400}
          className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[90%]"
        />
        <h1 className="absolute top-[60%] text-[5vh] text-right font-medium mx-auto w-[80%]">
          Using AI driven engine we cater our suggestions to your specific needs
        </h1>
      </section>
    </figure>
  );
}

export default ImageSide;
