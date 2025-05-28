import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { IoStatsChart } from "react-icons/io5";

const slugify = (str) =>
  str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

const Product = ({ toolId, name, logo, description, subCategories }) => {
  const [hovered, setHovered] = useState(false);
  const analytics = `${toolId}-${slugify(name)}`; 

  return (
    <div
      className="rounded-[25px] bg-[#131314] p-6 transition-all border-[#FFFFFF26]"
      aria-label={`View details for ${name}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      tabIndex={0}
      role="button"
    >
      <div className="flex items-start ">
        {logo ? (
          <Image src={logo} alt={name} width={52} height={52} className="rounded-full" />
        ) : (
          <div className="w-[52px] h-[52px] bg-white rounded-full" />
        )}
      </div>

      <h3 className="text-fontlight font-bold text-base mt-3">{name}</h3>

      <p className="text-sm font-normal text-fontlight mt-4 line-clamp-2 text-ellipsis h-[40px]">
        {description}
      </p>

      {!hovered && (
        <div className="flex flex-wrap items-center overflow-x-auto scrollbar-hide gap-2 w-full h-[35px]">
          {subCategories?.length > 0 ? (
            subCategories.map((tag, index) => (
              <span
                key={index}
                className="text-sm capitalize px-2 py-1 rounded-[21px] border border-card"
              >
                {tag}
              </span>
            ))
          ) : (
            <span className="text-sm px-2 py-1 text-white italic rounded-[21px] border border-card">
              No tags
            </span>
          )}
        </div>
      )}

      {hovered && (
        <div className="h-[35px]">
          <Link href={`/workspace/${analytics}`}>
            <button className="w-full bg-[#c088fb] py-2 px-4 gap-2.5 rounded-3xl flex items-center justify-center">
              <IoStatsChart className="text-[#032400]" />
              <p className="text-base font-medium text-[#032400]">View Analysis</p>
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Product;
