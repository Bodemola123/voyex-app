import Image from "next/image";
import { FaStar } from "react-icons/fa";
import WorkspaceMenuDropdown from "./MenuDropdown";
import { useEffect, useState } from "react";

function Product({ modalData, deleteProduct }) {
  console.log("Product ModalData:", modalData); // Debugging

// Destructure modalData properties with fallback values
const {
  name = "Model Name",
  description = "No description provided.",
  categories = [], // From modalData.first
  rating = "9/10",  // Assuming rating comes from modalData.first
  users = "5m+",
  image= null   // Assuming users comes from modalData.first
} = modalData; // Access name, description, categories, rating, and users from modalData.first



  const [imageSrc, setImageSrc] = useState("/gpt.png"); // Default image

  useEffect(() => {
    if (typeof image === "string" && image.trim() !== "") {
      setImageSrc(image);
    } else {
      setImageSrc("/gpt.png"); // Fallback
    }
  }, [image]);
  
  return (
    <div
      className="rounded-[25px] bg-[#131314] p-6 transition-all"
      aria-label={`View details for ${name}`}
    >
      {/* Image and Menu Dropdown */}
      <div className="flex items-start justify-between gap-3">
        <Image
          src={imageSrc}
          alt={name}
          width={50}
          height={50}
          className="object-cover rounded-[14px]"
          onError={() => setImageSrc("/gpt.png")} // Fallback if image fails to load
        />
        <WorkspaceMenuDropdown deleteProduct={deleteProduct} /> {/* Pass deleteProduct */}
      </div>

      {/* Model Name */}
      <h3 className="text-fontlight font-bold text-base mt-3">{name}</h3>

      {/* Rating and Users Section */}
      <div className="flex items-center gap-3 mt-4">
        <FaStar className="text-yellow-500" />
        <p className="capitalize">
          Rating: <span>{rating}</span>
        </p>
        <p className="capitalize">
          Users: <span>{users}</span>
        </p>
      </div>

      {/* Model Description */}
      <p className="text-sm font-normal text-fontlight mt-4 line-clamp-2 text-ellipsis">
        {description}
      </p>

      {/* Dynamic Categories */}
      <div className="flex flex-wrap justify-start items-center gap-2 mt-4">
        {categories.length > 0 ? (
          categories.map((cat, index) => (
            <span
              key={`${cat}-${index}`} // Unique key combining category and index
              className="text-[11px] capitalize px-2 py-1 rounded-[21px] border border-card"
            >
              {cat}
            </span>
          ))
        ) : (
          <span className="text-[11px] capitalize px-2 py-1 rounded-[21px] border border-card">
            No categories selected
          </span>
        )}
      </div>
    </div>
  );
}

export default Product;