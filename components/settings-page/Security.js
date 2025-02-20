import { Separator } from "@/components/ui/separator";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";

function Security() {
  return (
    <div className="w-full rounded-[25px] py-10 px-11 bg-secondary mb-9">
      <h1 className="text-fontlight text-3xl font-normal capitalize">
        security
      </h1>
      <Separator className="my-5 bg-[#6D6D6D]" />
      {/*////////////*/}
      <div className="flex items-center justify-between gap-5">
        <div className="">
          <h2 className="text-xl font-normal text-fontlight">
            Multi-factor authentication
          </h2>
          <p className="text-sm font-thin text-[#d9d9d9] mt-2">
            Require an extra security challenge when logging in. If you are
            unable to pass this challenge, you will have the option to recover
            your account via emai
          </p>
        </div>
        <button className="flex items-center gap-3 px-4 py-3 rounded-[36px] border border-card bg-card/20">
          <span className="text-xl font-normal text-fontlight capitalize">
            enabled
          </span>
          <FaChevronDown />
        </button>
      </div>
      {/*////////////*/}
      <div className="flex items-center justify-between gap-5 mt-6">
        <div className="">
          <h2 className="text-xl font-normal text-fontlight capitalize">
            Log out of all devices
          </h2>
          <p className="text-sm font-thin text-[#d9d9d9] mt-2">
            Log out of all active sessions across all devices, including your
            current session. It may take up to 30 minutes for other devices to
            be logged out.
          </p>
        </div>
        <button className="block text-xl font-normal text-fontlight w-[170px] py-3 rounded-[36px] border border-card bg-card/20">
          Log out all
        </button>
      </div>
      {/*////////////*/}
      <div className="flex items-center justify-between mt-6">
        <div className="">
          <h2 className="text-xl font-normal text-fontlight capitalize">
            Active account
          </h2>
          <p className="text-sm font-thin text-[#d9d9d9] mt-2">
            You are signed in as henryjnr96486
          </p>
        </div>
        <button className="flex items-center gap-3 px-9 py-3 rounded-[36px] border border-card bg-red-500 text-xl font-normal text-fontlight">
          Log out
        </button>
      </div>
    </div>
  );
}

export default Security;
