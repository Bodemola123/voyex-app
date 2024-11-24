import React from "react";
import { Separator } from "../ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

function Profile() {
  return (
    <div className="w-full rounded-[25px] py-10 px-11 bg-gradient-to-r from-[#00A7661A] to-[#9999991A] border border-card backdrop-blur-[6.8px] mb-9">
      <h1 className="text-fontlight text-3xl font-normal capitalize">
        personalization
      </h1>
      <Separator className="my-5 bg-[#6D6D6D]" />
      {/*////////////*/}
      <div className="">
        <h2 className="text-xl font-normal text-fontlight">
          Introduce yourself for personalized answers. Share any information or
          instructions that the AI should know.
        </h2>
        <p className="text-sm font-thin text-[#d9d9d9] mt-2">
          Your profile is private and only used to instruct the AI to be more
          useful to you. Pause or clear your profile at any time.
        </p>
      </div>
      {/*////////////*/}
      <div className="mt-6">
        <h3 className="text-base font-normal text-fontlight">
          Introduce yourself, share what you like
        </h3>
        <Textarea
          className="max-w-[619px] min-h-[105px] rounded-3xl bg-[#171920] border-none px-4 py-4 mt-2"
          placeholder="Type your message here."
        />
      </div>
      {/*////////////*/}
      <div className="flex items-end justify-between mt-6 w-full">
        <div className="w-full">
          <h2 className="text-xl font-normal text-fontlight capitalize">
            location
          </h2>
          <Input
            type="text"
            className="max-w-[619px] w-full rounded-3xl bg-[#171920] border-none py-4 mt-2 placeholder:capitalize"
            placeholder="current location"
          />
        </div>
        <button className="text-base font-normal text-center text-[#032400] capitalize w-[170px] py-2 rounded-[22px] bg-btnlime">
          save
        </button>
      </div>
    </div>
  );
}

export default Profile;
