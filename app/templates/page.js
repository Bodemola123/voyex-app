"use client"
import BenNavbar from "@/components/common/BenNavbar";
import Modal from "@/components/templates-page/Modals/Modal";
import ProductCard from "@/components/templates-page/ProductCard";
import TemplatesCollapsible from "@/components/templates-page/TemplatesCollapsible";
import React, { useEffect, useState } from "react";
import { FaRegStar } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { GrTag } from "react-icons/gr";
import { HiOutlineBolt, HiOutlineSquares2X2 } from "react-icons/hi2";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { TbFilter } from "react-icons/tb";

function Templates() {
  const [isHistoryVisible, setIsHistoryVisible] = useState(false);

  // On component mount, retrieve state from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem("isHistoryVisible");
    if (savedState !== null) {
      setIsHistoryVisible(JSON.parse(savedState)); // Parse boolean value from localStorage
    }
  }, []);

  // Update localStorage whenever the state changes
  const toggleHistoryVisibility = () => {
    setIsHistoryVisible((prev) => {
      const newState = !prev;
      localStorage.setItem("isHistoryVisible", JSON.stringify(newState));
      return newState;
    });
  };
  const [selectedProduct, setSelectedProduct] = useState(null);
    const [products] = useState([
      {
        id: 1,
        title: "Marketing Ads",
        buttonText: "See Template",
      },
      {
        id: 2,
        title: "Bulk Video Creation",
        buttonText: "See Template",
      },
      {
        id: 3,
        title: "Social Media",
        buttonText: "See Template",
      },
    ]);
  return     <div className="flex flex-row items-center w-screen h-screen">
  <BenNavbar
    toggleHistoryVisibility={toggleHistoryVisibility}
    isHistoryVisible={isHistoryVisible}
  />
  <div
    className={`transition-all duration-300 ${
      isHistoryVisible ? "w-[360px]" : "w-0"
    } bg-[#131314] overflow-hidden`}
  >
    {isHistoryVisible && <TemplatesCollapsible />}
  </div>
    <div className="flex-grow relative flex h-full w-full flex-col gap-10 p-6 justify-start items-center overflow-y-scroll scrollbar-hide scroll-container">
    <div className="flex flex-col gap-2">
      <div className="flex flex-row justify-between gap-10">
        <h1 className="font-semibold text-5xl">Experience some prebuilt templates to help you navigate your goals faster</h1>
            <div className='relative w-[198px] h-10 flex'> 
            <FiSearch className="absolute top-2 left-2 text-white w-6 h-6 " />
              <input
                type="text"
                placeholder="Search"
                className="pl-10 pr-4 py-2 bg-transparent rounded-3xl border border-card w-48 text-white placeholder-white outline-none focus:ring-0 focus:border-card"
              />
            </div>
      </div>
        <div className='flex flex-row justify-between'>
          <div className='flex flex-row gap-4 mt-4'>
          <button className='w-28 h-8 rounded-3xl  gap-3 text-sm flex justify-center items-center bg-[#131314]'> <FaRegStar/> Featured</button>
          <button className='h-8 w-20 rounded-3xl  gap-3 text-sm flex justify-center items-center bg-[#131314]'>  <HiOutlineBolt/> New</button>
          </div>
          <div className='flex flex-row gap-2'>
          <button className='w-24 h-8 gap-3  text-sm rounded-3xl flex justify-center items-center bg-[#131314]'> <TbFilter/> Filter</button>
          <button className='w-24 h-8 gap-3  text-sm rounded-3xl flex justify-center items-center bg-[#131314]'> <HiOutlineSquares2X2/> View</button>
          </div>
          </div>
    </div>
    <div className="flex flex-col gap-4">
        <div className="flex flex-row justify-between">
          <div className="flex gap-2 flex-col w-[681px] h-20">
            <h1 className="text-2xl font-bold">Marketing</h1>
            <p>
              Where the cosmic meets the artificial, offering a stellar
              selection of AI companions tailored to your interstellar
              adventures
            </p>
          </div>
          <button className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#C088FB] via-[#8E3EFF] to-[#8E3EFF] h-5 flex items-center justify-center gap-2">
            See More <MdOutlineKeyboardArrowRight className="text-[#c088fb]"/>{" "}
          </button>
        </div>
        <div className="grid grid-cols-3 gap-4">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} onClick={() => setSelectedProduct(product)} />
                ))}
            </div>
            {selectedProduct && <Modal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
      </div>
  </div>
  </div>;
}

export default Templates;




