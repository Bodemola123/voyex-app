import Image from "next/image";
import Link from "next/link";
import React from "react";

function EmailVerify() {
  return (
    <main className="relative max-w-[666px] w-full h-[90vh] p-6 rounded-[29px] bg-black overflow-y-scroll">
      <div className=" flex flex-col items-center justify-center gap-7 h-full">
        <Image
          src="/loading.png"
          alt="loading"
          width={136}
          height={136}
          className="animate-spin"
        />
        <h1 className="text-fontlight text-3xl font-bold text-center">
          Verify Email Authentication
        </h1>
        <p className="text-base text-fontlight text-center font-normal">
          We&apos;ve sent a mail with an activation code
          <br /> to your email
          <span className="font-bold ml-2">hen***@gmail.com</span>
        </p>
        <div className="grid grid-cols-4 gap-2 max-w-[440px] w-full">
          <input
            type="number"
            maxLength={1}
            className="h-[76px] bg-card/30 rounded-[28px] w-auto p-4 text-3xl text-center outline-none"
          />
          <input
            type="number"
            maxLength={1}
            className="h-[76px] bg-card/30 rounded-[28px] w-auto p-4 text-3xl text-center outline-none"
          />
          <input
            type="number"
            maxLength={1}
            className="h-[76px] bg-card/30 rounded-[28px] w-auto p-4 text-3xl text-center outline-none"
          />
          <input
            type="number"
            maxLength={1}
            className="h-[76px] bg-card/30 rounded-[28px] w-auto p-4 text-3xl text-center outline-none"
          />
        </div>
        <p className="flex items-center gap-2 text-base text-fontlight font-medium">
          Send code again
          <span className="text-purple font-normal">00:20</span>
        </p>
        <p className="text-[#F54135] text-base font-normal opacity-0">
          Wrong code, please try again
        </p>
      </div>
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center justify-center gap-3 text-base font-normal text-purple">
        <Link href="/terms_of_use" className="">
          Terms of use
        </Link>
        <Link href="/privacy_policy" className="">
          Privacy Policy
        </Link>
      </div>
    </main>
  );
}

export default EmailVerify;
