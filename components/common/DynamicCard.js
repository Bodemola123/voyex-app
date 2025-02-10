import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function DynamicCard() {
  const [activeSection, setActiveSection] = useState(0);

  // Content for each section
  const sections = [
    {
      id: 0,
      image: "/Chatbot.svg", // Replace with your image paths
      title: "Discover AI Tools",
      description: "Voyex's AI query engine finds the best tools for your tasks, saving you time on research and maximizing efficiency.",
    },
    {
      id: 1,
      image: "/Galactimart.svg", // Replace with your image paths
      title: "Maximize Efficiency",
      description: "Voyex Galactimart is a marketplace for AI products, providing a seamless platform for discovering and accessing AI tools.",
    },
    {
      id: 2,
      image: "/Chatbot.svg", // Replace with your image paths
      title: "Tailored Workflows",
      description: "Voyex delivers the best tools and workflows, adapting with feedback to ensure tasks are completed efficiently from start to finish.",
    },
  ];

  // Auto-change sections every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSection((prev) => (prev + 1) % sections.length);
    }, 10000); // 10 seconds in milliseconds

    return () => clearInterval(interval); // Cleanup interval
  }, [sections.length]);

  // Change section on indicator click
  const handleIndicatorClick = (id) => {
    setActiveSection(id);
  };

  return (
    <div className="relative bg-transparent text-[#ffffff] rounded-2xl w-full overflow-y-auto scrollbar-hide gap-8 flex justify-end flex-col items-center max-w-[686px] mx-auto">
      {/* Card Content */}
      {/* Dynamic Image */}
      <div className="transition-all duration-500 ease-in-out">
        <Image
          src={sections[activeSection].image}
          alt={sections[activeSection].title}
          width={648}
          height={432}
          className="object-cover rounded-lg mx-auto"
        />
      </div>
      {/* Dynamic Text */}
      <div className="h-[126px] text-center transition-all duration-500 ease-in-out">
        <p className="text-3xl">{sections[activeSection].description}</p>
      </div>

      {/* Section Indicators */}
      <div className="flex justify-center items-center space-x-2">
        {sections.map((section) => (
          <span
            key={section.id}
            onClick={() => handleIndicatorClick(section.id)} // Handle click
            className={`w-8 h-2.5 rounded-[28px] cursor-pointer transition-colors duration-300 ease-in-out ${
              activeSection === section.id ? "bg-[#c088fb]" : "bg-[#1d1d1f]"
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
}
