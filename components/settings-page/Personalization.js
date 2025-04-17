"use client"
import React, { useEffect, useState } from "react";
import { Separator } from "../ui/separator";
import Image from "next/image";

function Personalization() {

  const [userEmail, setUserEmail] = useState("henryjnr9@gmail.com");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedEmail = localStorage.getItem("userEmail");
      if (savedEmail) {
        setUserEmail(savedEmail);
      }
    }
  }, []);

  return (
    <div className="w-full rounded-[25px] py-10 px-11 bg-secondary mb-9">
      <h1 className="text-fontlight text-base font-normal capitalize">
        personalization
      </h1>
      <Separator className="my-5 bg-[#6D6D6D]" />
      {/*////////////*/}
      <div className="flex items-center justify-between">
        <div className="">
          <h2 className="text-base font-normal text-fontlight">Avatar</h2>
          <p className="text-base font-thin text-[#d9d9d9] mt-2">
            The language used in the user interface
          </p>
        </div>
        <button className="relative h-[4.88rem] w-[4.88rem] rounded-full border-[4px] border-[#0075FF] bg-[#d9d9d9]">
          <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-xs font-light text-white capitalize bg-[#0075FF] w-[4.5rem] py-1 rounded-2base">
            free user
          </span>
        </button>
      </div>
      {/*////////////*/}
      <div className="flex items-center justify-between mt-6">
        <h2 className="text-base font-normal text-fontlight capitalize">
          Username
        </h2>
        <button className="flex items-center gap-3 px-4 py-3 rounded-[36px] border border-card bg-card/20 hover:bg-card/50 transition-all">
          <span className="text-base font-normal text-fontlight">Henryjnr9</span>
          <Image src="/edit.png" alt="edit" width={20} height={20} />
        </button>
      </div>
      {/*////////////*/}
      <div className="flex items-center justify-between mt-6">
        <h2 className="text-base font-normal text-fontlight capitalize">email</h2>
        <button className="flex items-center gap-3 px-4 py-3 rounded-[36px] border border-card bg-card/20">
          <span className="text-base font-normal text-fontlight">
          {userEmail}
          </span>
        </button>
      </div>
      {/*////////////*/}
      <div className="flex items-center justify-between mt-6">
        <div className="">
          <h2 className="text-base font-normal text-fontlight capitalize">
            AI Data Retention
          </h2>
          <p className="text-base font-thin text-[#d9d9d9] mt-2">
            AI Data Retention allows Perplexity to use your searches to improve
            AI models. Enable this setting if you wish to exclude your data from
            this process
          </p>
        </div>
        <button className="flex items-center gap-3 px-4 py-3 rounded-[36px] border border-card bg-card/20 hover:bg-card/50 transition-all">
          <span className="text-base font-normal text-fontlight capitalize">
            disabled
          </span>
        </button>
      </div>
    </div>
  );
}

export default Personalization;
