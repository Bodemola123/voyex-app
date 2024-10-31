import Image from "next/image";
import React from "react";

function ImageSide() {
  return (
    <figure className="w-1/2 h-full relative hidden lg:block lg:bg-transparent">
      <section className="fixed top-0 h-full w-1/2">
        <Image
          src="/planet.png"
          alt="smiling cartoon illustration art"
          decoding="async"
          width={500}
          height={400}
          className="absolute top-[50%] -translate-y-[50%] left-1/2 -translate-x-1/2 w-[80%]"
        />
        <h1 className="absolute top-[60%] text-[6vh] text-center font-medium mx-auto w-[90%]">
          Using AI driven engine we cater our suggestions to your specific needs
        </h1>
      </section>
    </figure>
  );
}

export default ImageSide;
