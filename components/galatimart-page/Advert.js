import Link from 'next/link';
import React, { useState, useEffect } from 'react';

const sections = [
  {
    id: 1,
    title: "Join as an Organization Today!",
    description: "Beam your AI tool into the spotlight. Galactimart connects your creation with innovators and adventurers from every corner of the cosmos.",
  },
  {
    id: 2,
    title: "Feature Your AI on Galactimart",
    description: "Showcase your innovations to a galaxy of users. Let explorers discover your tool as they journey through the AI universe.",
  },
  {
    id: 3,
    title: "Launch Your AI to New Heights",
    description: "Get your AI tool discovered by builders, thinkers, and creators across the stars. Visibility starts here.",
  },
];

const Advert = () => {
  const [activeSection, setActiveSection] = useState(sections[0].id);

  // Auto-rotate every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSection((prevId) => {
        const currentIndex = sections.findIndex(section => section.id === prevId);
        const nextIndex = (currentIndex + 1) % sections.length;
        return sections[nextIndex].id;
      });
    }, 10000); // 10 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const handleIndicatorClick = (id) => {
    setActiveSection(id);
  };

  const activeContent = sections.find((section) => section.id === activeSection);

  return (
    <div className="w-full h-full">
      <div className="w-full h-full border border-[#FFFFFF26] bg-[#131314] flex flex-row justify-between gap-8 rounded-[32px]">
        <div className="flex flex-col gap-5 justify-center items-start px-8 py-6">
          <div className="flex flex-col gap-4 max-w-[658px]">
            <p className="text-[40px] font-bold text-[#F4F4F4] text-left">
              {activeContent.title}
            </p>
            <p className="text-left text-[#F4F4F4]">
              {activeContent.description}
            </p>
          </div>
          <Link
            href="/auth/organization"
            className="bg-[#c088fb] flex justify-center items-center py-4 px-4 rounded-[30px] text-base font-medium text-[#0A0A0B] w-[373px]"
          >
            <p>Register as an Organization</p>
          </Link>
        </div>

        {/* Background Image Div */}
        <div
          className="flex-1 bg-no-repeat bg-center bg-cover rounded-r-[32px]"
          style={{ backgroundImage: "url('/Advert1.svg')" }}
        ></div>
      </div>

      {/* Section Indicators */}
      <div className="flex justify-center items-center space-x-2 mt-4">
        {sections.map((section) => (
          <span
            key={section.id}
            onClick={() => handleIndicatorClick(section.id)}
            className={`w-[13.38px] h-[13.38px] rounded-full cursor-pointer transition-colors duration-300 ease-in-out ${
              activeSection === section.id ? "bg-[#c088fb]" : "bg-[#131314] border border-[#FFFFFF26]"
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Advert;
