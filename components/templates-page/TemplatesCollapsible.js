// import Image from "next/image";
// import Link from "next/link";
// import { usePathname } from "next/navigation";

// const categories = [
//   { name: "Ads" },
//   { name: "AI" },
//   { name: "Content" },
//   { name: "Education" },
//   { name: "Marketing", href: "/templates/marketing" }, // Only this navigates
//   { name: "Product" },
//   { name: "Research" },
//   { name: "Scripts" },
//   { name: "Social Media" },
//   { name: "Video Editor" },
// ];

// const TemplatesCollapsible = () => {
//   const pathname = usePathname();

//   const handleCategoryClick = (categoryName) => {
//     console.log(`${categoryName} clicked`);
//     // Add any filtering logic here if needed
//   };

//   return (
//     <nav className="flex flex-col w-[260px] bg-[#131314] h-screen pt-6 px-4">
//       {/* Logo Section */}
//       <div className="flex items-center gap-3 px-2">
//         <Image src="/Crown.svg" alt="crown" width={32} height={32} />
//         <p className="font-extrabold text-3xl text-[#f4f4f4]">Voyex</p>
//       </div>

//       {/* Categories Section */}
//       <div className="w-full mt-6">
//         <h1 className="text-lg font-semibold flex items-center gap-2 text-[#f4f4f4] px-2">
//           <Image src="/cube.png" alt="Categories" width={24} height={24} />
//           Categories
//         </h1>

//         <div className="mt-4 flex flex-col space-y-2">
//   {categories.map((category) =>
//     category.href ? (
//       // "Marketing" category (acts as a link)
//       <Link
//         key={category.name}
//         href={category.href}
//         className={`w-full text-left block py-2 px-4 rounded-lg text-gray-300 ${
//           pathname === category.href ? "bg-purple-500 text-white" : "hover:bg-gray-800"
//         }`}
//       >
//         {category.name}
//       </Link>
//     ) : (
//       // Other categories (act as buttons)
//       <button
//         key={category.name}
//         onClick={() => handleCategoryClick(category.name)}
//         className="w-full text-left block py-2 px-4 rounded-lg text-gray-300 hover:bg-gray-800"
//       >
//         {category.name}
//       </button>
//     )
//   )}
// </div>
// </div>

//       {/* Upgrade Plan Section */}
//       <button className="flex flex-row py-4 px-6 gap-4 mt-auto mb-6 items-start">
//         <Image src={"/IconContainer.svg"} alt="icon" width={40} height={40} />
//         <div className="flex flex-col gap-1 items-start">
//           <p className="text-base text-[#f4f4f4]">Upgrade Plan</p>
//           <p className="text-sm text-[#475569] whitespace-nowrap">Get GPT-8 and more</p>
//         </div>
//       </button>
//     </nav>
//   );
// };

// export default TemplatesCollapsible;


import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoCube } from "react-icons/io5"; // Import IoCube icon

const categories = [
  { name: "Ads" },
  { name: "AI" },
  { name: "Content" },
  { name: "Education" },
  { name: "Marketing", href: "/templates/marketing" }, // Only this navigates
  { name: "Product" },
  { name: "Research" },
  { name: "Scripts" },
  { name: "Social Media" },
  { name: "Video Editor" },
];

const TemplatesCollapsible = () => {
  const pathname = usePathname();

  const handleCategoryClick = (categoryName) => {
    console.log(`${categoryName} clicked`);
  };

  return (
    <nav className="flex flex-col w-full bg-[#131314] h-screen pt-6">
      {/* Logo Section */}
      <div className="flex flex-row items-center px-6 gap-4">
        <Image src="/Crown.svg" alt="crown" width={32} height={32} />
        <p className="text-3xl font-extrabold text-[#f4f4f4]">Voyex</p>
      </div>

      {/* Categories Heading */}
      <div className="flex flex-row items-center py-5 px-6 gap-2.5 mt-5">
        <IoCube className="text-[#ffffff] text-[22px]" />
        <p className="text-[16px] font-bold text-white tracking-wide">
          Categories
        </p>
      </div>

      {/* Categories List (Matching `StepsNav.js` Styling) */}
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
      <button className="flex flex-row items-start py-4 px-6 gap-4 mt-auto mb-6">
        <Image src="/IconContainer.svg" alt="icon" width={40} height={40} />
        <div className="flex flex-col gap-1 items-start">
          <p className="text-base text-[#f4f4f4]">Upgrade Plan</p>
          <p className="text-sm text-[#475569] whitespace-nowrap">
            Get GPT-8 and more
          </p>
        </div>
      </button>
    </nav>
  );
};

export default TemplatesCollapsible;
