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
    categories = [], // from modalData.first
    rating = "9/10",  // Assuming rating comes from modalData.first
    users = "5m+",
    image = null    // Expecting image from modalData.fourth.image
  } = modalData;

  // Set a default image source
  const [imageSrc, setImageSrc] = useState("/gpt.png");

  useEffect(() => {
    if (typeof image === "string" && image.trim() !== "") {
      // If the image is a non-empty string, use it directly
      setImageSrc(image);
    } else if (typeof image === "object" && image !== null && image.url) {
      // If the image is an object with a URL property, use the URL
      setImageSrc(image.url);
    } else {
      // Fallback to default image if no valid image is provided
      setImageSrc("/gpt.png");
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
        <WorkspaceMenuDropdown productName={name} deleteProduct={deleteProduct} />
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
              key={`${cat}-${index}`}
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
