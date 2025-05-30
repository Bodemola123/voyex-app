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

const CLOUDINARY_CLOUD_NAME = "dtzgismaw"; // from your Cloudinary dashboard
const UPLOAD_PRESET = "Voyexs"; // the name you set above

const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  try {
    console.log("Uploading to Cloudinary:", file.name);

    const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (response.ok && data.secure_url) {
      console.log("Cloudinary upload success:", data.secure_url);
      toast.success("Image uploaded successfully!");
      return data.secure_url;
    } else {
      throw new Error(data.error?.message || "Cloudinary upload failed");
    }
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    toast.error("Image upload failed: " + error.message);
    return null;
  }
};



  const handleProductLogoUpload = async (file) => {
    const url = await uploadToCloudinary(file);
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
    const url = await uploadToCloudinary(file);
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
      const url = await uploadToCloudinary(file);
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
      <div className="bg-[#1c1d1f] text-white rounded-[41px] p-[26px] shadow-xl w-[90%] max-w-[794px] flex flex-col gap-[25px] max-h-[90vh]">
                <div className="flex flex-row gap-4 items-center justify-center">
          <div className="bg-[#3D324B] px-2.5 py-1.5 rounded-[23.74px] text-sm font-black text-[#C088FB] text-center">
              <p>1</p>
          </div>
          <div className="bg-[#3D324B] px-2.5 py-1.5 rounded-[23.74px] text-sm font-black text-[#C088FB] text-center">
              <p>2</p>
          </div>
          <div className="bg-[#3D324B] px-2.5 py-1.5 rounded-[23.74px] text-sm font-black text-[#C088FB] text-center">
              <p>3</p>
          </div>
            <div className="flex flex-row gap-1.5 justify-center items-center">
            <div className="bg-[#C088FB] px-2.5 py-1.5 rounded-[23.74px] text-sm font-black text-[#0d0d0d] text-center">
              <p>4</p>
            </div>
            <p className="text-sm font-medium text-[#f4f4f4]">Image Files</p>
          </div>
        </div>
        {/* Header */}
        <div className="flex justify-between items-center border-gray-700">
          <h2 className="text-xl md:text-2xl font-bold">Image Files</h2>
          <button onClick={closeModal} className="flex items-center justify-center">
            <Image src={"/close-square.svg"} alt="X" width={58} height={58} />
          </button>
        </div>
        <div className="space-y-1 overflow-y-auto px-1">
                  {/* Product Logo */}
        <div className="flex flex-col gap-3">
          <div className="flex flex-row items-center justify-start gap-2">
            <p className="text-[#ffffff] font-medium text-base">Product Logo</p>
          </div>
          <p className="text-sm font-normal text-[#ffffff]">Recommended dimensions: 512x512</p>
          <div className="flex gap-2.5 w-full min-h-[156px] bg-[#0a0a0b] p-4 justify-center items-center rounded-[26px] flex-wrap overflow-auto max-h-[250px]">
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
              onImagesChange={handleScreenshotsUpload}
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
          <div className="flex gap-2.5 w-full min-h-[156px] bg-[#0a0a0b] p-4 justify-center items-center rounded-[26px] flex-wrap overflow-auto max-h-[250px]">
            <ImageUpload
              onImageUpload={handleOrganizationLogoUpload}
              uploadedImage={organizationLogo}
              onImageRemove={handleOrganizationLogoRemove}
            />
          </div>
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
