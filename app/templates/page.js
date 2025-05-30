"use client";
import React, { useEffect, useState } from "react";
import BenNavbar from "@/components/common/BenNavbar";
import Card from "@/components/templates-page/Card";
import Header from "@/components/templates-page/Header";
import TemplatesCollapsible from "@/components/templates-page/TemplatesCollapsible";
import { MdErrorOutline } from "react-icons/md";

function Templates() {
  const [isHistoryVisible, setIsHistoryVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [templates, setTemplates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [sortByNewest, setSortByNewest] = useState(false);
  const [ratingFilter, setRatingFilter] = useState(null);

  // On component mount, retrieve state from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem("isHistoryVisible");
    if (savedState !== null) {
      setIsHistoryVisible(JSON.parse(savedState));
    }
  }, []);

  const toggleHistoryVisibility = () => {
    setIsHistoryVisible((prev) => {
      const newState = !prev;
      localStorage.setItem("isHistoryVisible", JSON.stringify(newState));
      return newState;
    });
  };

  // Fetch templates on mount
useEffect(() => {
  const fetchTemplates = async () => {
    setIsLoading(true);
    setFetchError(false);

    try {
      const storedTemplates = sessionStorage.getItem("voyexTemplates");

      if (storedTemplates) {
        setTemplates(JSON.parse(storedTemplates));
        setIsLoading(false);
        return;
      }

      const response = await fetch(
        "https://datufuybl2.execute-api.ap-southeast-2.amazonaws.com/default/voyexTemplates"
      );
      const data = await response.json();

      if (data.templates && Array.isArray(data.templates)) {
        const filtered = data.templates.map((template) => ({
          template_id: template.template_id,
          name: template.name,
          logo_url: template.logo_url,
          short_description: template.short_description,
          large_description: template.large_description,
          usecases: template.usecases,
          rating: template.rating,
          pricing: template.pricing,
          global_use: template.global_use,
          ease_of_use: template.ease_of_use,
          updated_at: template.updated_at,
        }));

        // Save to state and sessionStorage
        setTemplates(filtered);
        sessionStorage.setItem("voyexTemplates", JSON.stringify(filtered));
      } else {
        setFetchError(true);
      }
    } catch (error) {
      console.error("Failed to fetch templates:", error);
      setFetchError(true);
    } finally {
      setIsLoading(false);
    }
  };

  fetchTemplates();
}, []);


  // Filter + Sort logic
  const filteredTemplates = templates
    .filter((template) => {
      const matchesSearch = template.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
        const matchesRating =
          ratingFilter === null ||
          (ratingFilter === 1
            ? template.rating < 2
            : template.rating >= ratingFilter && template.rating < ratingFilter + 1);

      return matchesSearch && matchesRating;
    })
    .sort((a, b) => {
      if (sortByNewest) {
        return new Date(b.updated_at) - new Date(a.updated_at);
      }
      return 0;
    });

  return (
    <div className="flex flex-row items-center w-screen h-screen">
      <BenNavbar
        toggleHistoryVisibility={toggleHistoryVisibility}
        isHistoryVisible={isHistoryVisible}
      />

      <div className="flex-grow relative flex h-full w-full flex-col gap-10 p-6 items-center overflow-y-scroll scrollbar-hide scroll-container">
        <Header
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          ratingFilter={ratingFilter}
          setRatingFilter={setRatingFilter}
          sortByNewest={sortByNewest}
          setSortByNewest={setSortByNewest}
        />

        {/* Loading Screen */}
        {isLoading && (
          <div className="fixed inset-0 flex justify-center items-center bg-opacity-50 z-50 bg-[#0A0A0B]">
            <div className="flex justify-center items-center flex-col p-6 rounded-lg shadow-lg">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C088FB]"></div>
              <p className="mt-2 text-white">
                Please wait while we fetch the Templates...
              </p>
            </div>
          </div>
        )}

        {/* Error Screen */}
        {!isLoading && fetchError && (
          <div className="justify-center items-center text-red-500 p-4 bg-[#1c1d1f] rounded-lg text-center flex flex-col gap-2">
            <MdErrorOutline className="text-5xl text-red-500" />
            Failed to fetch Templates, Please try again later
          </div>
        )}

        {/* Main content if no error */}
        {!isLoading && !fetchError && (
          <div className="w-full">
            <Card
              selectedProduct={selectedProduct}
              setSelectedProduct={setSelectedProduct}
              templates={filteredTemplates}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Templates;
