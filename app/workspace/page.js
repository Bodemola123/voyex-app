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
import '../../app/globals.css';

function WorkSpace() {
  const [activeModal, setActiveModal] = useState(null);
  const [isProductCreated, setIsProductCreated] = useState(false); // Track if at least one product has been created
  const [products, setProducts] = useState([]); // Store all created products
  const [searchQuery, setSearchQuery] = useState(""); // Track search input

  // Initialize modalData with default values
  const [modalData, setModalData] = useState({
    first: { categories: [], name: "", description: "" }, // Ensure first modal has name, description, and categories
    second: {},
    third: {},
    fourth: { image: "" },
  });

  const openModal = (modalName) => setActiveModal(modalName);

  const closeModal = () => {
    setModalData({
      first: { categories: [], name: "", description: "" }, // Reset the modal data when closing
      second: {},
      third: {},
      fourth: { image: "" },
    });
    setActiveModal(null);
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

  const handleProductCreation = () => {
    setProducts((prevProducts) => [
      ...prevProducts,
      {
        ...modalData.first, // Name, description, categories
        image: modalData.fourth.image, // Image from FourthModal
      },
    ]);
    setIsProductCreated(true); // Switch to the product creation layout
    closeModal();
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
      categories={modalData.first.categories} // Pass the categories to the child
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
    <main className="flex-grow relative flex h-screen w-full flex-col gap-10 pt-6 px-6 justify-between items-center overflow-y-scroll">
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
              className="pl-10 pr-4 py-2 bg-transparent rounded-3xl border border-card w-48 text-white placeholder-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Scrollable Product Grid */}
          <div className="grid grid-cols-4 w-full gap-4 overflow-y-auto scrollbar-hide">
            {filteredProducts.map((product, index) => (
              <Product
                key={index}
                modalData={product}
                deleteProduct={() => deleteProduct(index)} // Pass delete function with index
              />
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <BenFooter />

      {/* Render Active Modal */}
      {renderModal()}
    </main>
  );
}

export default WorkSpace;
