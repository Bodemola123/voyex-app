import React from "react";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { FaExternalLinkAlt } from "react-icons/fa";

const RecentlyAddedModal = ({ onClose, recentlyAddedItems }) => {
  const modalRef = useRef(null);

  // To close modal when user click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={onClose}
    >
      <div
        className="flex flex-col bg-[#31313140] backdrop-blur-[6.8px] p-6 rounded-lg max-w-[60%] h-[70vh] max-h-[90vh] transform translate-x-[5%] sm:translate-x-[10%] lg:translate-x-[110px]"
        onClick={(e) => e.stopPropagation()}
        ref={modalRef}
      >
        <div className="flex-grow overflow-y-auto">
          <h2 className="text-2xl font-bold mb-4">Recently Added</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pl-2 mb-1">
            {recentlyAddedItems.map((item, index) => (
              <div
                key={index}
                className="bg-white bg-opacity-80 border-[1px] hover:shadow-lg rounded-md border-slate-500 shadow shadow-slate-500 p-4 flex flex-col items-center cursor-pointer"
              >
                <div className="flex flex-row justify-start items-start w-full gap-3">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={40}
                    height={40}
                    className="object-cover rounded-md mb-4"
                  />
                  <h3 className=" text-black text-lg font-semibold my-1">
                    {item.name}
                  </h3>
                </div>
                <p className="text-sm text-black mb-4 line-clamp-5">
                  {item.description}
                </p>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-row items-center gap-1 text-blue-500 hover:underline"
                >
                  <p className="text-base">Link</p>
                  <FaExternalLinkAlt className="pb-[2px]" />
                </a>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4 pt-4">
          <button
            onClick={onClose}
            className="lg:absolute lg:bottom-4 lg:right-4 self-end mt-4 text-red-500 hover:text-red-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecentlyAddedModal;
