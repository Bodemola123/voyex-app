// import Image from 'next/image'
// import React from 'react'

// const TemplatesCollapsible = () => {
//   return (
//   <nav className="flex flex-col w-[260px] bg-[#131314] h-screen pt-6 px-6">
//   {/* Logo Section */}
//   <div className="flex items-center gap-3">
//     <Image src="/Crown.svg" alt="crown" width={32} height={32} />
//     <p className="font-extrabold text-3xl text-[#f4f4f4]">Voyex</p>
//   </div>

//   {/* Categories Section */}

//     <div className='flex flex-row gap-2.5 mt-5'>
//         <IoCube className='text-[#ffffff] text-[24px]'/>
//         <p className='text-[20px] font-bold'>Categories</p>
//     </div>

//     <div className="flex flex-col px-2 gap-[9px] overflow-y-scroll scrollbar-hide scroll-container mt-2">
//       {categories.map((category) => (
//         <button
//           key={category.name}
//           href={category.href}
//           className={`flex gap-2.5 py-4 px-2 hover:bg-[#c088fb] hover:text-[#0a0a0b]${
//             pathname === category.href ? "bg-purple-500 text-white" : "hover:bg-gray-800"
//           }`}
//         >
//           {category.name}
//         </button>
//       ))}
//     </div>


// </nav>
//   )
// }

// export default TemplatesCollapsible



import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const categories = [
  { name: "Ads", },
  { name: "AI", },
  { name: "Content", },
  { name: "Education", },
  { name: "Marketing",},
  { name: "Product", },
  { name: "Research", },
  { name: "Scripts", },
  { name: "Social Media", },
  { name: "Video Editor",},
];

const TemplatesCollapsible = () => {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col w-[260px] bg-[#131314] h-screen pt-6 px-4">
      {/* Logo Section */}
      <div className="flex items-center gap-3 px-2">
        <Image src="/Crown.svg" alt="crown" width={32} height={32} />
        <p className="font-extrabold text-3xl text-[#f4f4f4]">Voyex</p>
      </div>

      {/* Categories Section */}
      <div className="w-full mt-6">
        <h1 className="text-lg font-semibold flex items-center gap-2 text-[#f4f4f4] px-2">
          {/* Updated Icon with cube.png */}
          <Image src="/cube.png" alt="Categories" width={24} height={24} />
          Categories
        </h1>

        <div className="mt-4 flex flex-col space-y-2">
          {categories.map((category) => (
            <button
              key={category.name}
              href={category.href}
              className={`block py-2 px-4 rounded-lg text-gray-300 ${
                pathname === category.href ? "bg-purple-500 text-white" : "hover:bg-gray-800"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Upgrade Plan Section (This section is not in the Figma)
      <button className="flex flex-row py-4 px-6 gap-4 mt-auto mb-6 items-start">
        <Image src={"/IconContainer.svg"} alt="icon" width={40} height={40} />
        <div className="flex flex-col gap-1 items-start">
          <p className="text-base text-[#f4f4f4]">Upgrade Plan</p>
          <p className="text-sm text-[#475569] whitespace-nowrap">Get GPT-8 and more</p>
        </div>
      </button> */}
    </nav>
  );
};

export default TemplatesCollapsible;
