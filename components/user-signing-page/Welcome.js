"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

function Welcome() {
  const router = useRouter();
  return (
    <main className="relative max-w-[666px] w-full h-[600px] z-[2] flex flex-col items-center justify-center p-6 rounded-[29px] bg-[#0D0D0D] overflow-y-scroll shadow-1s">
      <div className=" flex flex-col items-center justify-center h-full">
        <h2 className="text-center text-4xl font-bold text-fontlight capitalize">
          explore voyex
        </h2>
        <p className="text-center mt-[11px] ">
          Find the right AI tools and workflows
          <br /> tailored to your use case
        </p>
        <div className="flex flex-col items-center gap-[0.90rem] w-full mt-[50px]">
          <button
            className="capitalize text-[#131314] text-base font-medium text-center py-4 max-w-[353px] w-full bg-purple rounded-[60px]"
            onClick={() => router.push("/auth/user")}
          >
            single user
          </button>
          <button
            className="capitalize text-[#131314] text-base font-medium text-center py-4 max-w-[353px] w-full bg-purple rounded-[60px]"
            onClick={() => router.push("/auth/organization")}
          >
            organization
          </button>
        </div>
      </div>
      <p className="absolute bottom-8 text-center text-fontlight text-base font-normal">
        By creating an account or signing you agree to our
        <br />
        <a href="https://voyex-landing.vercel.app/terms" target="_blank" rel="noopener noreferrer" className="text-purple font-medium">
          Terms and Condition
        </a>
      </p>
    </main>
  );
}

export default Welcome;
