import { Separator } from "@/components/ui/separator";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";

function DataControl() {
  return (
    <div className="w-full rounded-[25px] py-10 px-11 bg-secondary mb-9">
      <h1 className="text-fontlight text-3xl font-normal capitalize">
        data control
      </h1>
      <Separator className="my-5 bg-[#6D6D6D]" />
      {/*////////////*/}
      <div className="flex items-center justify-between gap-5">
        <div className="">
          <h2 className="text-xl font-normal text-fontlight">
            Improve the model for everyone
          </h2>
          <p className="text-sm font-thin text-[#d9d9d9] mt-2">
            Allow your content to be used to train our models, which makes VOYEX
            better for you and everyone who uses it. We take steps to protect
            your privacy. Learn more
          </p>
        </div>
        <button className="flex items-center gap-3 px-4 py-3 rounded-[36px] border border-card bg-card/20 hover:bg-card/50 transition-all">
          <span className="text-xl font-normal text-fontlight capitalize">
            allowed
          </span>
          <FaChevronDown />
        </button>
      </div>
      {/*////////////*/}
      <div className="flex items-center justify-between mt-6">
        <div className="">
          <h2 className="text-xl font-normal text-fontlight capitalize">
            Shared links
          </h2>
          <p className="text-sm font-thin text-[#d9d9d9] mt-2">
            Enable dropdown and tab-complete suggestions while typing a query
          </p>
        </div>
        <button className="flex items-center gap-3 px-4 py-3 hover:underline transition-all">
          <span className="text-xl font-normal text-fontlight capitalize">
            see links
          </span>
          <FaChevronRight />
        </button>
      </div>
      {/*////////////*/}
      <div className="flex items-center justify-between mt-6">
        <div className="">
          <h2 className="text-xl font-normal text-fontlight capitalize">
            Export data
          </h2>
          <p className="text-sm font-thin text-[#d9d9d9] mt-2">
            The language used in the user interface
          </p>
        </div>
        <button className="flex items-center gap-3 px-4 py-3 rounded-[36px] border border-card bg-card/20 hover:bg-card/50 transition-all">
          <span className="text-xl font-normal text-fontlight capitalize">
            manage
          </span>
        </button>
      </div>
      {/*////////////*/}
      <div className="flex items-center justify-between mt-6">
        <div className="">
          <h2 className="text-xl font-normal text-fontlight capitalize">
            Delete Account
          </h2>
          <p className="text-sm font-thin text-[#d9d9d9] mt-2">
            Delete user account
          </p>
        </div>
        <button className="flex items-center gap-3 px-9 py-3 rounded-[36px] border border-card bg-red-500 hover:bg-red-500/50 transition-all">
          <span className="text-xl font-normal text-fontlight capitalize">
            delete
          </span>
        </button>
      </div>
    </div>
  );
}

export default DataControl;
