import Image from "next/image";
import { FaStar } from "react-icons/fa";
import WorkspaceMenuDropdown from "./MenuDropdown";

function Product({ modalData, deleteProduct }) {
  console.log("Product ModalData:", modalData); // Debugging

  // Safely access modalData properties with fallback values
  const { name = "", description = "", category = [], image = null, rating = "9/10", users = "5m+" } = modalData;

  return (
    <div
      className="rounded-[25px] bg-gradient-to-r from-[#00a766]/10 to-gray/10 border border-card backdrop-blur-[6.8px] p-6 transition-all"
      aria-label={`View details for ${name || "Model"}`}
    >
      <div className="flex items-start justify-between gap-3">
        {/* Use uploaded image from FourthModal */}
        {image ? (
          <Image
            src={URL.createObjectURL(image)} // Convert File to URL
            alt={name || "Product Image"}
            width={50}
            height={50}
            className="object-cover rounded-[14px]"
          />
        ) : (
          <Image
            src="/gpt.png"
            alt="default"
            width={50}
            height={50}
            className="object-cover rounded-[14px]"
          />
        )}
        <WorkspaceMenuDropdown deleteProduct={deleteProduct} /> {/* Pass deleteProduct */}
      </div>

      {/* Model Name from FirstModal */}
      <h3 className="text-fontlight font-bold text-base mt-3">
        {name || "Model Name"}
      </h3>

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

      {/* Model Description from FirstModal */}
      <p className="text-sm font-normal text-fontlight mt-4 truncate max-w-[245px] max-h-[36px]">
        {description || "No description provided."}
      </p>

      {/* Dynamic Categories from FirstModal */}
      <div className="flex flex-wrap gap-2 mt-4">
        {category.length > 0 ? (
          category.map((cat, index) => (
            <span
              key={index}
              className="text-xs capitalize px-2 py-1 rounded-[21px] border border-card"
            >
              {cat}
            </span>
          ))
        ) : (
          <span className="text-xs capitalize px-2 py-1 rounded-[21px] border border-card">
            No categories selected
          </span>
        )}
      </div>
    </div>
  );
}

export default Product;