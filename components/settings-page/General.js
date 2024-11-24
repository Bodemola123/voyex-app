import { Separator } from "@/components/ui/separator";
import { FaChevronDown } from "react-icons/fa";
import FlexibleFooter from "../common/FlexibleFooter";

function General() {
  return (
    <>
      <div className="w-full rounded-[25px] py-10 px-11 bg-gradient-to-r from-[#00A7661A] to-[#9999991A] border border-card backdrop-blur-[6.8px] mb-9">
        <h1 className="text-fontlight text-3xl font-normal capitalize">
          General
        </h1>
        <Separator className="my-5 bg-[#6D6D6D]" />
        {/*////////////*/}
        <div className="flex items-center justify-between">
          <div className="">
            <h2 className="text-xl font-medium text-fontlight">Language</h2>
            <p className="text-sm font-thin text-[#d9d9d9] mt-2">
              The language used in the user interface
            </p>
          </div>
          <button className="flex items-center gap-3 px-4 py-3 rounded-[36px] border border-card bg-card/20">
            <span className="text-xl font-medium text-fontlight capitalize">
              auto detect
            </span>
            <FaChevronDown />
          </button>
        </div>
        {/*////////////*/}
        <div className="flex items-center justify-between mt-6">
          <div className="">
            <h2 className="text-xl font-medium text-fontlight capitalize">
              Enable Auto suggestions
            </h2>
            <p className="text-sm font-thin text-[#d9d9d9] mt-2">
              Enable dropdown and tab-complete suggestions while typing a query
            </p>
          </div>
          <button className="flex items-center gap-3 px-4 py-3 rounded-[36px] border border-card bg-card/20">
            <span className="text-xl font-medium text-fontlight capitalize">
              enabled
            </span>
            <FaChevronDown />
          </button>
        </div>
        {/*////////////*/}
        <div className="flex items-center justify-between mt-6">
          <div className="">
            <h2 className="text-xl font-medium text-fontlight capitalize">
              Archived Chats
            </h2>
            <p className="text-sm font-thin text-[#d9d9d9] mt-2">
              The language used in the user interface
            </p>
          </div>
          <button className="flex items-center gap-3 px-4 py-3 rounded-[36px] border border-card bg-card/20">
            <span className="text-xl font-medium text-fontlight capitalize">
              manage
            </span>
          </button>
        </div>
        {/*////////////*/}
        <div className="flex items-center justify-between mt-6">
          <div className="">
            <h2 className="text-xl font-medium text-fontlight capitalize">
              Archive all Chats
            </h2>
            <p className="text-sm font-thin text-[#d9d9d9] mt-2">
              The language used in the user interface
            </p>
          </div>
          <button className="flex items-center gap-3 px-4 py-3 rounded-[36px] border border-card bg-card/20">
            <span className="text-xl font-medium text-fontlight capitalize">
              Archive all
            </span>
          </button>
        </div>
        {/*////////////*/}
        <div className="flex items-center justify-between mt-6">
          <div className="">
            <h2 className="text-xl font-medium text-fontlight capitalize">
              Delete all Chats
            </h2>
            <p className="text-sm font-thin text-[#d9d9d9] mt-2">
              The language used in the user interface
            </p>
          </div>
          <button className="flex items-center gap-3 px-4 py-3 rounded-[36px] border border-card bg-red-500">
            <span className="text-xl font-medium text-fontlight capitalize">
              delete all
            </span>
          </button>
        </div>
      </div>
      <FlexibleFooter />
    </>
  );
}

export default General;
