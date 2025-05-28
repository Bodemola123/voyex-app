"use client";
import { useEffect, useState } from "react";
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
    const [isSubmitting, setIsSubmitting] = useState(false); // new loading for submit
  const [isLoading, setIsLoading]= useState(true);


const fetchProducts = async () => {
  setIsLoading(true);
  const entityId = localStorage.getItem("entityId");
  const entityType = localStorage.getItem("orgType");

  try {
    const response = await fetch(
      `https://xklp1j7zp3.execute-api.ap-southeast-2.amazonaws.com/default/voyex_tool_workspace?entity_type=${entityType}&entity_id=${entityId}`
    );
    const data = await response.json();

    if (data.tools && data.tools.length > 0) {
      const simplifiedTools = data.tools.map((tool) => ({
        tool_id: tool.tool_id,
        product_name: tool.product_name,
        product_logo_url: tool.product_logo_url,
        product_short_description: tool.product_short_description,
        sub_categories: tool.sub_categories,
      }));

      setProducts(simplifiedTools);
      setIsProductCreated(true);
    } else {
      setIsProductCreated(false);
    }
  } catch (error) {
    console.error("Error fetching tools:", error);
    setIsProductCreated(false);
  } finally {
    setIsLoading(false);
  }
};

useEffect(() => {
  fetchProducts();
}, []);





  // Initialize modalData with default values
  const [modalData, setModalData] = useState({
      first: {
    primaryCategory: "",
    categories: [],
    name: "",
    description: "",
    productUrl: "",
    tags: [],
  }, // Ensure first modal has name, description, and categories
      second: {
    detailedFeatures: "",          // multiline text or comma-separated string
    pricingModel: "",              // dropdown: "Free", "Paid", "Subscription"
    pricingDetails: "",    // text input URL
    availablePlatforms: [],        // multi-select array e.g. ["Web", "Android"]
    apiAccessAvailable: "",        // string "Yes" or "No"
    integrationOptions: "",        // text input
    demoVideoUrl: ""               // text input URL
  },
  third: {
    supportEmail: "",
    helpCenterUrl: "",
    contactPersonName: "",
    contactPersonEmail: "",
    twitterUrl: "",
    linkedinUrl: "",
    discordUrl: "",
    launchDate: "",          // ISO string or date string
    regionsAvailable: [],    // multi-select array of continents
    complianceCertifications: "",
  },
  fourth: {
    productLogo: null,         // Single image file for Product Logo
    productScreenshots: [],    // Array of image files for Product Screenshots
    organizationLogo: null,    // Single image file for Organization Logo
  }, // Ensure image is stored here
  });

  const openModal = (modalName) => setActiveModal(modalName);

  const closeModal = () => {
    setModalData({
        first: {
    primaryCategory: "",
    categories: [],
    name: "",
    description: "",
    orgName: "",
    orgUrl: "",
    productUrl: "",
    tags: [],
  }, // Reset the modal data when closing
      second: {
    detailedFeatures: "",          // multiline text or comma-separated string
    pricingModel: "",              // dropdown: "Free", "Paid", "Subscription"
    pricingDetails: "",    // text input URL
    availablePlatforms: [],        // multi-select array e.g. ["Web", "Android"]
    apiAccessAvailable: "",        // string "Yes" or "No"
    integrationOptions: "",        // text input
    demoVideoUrl: ""               // text input URL
  },
  third: {
    supportEmail: "",
    helpCenterUrl: "",
    contactPersonName: "",
    contactPersonEmail: "",
    twitterUrl: "",
    linkedinUrl: "",
    discordUrl: "",
    launchDate: "",          // ISO string or date string
    regionsAvailable: [],    // multi-select array of continents
    complianceCertifications: "",
  },
      fourth: {
    productLogo: null,         // Single image file for Product Logo
    productScreenshots: [],    // Array of image files for Product Screenshots
    organizationLogo: null,    // Single image file for Organization Logo
  },
    });
    setActiveModal(null);
  };
  const closeModalWithoutReset = () => {
    setActiveModal(null); // Only close the modal without resetting modalData
  };

const handleProductCreation = async () => {
    setIsSubmitting(true);

    const entityId = localStorage.getItem("entityId");
    const entityType = localStorage.getItem("orgType");
    const orgName = localStorage.getItem("orgName")
    const orgWebsite = localStorage.getItem("orgWebsite")

    // Prepare payload using modalData
    const payload = {
      organization_name: orgName,
      organization_website_url: orgWebsite,
      // For logos and screenshots, you'd typically upload files separately and get URLs, but here
      // I'll just send null or empty string as placeholder, replace with your uploaded URLs:
      organization_logo_url: modalData.fourth.organizationLogo ? modalData.fourth.organizationLogo.url || "" : "",

      product_name: modalData.first.name,
      product_logo_url: modalData.fourth.productLogo ? modalData.fourth.productLogo.url || "" : "",
      product_website_url: modalData.first.productUrl,

      product_short_description: modalData.first.description,
      product_detailed_features: modalData.second.detailedFeatures,

      pricing_model: modalData.second.pricingModel,
      pricing_details: {
        free: modalData.second.pricingModel.toLowerCase() === "free",
        pro_plan: ["Subscription", "Paid"].includes(modalData.second.pricingModel.toLowerCase())
          ? modalData.second.pricingDetails
          : "",
      },


      primary_category: modalData.first.primaryCategory,
      sub_categories: modalData.first.categories,
      keywords_tags: modalData.first.tags,

      available_platforms: modalData.second.availablePlatforms,
      api_access_available: modalData.second.apiAccessAvailable.toLowerCase() === "yes",
      integration_options: modalData.second.integrationOptions,

      // For screenshots, again you need URLs from your upload process, just placeholder empty array for now
      product_screenshots: modalData.fourth.productScreenshots
        ? modalData.fourth.productScreenshots.map((file) => file.url || "")
        : [],

      demo_video_url: modalData.second.demoVideoUrl,

      support_email: modalData.third.supportEmail,
      help_center_url: modalData.third.helpCenterUrl,
      contact_person_name: modalData.third.contactPersonName,
      contact_person_email: modalData.third.contactPersonEmail,

      twitter_url: modalData.third.twitterUrl,
      linkedin_url: modalData.third.linkedinUrl,
      discord_link: modalData.third.discordUrl,

      launch_date: modalData.third.launchDate,
      available_regions: modalData.third.regionsAvailable,
      compliance_certifications: modalData.third.complianceCertifications,

      approval_status: "pending",
      partnership_type: "standard",
      comments: [],
      metadata: {
        source: "manual submission",
      },

      added_by_entity_type: entityType,
      added_by_entity_id: entityId,
    };

    try {
      const response = await axios.post(
        "https://xklp1j7zp3.execute-api.ap-southeast-2.amazonaws.com/default/voyex_tool_workspace",
        payload
      );

        console.log("🚀 Full response from server:", response); // Always logs the response
        console.log("🚀 Full response from server:", response);
        console.log("📦 Response status:", response.status);


      if (response.status >= 200 && response.status < 300) {
        toast.success("Product details sent successfully!");
        setIsSubmitting(false);
        fetchProducts()
         // Close modal on success
        // Optionally refresh product list or add new product to your list
      } else {
        throw new Error("Failed to create product");
      }
    }catch (error) {
  if (error.response) {
    console.error("Response data:", error.response.data);
    console.error("Response status:", error.response.status);
    console.error("Response headers:", error.response.headers);
  } else if (error.request) {
    console.error("No response received:", error.request);
  } else {
    console.error("Error message:", error.message);
  }
  console.error("Full error object:", error);
  toast.error("Error creating product: " + error.message);
  setIsSubmitting(false);
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


const filteredProducts = products.filter((product) =>
  product.product_name.toLowerCase().includes(searchQuery.toLowerCase())
);


if (isSubmitting) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-80">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C088FB]"></div>
      <p className="mt-4 text-white">Please wait while we send your data...</p>
    </div>
  );
}

  return (
    <main className="flex-grow relative flex h-screen w-full flex-col gap-10 pt-6 px-6 justify-between items-center overflow-y-scroll scrollbar-hide">
      {/* Default Layout (when no product is created) */}
      {!isProductCreated && !isLoading  && !isSubmitting ? (
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
  {filteredProducts.map((product) => (
    <Product
      key={product.tool_id}
      toolId={product.tool_id}
      name={product.product_name}
      logo={product.product_logo_url}
      description={product.product_short_description}
      subCategories={product.sub_categories}
    />
  ))}
</div>

          </div>
        </div>
      )}

      {/* Footer */}
      <BenFooter />

      {isLoading && (
  <div className="fixed inset-0 flex justify-center items-center bg-opacity-50 z-50">
    <div className="flex justify-center items-center flex-col p-6 rounded-lg shadow-lg">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C088FB]"></div>
      <p className="mt-2 text-white">Please wait while we check if you have any Tool... </p>
    </div>
  </div>
)}


      {/* Render Active Modal */}
      {renderModal()}
    </main>
  );
}

export default WorkSpace;