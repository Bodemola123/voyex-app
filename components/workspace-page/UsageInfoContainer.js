import { usageItem } from "@/constants/workspace-page";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import StatsCard from "./StatsCard";
import AnalyticsNavbar from "./AnalyticsNavbar";

function UsageInfoContainer() {
  return (
    <>
      <div className="flex items-center justify-between mt-10">
        <div className="flex items-center gap-4">
          <Image src="/gpt-big.png" alt="chatgpt" width={66} height={66} />
          <div className="flex flex-col gap-1">
            <h1 className="text-fontlight text-4xl">ChatGPT</h1>
            <div className="flex items-center gap-5">
              <FaStar className="text-yellow-500" />
              <p className="flex items-center gap-3 capitalize font-normal">
                rating: <span className="font-medium">9/10</span>
              </p>
              <p className="flex items-center gap-3 capitalize font-normal">
                users: <span className="font-medium">5M+</span>
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="flex items-center gap-5">
            <button className="flex items-center gap-1 capitalize text-red-500 font-medium">
              <Image src="/trash.png" alt="trash" width={24} height={24} />
              <span className="">delete</span>
            </button>
            <button className="flex items-center gap-1 capitalize text-green-500 font-medium">
              <Image src="/edit-green.png" alt="trash" width={24} height={24} />
              <span className="">edit product</span>
            </button>
          </div>
          <div className="flex items-center gap-5 text-base font-normal text-[#999999] capitalize">
            <p className="flex items-center gap-2">
              created <span className="text-green-500">may 12, 2024</span>
            </p>
            <span className="w-2 h-2 rounded-full bg-[#999999]"></span>
            <p className="flex items-center gap-2">
              last edited <span className="">may 12, 2024</span>
            </p>
            <span className="w-2 h-2 rounded-full bg-[#999999]"></span>
            <span className="">10:00AM</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <p className="flex items-center gap-2 mt-5 capitalize font-normal">
          usage: <span className="uppercase font-medium text-xl">chatbot</span>
        </p>
        <div className="flex items-center gap-3">
          {usageItem.map((item, i) => (
            <span
              key={i}
              className="text-xs font-normal capitalize text-white px-2 py-1 border-2 border-primary rounded-full"
            >
              {item.name}
            </span>
          ))}
        </div>
      </div>

      <StatsCard />
      <AnalyticsNavbar />
    </>
  );
}

export default UsageInfoContainer;
