"use client";
import { useState } from "react";
import BenFooter from "@/components/common/BenFooter";
import FirstAddModelpage from "@/components/workspace-page/FirstAddModelpage";
import WorkSpaceHeader from "@/components/workspace-page/Header";
import FirstModal from "@/components/workspace-page/Modals/FirstModal";
import SecondModal from "@/components/workspace-page/Modals/SecondModal";
import ThirdModal from "@/components/workspace-page/Modals/ThirdModal";
import FourthModal from "@/components/workspace-page/Modals/FourthModal";
import Product from "@/components/workspace-page/Product";
import { FiSearch } from "react-icons/fi"; // Import the search icon
import "../../app/globals.css";
import axios from "axios";
import { ImSpinner } from "react-icons/im"; // Import ImSpinner for loading animation
import { toast } from "react-toastify"; // Import toast

function WorkSpace() {
  const [activeModal, setActiveModal] = useState(null);
  const [isProductCreated, setIsProductCreated] = useState(false); // Track if at least one product has been created
  const [products, setProducts] = useState([]); // Store all created products
  const [searchQuery, setSearchQuery] = useState(""); // Track search input
  const [loading, setLoading] = useState(false); // Loading state for the API request

  // Initialize modalData with default values
  const [modalData, setModalData] = useState({
    first: { categories: [], name: "", description: "" }, // Ensure first modal has name, description, and categories
    second: { role: "", resourceType: "" }, // Structure for SecondModal,
    third: {
      individualFiles: [], // This will hold the list of individual files uploaded (array)
      zipFile: null, // This will hold the zip file uploaded (can be null if no zip file)
    },
    fourth: {
      image: null,  // Holds the uploaded brand image file
    }, // Ensure image is stored here
  });

  const openModal = (modalName) => setActiveModal(modalName);

  const closeModal = () => {
    setModalData({
      first: { categories: [], name: "", description: "" }, // Reset the modal data when closing
      second: { role: "", resourceType: ""},
      third: {
        individualFiles: [], // This will hold the list of individual files uploaded (array)
        zipFile: null,
      },
      fourth: { image: null },
    });
    setActiveModal(null);
  };
  const closeModalWithoutReset = () => {
    setActiveModal(null); // Only close the modal without resetting modalData
  };
  

  const deleteProduct = (index) => {
    setProducts((prevProducts) => {
      const updatedProducts = prevProducts.filter((_, i) => i !== index); // Remove the product at the specified index

      // If no products are left, switch back to the default layout
      if (updatedProducts.length === 0) {
        setIsProductCreated(false);
      }

      return updatedProducts;
    });
  };


  const handleProductCreation = async () => {

    setLoading(true); // Show loading modal
  
    const productData = {
      Tool_Name: modalData.first.name,
      Tool_Category: modalData.first.categories, // Convert array to string
      Tool_URL: "https://example.com", // Replace with actual URL input
      Tool_Short_Description: modalData.first.description,
      Tool_Large_Description: "Detailed description here", // Update as needed
      Tool_Assets_Metadata: {
        // asset1: modalData.third.zipFile
        //   ? modalData.third.zipFile.url // Use zip file URL if available
        //   : modalData.third.individualFiles && modalData.third.individualFiles.length > 0
        //   ? modalData.third.individualFiles.map(file => file.url).join(", ") // Join URLs of individual files
        //   : "", // Fallback if no individual files
        // asset2: modalData.fourth.image ? modalData.fourth.image.url : null, // Use image URL from fourth modal
        asset1: "https://google.com",
        asset2: "https://google.com"
      },
      
      added_by_entity_type: "org",
      added_by_entity_id: 132,
      Pricing_Model: "Free",
      Rating: 4.5,
      Approval_Status: true,
      Partnership_Type: "Affiliate",
      Special_Tags: ["tag1", "tag2"],
      Use_Case_Tags: ["use1", "use2"],
      Comments: ["Good tool", "Needs improvement"],
      Social_Platforms: {
        LinkedIn: "https://linkedin.com/company/example",
        Twitter: "https://twitter.com/example",
      },
      metadata: {
        pythonDetails:modalData.second.role,
        resourceType:modalData.second.resourceType
      },
    };
  
    try {
      const response = await axios.post(
        "https://xklp1j7zp3.execute-api.ap-southeast-2.amazonaws.com/default/voyex_tool_workspace",
        productData
      );
  
      console.log("Product created successfully:", response.data);
      toast.success("Product creation successful 🎉")
  
      // Update local state after successful API call
      setProducts((prevProducts) => [...prevProducts, { ...modalData.first, image: modalData.fourth.image }]);
      setIsProductCreated(true);
      closeModal();

    } catch (error) {
      console.error("Error creating product:", error.response?.data || error.message);
      toast.error(`Product creation failed: ${errorMessage}`);
    } finally {
      setLoading(false); // Hide loading modal once API call is done
    }
  };
  
  const renderModal = () => {
    switch (activeModal) {
      case "first":
        return (
          <FirstModal
            closeModal={closeModal}
            openModal={() => openModal("second")}
            modalData={modalData.first} // Pass the entire first modal data
            setModalData={(data) => setModalData((prev) => ({ ...prev, first: data }))}
          />
        );
      case "second":
        return (
          <SecondModal
            closeModal={closeModal}
            openModal={() => openModal("third")}
            modalData={modalData.second}
            setModalData={(data) => setModalData((prev) => ({ ...prev, second: data }))}
          />
        );
      case "third":
        return (
          <ThirdModal
            closeModal={closeModal}
            openModal={() => openModal("fourth")}
            modalData={modalData.third}
            setModalData={(data) => setModalData((prev) => ({ ...prev, third: data }))}
          />
        );
      case "fourth":
        return (
          <FourthModal
            closeModal={closeModal}
            modalData={modalData.fourth}
            setModalData={(data) => setModalData((prev) => ({ ...prev, fourth: data }))}
            createProduct={handleProductCreation} // Function to trigger product card display
            closeModalWithoutReset={closeModalWithoutReset}
          />
        );
      default:
        return null;
    }
  };

  // Filter products based on search query
  const filteredProducts = products.filter((product) =>
    product.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="flex-grow relative flex h-screen w-full flex-col gap-10 pt-6 px-6 justify-between items-center overflow-y-scroll scrollbar-hide">
      {/* Default Layout (when no product is created) */}
      {!isProductCreated ? (
        <>
          <WorkSpaceHeader openModal={() => openModal("first")} />
          <FirstAddModelpage openModal={() => openModal("first")} />
        </>
      ) : (
        // Product Creation Layout (when at least one product is created)
        <div className="flex flex-col gap-4 w-full h-screen">
          {/* Workspace Header */}
          <WorkSpaceHeader openModal={() => openModal("first")} />

          {/* Search Input */}
          <div className="relative w-[198px]">
            <FiSearch className="absolute top-2 left-2 w-6 h-6 text-white" />
            <input
              type="text"
              placeholder="Search models"
              className="pl-10 pr-4 py-2 bg-transparent rounded-3xl border border-card w-48 text-white placeholder-white outline-none focus:ring-0 focus:border-card"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Scrollable Product Grid */}
          <div className="w-full h-full overflow-y-auto scrollbar-hide">
            <div className="grid grid-cols-3 w-full gap-4">
              {filteredProducts.map((product, index) => (
                <Product
                  key={index}
                  modalData={product}
                  deleteProduct={() => deleteProduct(index)} // Pass delete function with index
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <BenFooter />

      {loading && (
  <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
    <div className="flex justify-center items-center flex-col bg-[#131314] p-6 rounded-lg shadow-lg">
      <ImSpinner className="animate-spin text-[#c088fb] text-4xl" />
      <p className="mt-2 text-white">Please Wait...</p>
    </div>
  </div>
)}


      {/* Render Active Modal */}
      {renderModal()}
    </main>
  );
}

export default WorkSpace;