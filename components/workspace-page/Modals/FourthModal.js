"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import ImageUpload from "./ImageUpload";
import MultiImageUpload from "./MultiImageUpload";
import { toast } from "react-toastify";

const FourthModal = ({
  closeModal,
  modalData,
  setModalData,
  createProduct,
  closeModalWithoutReset,
}) => {
  // Initialize local state from modalData props (fourth data slice)
  const [productLogo, setProductLogo] = useState(modalData.productLogo || null);
  const [productScreenshots, setProductScreenshots] = useState(
    modalData.productScreenshots || []
  );
  const [organizationLogo, setOrganizationLogo] = useState(modalData.organizationLogo || null);

  // Sync local state if modalData changes (optional)
  useEffect(() => {
    setProductLogo(modalData.productLogo || null);
    setProductScreenshots(modalData.productScreenshots || []);
    setOrganizationLogo(modalData.organizationLogo || null);
  }, [modalData]);

  // Handlers for single image upload (productLogo)
  const handleProductLogoUpload = (file) => {
    setProductLogo(file);
    setModalData({ ...modalData, productLogo: file });
  };
  const handleProductLogoRemove = () => {
    setProductLogo(null);
    setModalData({ ...modalData, productLogo: null });
  };

  // Handlers for single image upload (organizationLogo)
  const handleOrganizationLogoUpload = (file) => {
    setOrganizationLogo(file);
    setModalData({ ...modalData, organizationLogo: file });
  };
  const handleOrganizationLogoRemove = () => {
    setOrganizationLogo(null);
    setModalData({ ...modalData, organizationLogo: null });
  };

  // Handlers for multi image upload (productScreenshots)
  const handleScreenshotsUpload = (files) => {
    const updatedScreenshots = [...productScreenshots, ...files];
    setProductScreenshots(updatedScreenshots);
    setModalData({ ...modalData, productScreenshots: updatedScreenshots });
  };

  const handleScreenshotRemove = (index) => {
    const updatedScreenshots = productScreenshots.filter((_, i) => i !== index);
    setProductScreenshots(updatedScreenshots);
    setModalData({ ...modalData, productScreenshots: updatedScreenshots });
  };

  // Validation and submit
  const handleNext = () => {
    if (!productLogo) {
      toast.error("Please upload a Product Logo before proceeding.");
      return;
    }
    if (productScreenshots.length === 0) {
      toast.error("Please upload at least one Product Screenshot before proceeding.");
      return;
    }
    if (!organizationLogo) {
      toast.error("Please upload an Organization Logo before proceeding.");
      return;
    }

    closeModalWithoutReset();
    createProduct();
  };

  return (
    <div className="fixed inset-0 bg-[rgba(19,19,20,0.8)] flex items-center justify-center z-50">
      <div className="bg-[#1c1d1f] text-white rounded-[41px] p-[26px] shadow-xl w-[90%] max-w-[794px] flex flex-col gap-[14px] overflow-auto max-h-[90vh]">
        {/* Header */}
        <div className="flex justify-between items-center border-gray-700">
          <h2 className="text-xl md:text-2xl font-bold">Create New Model</h2>
          <button onClick={closeModal} className="flex items-center justify-center">
            <Image src={"/close-square.svg"} alt="X" width={58} height={58} />
          </button>
        </div>

        {/* Product Logo Upload */}
        <div className="flex flex-col gap-3">
          <div className="flex flex-row items-center justify-start gap-2">
            <p className="text-[#ffffff] font-medium text-base">Product Logo</p>
          </div>
          <p className="text-sm font-normal text-[#ffffff]">Recommended dimensions: 512x512</p>
          <div className="flex gap-2.5 w-full h-[156px] bg-[#131314] p-4 justify-center items-center rounded-[26px]">
            <ImageUpload
              onImageUpload={handleProductLogoUpload}
              uploadedImage={productLogo}
              onImageRemove={handleProductLogoRemove}
            />
          </div>
        </div>

        {/* Product Screenshots Upload */}
        <div className="flex flex-col gap-3">
          <div className="flex flex-row items-center justify-start gap-2">
            <p className="text-[#ffffff] font-medium text-base">Product Screenshots</p>
          </div>
          <p className="text-sm font-normal text-[#ffffff]">
            Upload multiple screenshots showcasing your product
          </p>
          <div className="flex gap-2.5 w-full min-h-[156px] bg-[#131314] p-4 justify-start items-start rounded-[26px] flex-wrap overflow-auto max-h-[250px]">
            <MultiImageUpload
              uploadedImages={productScreenshots}
              onImagesUpload={handleScreenshotsUpload}
              onImageRemove={handleScreenshotRemove}
            />
          </div>
        </div>

        {/* Organization Logo Upload */}
        <div className="flex flex-col gap-3">
          <div className="flex flex-row items-center justify-start gap-2">
            <p className="text-[#ffffff] font-medium text-base">Organization Logo</p>
          </div>
          <p className="text-sm font-normal text-[#ffffff]">Recommended dimensions: 512x512</p>
          <div className="flex gap-2.5 w-full h-[156px] bg-[#131314] p-4 justify-center items-center rounded-[26px]">
            <ImageUpload
              onImageUpload={handleOrganizationLogoUpload}
              uploadedImage={organizationLogo}
              onImageRemove={handleOrganizationLogoRemove}
            />
          </div>
        </div>

        {/* Buttons Section */}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={closeModal}
            className="px-4 py-2 text-sm md:text-base bg-transparent text-white border border-[#FFFFFF26] rounded-[25px] hover:bg-gray-800 hover:border-[#c088fb] hover:scale-105 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleNext}
            disabled={!productLogo || productScreenshots.length === 0 || !organizationLogo}
            className={`px-4 py-2 text-sm md:text-base bg-[#C088FB] text-[#0A0A0B] rounded-[25px] hover:scale-105 transition-all ${
              productLogo && productScreenshots.length > 0 && organizationLogo
                ? ""
                : "opacity-50"
            }`}
          >
            Finalize Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default FourthModal;
