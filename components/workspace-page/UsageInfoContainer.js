import { usageItem } from "@/constants/workspace-page";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import StatsCard from "./StatsCard";
import AnalyticsNavbar from "./AnalyticsNavbar";
import { LuTrash2 } from "react-icons/lu";
import { TbEdit } from "react-icons/tb";
import DeleteProduct from "./Modals/DeleteProduct";

function UsageInfoContainer({toolData}) {

  const createdDate = toolData?.created_at?.split('T')[0]; // "2025-05-20"
const updatedDate = toolData?.updated_at?.split('T')[0]; // "2025-05-20"
const updatedTime = toolData?.updated_at?.split('T')[1]?.slice(0, 5); // "09:47"
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);


  return (
    <>
      <div className="flex items-center justify-between mt-8">
        <div className="flex items-center gap-4">
          <Image src={toolData.product_logo_url} alt="chatgpt" width={66} height={66} />
          <div className="flex flex-col gap-1">
            <h1 className="text-fontlight text-4xl">{toolData?.product_name}</h1>
            {/* <div className="flex items-center gap-5">
              <FaStar className="text-yellow-500" />
              <p className="flex items-center gap-3 capitalize font-normal">
                rating: <span className="font-medium">9/10</span>
              </p>
              <p className="flex items-center gap-3 capitalize font-normal">
                users: <span className="font-medium">5M+</span>
              </p>
            </div> */}
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="flex items-center gap-5">
            <button className="flex items-center px-4 py-2.5 rounded-[80px] gap-2.5 capitalize text-white bg-[#FF1E1E] font-medium" onClick={() => setIsDeleteModalOpen(true)}>
              <LuTrash2 className="text-[24px]"/>
              <span className="">delete</span>
            </button>
            <button className="flex items-center px-4 py-2.5 rounded-[80px] gap-2.5 capitalize text-white bg-[#C088fb] font-medium">
              <TbEdit className='text-2xl'/>
              <span className="">edit product</span>
            </button>
          </div>
          <div className="flex items-center gap-5 text-base font-normal text-[#999999] capitalize">
            <p className="flex items-center gap-2">
              created <span className="text-[#c088fb] underline">{createdDate}</span>
            </p>
            <span className="w-2 h-2 rounded-full bg-[#999999]"></span>
            <p className="flex items-center gap-2">
              last edited <span className="">{updatedDate}</span>
            </p>
            <span className="w-2 h-2 rounded-full bg-[#999999]"></span>
            <span className="">{updatedTime}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <p className="flex items-center gap-2 mt-5 capitalize font-normal">
          usage: <span className="uppercase font-medium text-xl">{toolData.primary_category}</span>
        </p>
        <div className="flex items-center gap-3">
          {toolData.sub_categories?.map((item, i) => (
            <span
              key={i}
              className="text-xs font-normal capitalize text-white px-2 py-1 border-2 border-primary rounded-full bg-[#31313140]"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      <StatsCard />
      <AnalyticsNavbar />

                  {/* Modal */}
      {isDeleteModalOpen && (
        <DeleteProduct
          onClose={() => setIsDeleteModalOpen(false)} // Pass close handler
          toolId={toolData.tool_id}  // You can pass any props you need here
          toolName={toolData.product_name}
        />
      )}
    </>
  );
}

export default UsageInfoContainer;
