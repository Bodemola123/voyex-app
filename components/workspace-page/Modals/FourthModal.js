"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import ImageUpload from "./ImageUpload";
import MultiImageUpload from "./MultiImageUpload";
import { toast } from "react-toastify";

const IMGUR_CLIENT_ID = "0d7a8e799d42d15"; // <-- Replace with your actual Client ID

const FourthModal = ({
  closeModal,
  modalData,
  setModalData,
  createProduct,
  closeModalWithoutReset,
}) => {
  const [productLogo, setProductLogo] = useState(modalData.productLogo || null);
  const [productScreenshots, setProductScreenshots] = useState(
    modalData.productScreenshots || []
  );
  const [organizationLogo, setOrganizationLogo] = useState(modalData.organizationLogo || null);

  useEffect(() => {
    setProductLogo(modalData.productLogo || null);
    setProductScreenshots(modalData.productScreenshots || []);
    setOrganizationLogo(modalData.organizationLogo || null);
  }, [modalData]);

const uploadToImgur = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  try {
    console.log("Uploading to Imgur:", file.name);
    const response = await fetch("https://api.imgur.com/3/image", {
      method: "POST",
      headers: {
        Authorization: `Client-ID ${IMGUR_CLIENT_ID}`,
      },
      body: formData,
    });

    const result = await response.json();
    if (result.success) {
      console.log("Imgur upload success:", result.data.link);
      toast.success("Image upload successfull")
      return result.data.link;
    } else {
      console.error("Imgur upload failed:", result);
      throw new Error("Imgur upload failed");
    }
  } catch (error) {
    console.error("Imgur upload error:", error);
    toast.error("Image upload failed: " + error.message);
    return null;
  }
};


  const handleProductLogoUpload = async (file) => {
    const url = await uploadToImgur(file);
    if (url) {
      const img = { url, name: file.name };
        console.log("Setting product logo:", img);
      setProductLogo(img);
      setModalData({ ...modalData, productLogo: img });
    }
  };

  const handleProductLogoRemove = () => {
    setProductLogo(null);
    setModalData({ ...modalData, productLogo: null });
  };

  const handleOrganizationLogoUpload = async (file) => {
    const url = await uploadToImgur(file);
    if (url) {
      const img = { url, name: file.name };
        console.log("Setting organization logo:", img);
      setOrganizationLogo(img);
      setModalData({ ...modalData, organizationLogo: img });
    }
  };

  const handleOrganizationLogoRemove = () => {
    setOrganizationLogo(null);
    setModalData({ ...modalData, organizationLogo: null });
  };

const handleScreenshotsUpload = async (files) => {
  const uploaded = await Promise.all(
    files.map(async (file) => {
      const url = await uploadToImgur(file);
      if (url) {
        console.log(`Uploaded screenshot ${file.name}:`, url);
        return { url, name: file.name };
      }
      return null;
    })
  );

  const filtered = uploaded.filter(Boolean);
  const updated = [...productScreenshots, ...filtered];
  console.log("Updated product screenshots:", updated);
  setProductScreenshots(updated);
  setModalData({ ...modalData, productScreenshots: updated });
};


  const handleScreenshotRemove = (index) => {
    const updated = productScreenshots.filter((_, i) => i !== index);
    setProductScreenshots(updated);
    setModalData({ ...modalData, productScreenshots: updated });
  };

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

        {/* Product Logo */}
        <div className="flex flex-col gap-3">
          <div className="flex flex-row items-center justify-start gap-2">
            <p className="text-[#ffffff] font-medium text-base">Product Logo</p>
          </div>
          <p className="text-sm font-normal text-[#ffffff]">Recommended dimensions: 512x512</p>
          <div className="flex gap-2.5 w-full h-[156px] bg-[#0a0a0b] p-4 justify-center items-center rounded-[26px]">
            <ImageUpload
              onImageUpload={handleProductLogoUpload}
              uploadedImage={productLogo}
              onImageRemove={handleProductLogoRemove}
            />
          </div>
        </div>

        {/* Product Screenshots */}
        <div className="flex flex-col gap-3">
          <div className="flex flex-row items-center justify-start gap-2">
            <p className="text-[#ffffff] font-medium text-base">Product Screenshots</p>
          </div>
          <p className="text-sm font-normal text-[#ffffff]">
            Upload multiple screenshots showcasing your product
          </p>
          <div className="flex gap-2.5 w-full min-h-[156px] bg-[#0a0a0b] p-4 justify-start items-start rounded-[26px] flex-wrap overflow-auto max-h-[250px]">
            <MultiImageUpload
              uploadedImages={productScreenshots}
              onImagesUpload={handleScreenshotsUpload}
              onImageRemove={handleScreenshotRemove}
            />
          </div>
        </div>

        {/* Organization Logo */}
        <div className="flex flex-col gap-3">
          <div className="flex flex-row items-center justify-start gap-2">
            <p className="text-[#ffffff] font-medium text-base">Organization Logo</p>
          </div>
          <p className="text-sm font-normal text-[#ffffff]">Recommended dimensions: 512x512</p>
          <div className="flex gap-2.5 w-full h-[156px] bg-[#0a0a0b] p-4 justify-center items-center rounded-[26px]">
            <ImageUpload
              onImageUpload={handleOrganizationLogoUpload}
              uploadedImage={organizationLogo}
              onImageRemove={handleOrganizationLogoRemove}
            />
          </div>
        </div>

        {/* Footer Buttons */}
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
              productLogo && productScreenshots.length > 0 && organizationLogo ? "" : "opacity-50"
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
