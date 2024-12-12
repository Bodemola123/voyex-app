import Image from "next/image";
import { FaStar } from "react-icons/fa";
import WorkspaceMenuDropdown from "./MenuDropdown";
import Link from "next/link";

function Product() {
  return (
    <Link
      href="/workspace/analytics"
      className="rounded-[25px] bg-gradient-to-r from-[#00a766]/10 to-gray/10 border border-card backdrop-blur-[6.8px] p-6"
    >
      <div className="flex items-start justify-between gap-3">
        <Image src="/gpt.png" alt="gpt" width={50} height={50} />
        <WorkspaceMenuDropdown />
      </div>
      <h3 className="text-fontlight font-bold text-base mt-3">ChatGPT</h3>
      <div className="flex items-center gap-3 mt-4">
        <FaStar className="text-yellow-500" />
        <p className="capitalize">
          Rating: <span>9/10</span>
        </p>
        <p className="capitalize">
          users: <span>5m+</span>
        </p>
      </div>
      <p className="text-sm font-normal text-fontlight mt-4">
        {`Supports GPT-4 and GPT-3.5. OpenAI's next-generation conversational
            AI, usi...`}
      </p>
      <div className="flex items-center gap-2 mt-4">
        <span className="text-xs capitalize px-2 py-1 rounded-[21px] border border-card">
          chatbot
        </span>
        <span className="text-xs capitalize px-2 py-1 rounded-[21px] border border-card">
          writing
        </span>
        <span className="text-xs capitalize px-2 py-1 rounded-[21px] border border-card">
          sales
        </span>
        <span className="text-xs capitalize px-2 py-1 rounded-[21px] border border-card">
          models
        </span>
      </div>
    </Link>
  );
}

export default Product;
