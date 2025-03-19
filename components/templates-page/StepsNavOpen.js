// import Image from 'next/image'
// import React from 'react'
// import { IoCube } from 'react-icons/io5'

// const StepsNavOpen = () => {
//   return (
//     <nav className='flex flex-col w-full bg-[#131314] h-screen pt-6'>
//         <div className='flex px-6 gap-4 flex-row items-center'>
//           <Image src={'/Crown.svg'} alt='crown' width={32} height={32}/>
//           <p className='font-extrabold text-3xl text-[#f4f4f4]'>Voyex</p>
//         </div> 
//         <div className='flex flex-row py-5 px-6 gap-2.5 mt-5'>
//             <IoCube className='text-[#ffffff] text-[24px]'/>
//             <p className='text-[20px] font-bold'>Categories</p>
//         </div>
//          {/* Upgrade Plan Section (This section is not in the Figma) */}
//       <button className="flex flex-row py-4 px-6 gap-4 mt-auto mb-6 items-start">
//         <Image src={"/IconContainer.svg"} alt="icon" width={40} height={40} />
//         <div className="flex flex-col gap-1 items-start">
//           <p className="text-base text-[#f4f4f4]">Upgrade Plan</p>
//           <p className="text-sm text-[#475569] whitespace-nowrap">Get GPT-8 and more</p>
//         </div>
//       </button>    
//     </nav>
//   )
// }

// export default StepsNavOpen

import Image from 'next/image'
import React from 'react'
import { IoCube } from 'react-icons/io5'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const categories = [
  { name: "Ads" },
  { name: "AI" },
  { name: "Content" },
  { name: "Education" },
  { name: "Marketing", href: "/templates/marketing" },
  { name: "Product" },
  { name: "Research" },
  { name: "Scripts" },
  { name: "Social Media" },
  { name: "Video Editor" },
];

const StepsNavOpen = () => {
  const pathname = usePathname();

  const handleCategoryClick = (categoryName) => {
    console.log(`Clicked on ${categoryName}`);
  };

  return (
    <nav className="flex flex-col w-full bg-[#131314] h-screen pt-6">
      {/* Header */}
      <div className="flex px-6 gap-4 flex-row items-center">
        <Image src={'/Crown.svg'} alt='crown' width={32} height={32} />
        <p className="font-extrabold text-3xl text-[#f4f4f4]">Voyex</p>
      </div> 

      {/* Categories Heading */}
      <div className="flex flex-row items-center py-5 px-6 gap-2.5 mt-5">
        <IoCube className="text-[#ffffff] text-[22px]" />
        <p className="text-[16px] font-bold text-white tracking-wide">Categories</p>
      </div>

      {/* Categories List */}
      <div className="mt-2 flex flex-col space-y-2 px-6">
        {categories.map((category) =>
          category.href ? (
            <Link
              key={category.name}
              href={category.href}
              className={`w-full text-left block py-2 px-4 rounded-lg text-gray-300 hover:bg-gray-800 ${
                pathname === category.href ? "bg-purple-500 text-white" : ""
              }`}
            >
              {category.name}
            </Link>
          ) : (
            <button
              key={category.name}
              onClick={() => handleCategoryClick(category.name)}
              className="w-full text-left block py-2 px-4 rounded-lg text-gray-300 hover:bg-gray-800"
            >
              {category.name}
            </button>
          )
        )}
      </div>

      {/* Upgrade Plan Section */}
      <div className="mt-auto mb-6 px-6">
        <button className="flex flex-row py-4 gap-4 items-center w-full bg-gray-900 rounded-lg hover:bg-gray-800">
          <Image src={"/IconContainer.svg"} alt="icon" width={40} height={40} />
          <div className="flex flex-col gap-1">
            <p className="text-base text-[#f4f4f4] font-semibold">Upgrade Plan</p>
            <p className="text-sm text-[#a1a1aa]">Get GPT-8 and more</p>
          </div>
        </button>
      </div>
    </nav>
  );
};

export default StepsNavOpen;
