// import Image from 'next/image'
// import React from 'react'

// const TemplatesCollapsible = () => {
//   return (
//     <nav className='flex flex-col w-full bg-[#131314] items-center justify-between h-screen pt-6'>
//       <div className='flex px-6 gap-4 flex-row items-start justify-start'>
//         <Image src={'/Crown.svg'} alt='crown' width={32} height={32} />
//         <p className='font-extrabold text-3xl text-[#f4f4f4]'>Voyex</p>
//       </div>
//     <button className='flex flex-row py-4 px-6 gap-4 items-start justify-start'>
//       <Image src={'/IconContainer.svg'} alt='icon' width={40} height={40} />
//       <div className='flex flex-col gap-2 items-start'>
//         <p className='text-base text-[#f4f4f4] '>Upgrade Plan</p>
//         <p className='text-sm text-[#475569]'>Get GPT-8 and more</p>
//       </div>
//     </button>
//   </nav>
//   )
// }

// export default TemplatesCollapsible



import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const categories = [
  { name: "Ads", href: "/templates/ads" },
  { name: "AI", href: "/templates/ai" },
  { name: "Content", href: "/templates/content" },
  { name: "Education", href: "/templates/education" },
  { name: "Marketing", href: "/templates/marketing" },
  { name: "Product", href: "/templates/product" },
  { name: "Research", href: "/templates/research" },
  { name: "Scripts", href: "/templates/scripts" },
  { name: "Social Media", href: "/templates/social-media" },
  { name: "Video Editor", href: "/templates/video-editor" },
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
            <Link
              key={category.name}
              href={category.href}
              className={`block py-2 px-4 rounded-lg text-gray-300 ${
                pathname === category.href ? "bg-purple-500 text-white" : "hover:bg-gray-800"
              }`}
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Upgrade Plan Section */}
      <button className="flex flex-row py-4 px-6 gap-4 mt-auto mb-6 items-start">
        <Image src={"/IconContainer.svg"} alt="icon" width={40} height={40} />
        <div className="flex flex-col gap-1 items-start">
          <p className="text-base text-[#f4f4f4]">Upgrade Plan</p>
          <p className="text-sm text-[#475569] whitespace-nowrap">Get GPT-8 and more</p>
        </div>
      </button>
    </nav>
  );
};

export default TemplatesCollapsible;
