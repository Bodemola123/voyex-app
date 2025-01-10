"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

function OrgUploadSuccess() {
  const router = useRouter();
  return (
    <main className="relative max-w-[666px] w-full h-[90vh] p-6 rounded-[29px] bg-black overflow-y-scroll">
      <div className=" flex flex-col items-center gap-7 h-full">
        <Image
          src="/loading.png"
          alt="loading"
          width={136}
          height={136}
          className=""
        />
        <h1 className="text-fontlight text-3xl font-bold text-center">
          Data Upload Successful
        </h1>
        <p className="text-base text-fontlight text-center font-light">
          Your account data has been uploaded
          <br /> successfully
        </p>
        <div className="flex items-center justify-between max-w-[400px] w-full">
          {/* <button
            className="text-base text-fontlight font-medium rounded-[25px] px-6 py-3 border  border-card"
            onClick={() => router.push("/search")}
          >
            Skip
          </button> */}
          <button
            className="text-base text-black font-medium rounded-[25px] px-6 py-3 bg-purple"
            onClick={() => router.push("/search")}
          >
            Continue
          </button>
        </div>
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

export default OrgUploadSuccess;
