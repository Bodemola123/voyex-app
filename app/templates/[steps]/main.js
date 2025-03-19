

// import { useParams } from 'next/navigation';
// import { useEffect, useState } from 'react';

// const TemplatePage = () => {
//     const params = useParams();
//     const { id } = params;
//     const [templateData, setTemplateData] = useState(null);

//     useEffect(() => {
//         // Simulating fetching template data
//         setTimeout(() => {
//             setTemplateData({ description: `Details for Template ID: ${id}` });
//         }, 1000);
//     }, [id]);

//     return (
//         <div className="min-h-screen bg-[#0a0a0b] text-white flex flex-col items-center justify-center">
//             <h1 className="text-4xl font-bold">Template ID: {id}</h1>
//             {templateData ? (
//                 <p className="text-lg mt-4">{templateData.description}</p>
//             ) : (
//                 <p className="text-lg mt-4">Loading template details...</p>
//             )}
//         </div>
//     );
// };

// export default TemplatePage;

// "use client";
// import { useState } from "react";

// const TemplateDetailsPage = () => {
//   const steps = [
//     { id: 1, title: "Market Analysis", description: "Lorem ipsum dolor sit, amet consectetur adipiscing elit. Numquam, hic voluptatem nostrum non perferendis ab eveniet, aliquam ea, voluptatum" },
//     { id: 2, title: "Market Analysis", description: "Lorem ipsum dolor sit, amet consectetur adipiscing elit. Numquam, hic voluptatem nostrum non perferendis ab eveniet, aliquam ea, voluptatum" },
//     { id: 3, title: "Market Analysis", description: "Lorem ipsum dolor sit, amet consectetur adipiscing elit. Numquam, hic voluptatem nostrum non perferendis ab eveniet, aliquam ea, voluptatum" },
//     { id: 4, title: "Market Analysis", description: "Lorem ipsum dolor sit, amet consectetur adipiscing elit. Numquam, hic voluptatem nostrum non perferendis ab eveniet, aliquam ea, voluptatum" },
//   ];

//   const [currentStep, setCurrentStep] = useState(1);

//   return (
//     <div className="min-h-screen bg-black text-white relative">
//       {/* Starry Background */}
//       <div className="absolute inset-0 bg-[url('/stars.png')] bg-cover opacity-30"></div>

//       <div className="relative z-10 p-6">
//         {/* Header */}
//         <div className="flex justify-between items-center">
//           <button className="px-4 py-2 bg-gray-800 rounded-lg text-gray-400 hover:bg-gray-700">
//             ← How to create UI/UX contents
//           </button>
//           <button className="px-4 py-2 bg-gray-800 rounded-lg text-gray-400 hover:bg-gray-700">
//             ⊕ Share Template
//           </button>
//         </div>

//         <h2 className="text-3xl font-bold mt-4">How to create UI/UX contents</h2>
//         <p className="text-gray-400">Complete your Video content creation in 4 Steps</p>

//         <div className="flex mt-6 gap-6">
//           {/* Left: Steps List */}
//           <div className="w-2/3 space-y-4">
//             {steps.map((step) => (
//               <div
//                 key={step.id}
//                 onClick={() => setCurrentStep(step.id)}
//                 className={`p-5 border rounded-xl cursor-pointer transition-all ${
//                   currentStep === step.id ? "border-purple-400 bg-[#181818]" : "border-gray-700"
//                 }`}
//               >
//                 <h3 className="text-sm text-gray-400">Step {step.id}</h3>
//                 <h4 className="text-lg font-bold text-purple-400">{step.title}</h4>
//                 <p className="text-gray-400">{step.description}</p>
//                 <button className="mt-2 px-4 py-2 bg-black border border-gray-600 text-white rounded-md hover:bg-gray-900">
//                   View Full Details
//                 </button>
//               </div>
//             ))}
//           </div>

//           {/* Right: Step Details */}
//           <div className="w-1/3 p-6 bg-[#111] rounded-lg border border-gray-700">
//             <h3 className="text-lg font-bold">Step {currentStep}:</h3>
//             <h4 className="text-purple-400">{steps[currentStep - 1].title}</h4>
//             <p className="text-gray-400">{steps[currentStep - 1].description}</p>

//             {/* Tabs */}
//             <div className="flex gap-4 mt-4 text-gray-400">
//               <span className="border-b-2 border-gray-700 pb-1">Apps & Fee</span>
//               <span className="pb-1">Usability</span>
//               <span className="pb-1">Actions & To-do</span>
//             </div>

//             {/* Apps & Fee Section */}
//             <div className="mt-4 space-y-2">
//               {[1, 2, 3].map((_) => (
//                 <div key={_} className="p-3 bg-[#222] rounded-lg flex items-center justify-between">
//                   <div className="flex items-center gap-3">
//                     <span className="text-lg">🤖</span>
//                     <span>ChatGPT</span>
//                   </div>
//                   <span className="text-gray-400 text-sm">$4.00 - $8.00/Free</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TemplateDetailsPage;

"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Share2, Copy, Edit, X } from "lucide-react";
import React, { useState } from "react";

const steps = [
  { id: 1, title: "Market Analysis", description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Numquam, hic voluptatem nostrum non perferendis ab eveniet, aliquam ea, voluptatum" },
  { id: 2, title: "Market Analysis", description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Numquam, hic voluptatem nostrum non perferendis ab eveniet, aliquam ea, voluptatum" },
  { id: 3, title: "Market Analysis", description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Numquam, hic voluptatem nostrum non perferendis ab eveniet, aliquam ea, voluptatum" },
  { id: 4, title: "Market Analysis", description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Numquam, hic voluptatem nostrum non perferendis ab eveniet, aliquam ea, voluptatum" },
];

const tabs = ["Apps & Fee", "Usability", "Actions & To-do"];

const Main = () => {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedStep, setSelectedStep] = useState(null);

  // Get step ID from params
  const currentStep = Number(params.steps) || 1;

  return (
    <div className="w-full mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center">
        {/* Back Button */}
        <button className="flex items-center gap-3" onClick={() => router.push("/templates")}>
          {/* Back Icon */}
          <div className="w-10 h-10 flex items-center justify-center border border-gray-500 rounded-md">
            <Image src="/back-icon.png" alt="Back Icon" width={15} height={15} unoptimized />
          </div>

          {/* Button Text */}
          <span className="text-[16px] font-medium text-white bg-[#111111] bg-opacity-50 px-4 py-2 rounded-xl">
            How to create UI/UX contents
          </span>
        </button>

        {/* Share Button */}
        <button className="flex items-center gap-2 px-4 py-2 bg-[#111111] bg-opacity-50 rounded-xl text-white hover:bg-opacity-80 transition">
          <Share2 size={18} />
          <span className="text-[14px] font-medium">Share Template</span>
        </button>
      </div>

      {/* Title Section */}
      <div className="mt-8 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-semibold">How to create UI/UX contents</h1>
          <p className="text-gray-400 mt-2">Complete your video content creation in 4 steps</p>
        </div>
        <p className="text-gray-400 font-medium">Steps: {currentStep}/4</p>
      </div>

      <div className="mt-8 flex gap-8">
        {/* Steps List */}
        <div className="w-2/3 space-y-4">
          {steps.map((step) => (
            <div
              key={step.id}
              className={`p-6 rounded-xl transition-all duration-300 backdrop-blur-md border border-[#222222] hover:border-4 hover:border-[#C088FB] hover:shadow-lg ${
                currentStep === step.id ? "bg-[#111111]/50" : "bg-[#111111]/30"
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-400">Step {step.id}</p>
                  <h3 className="text-xl font-semibold text-[#C088FB] mt-1">{step.title}</h3>
                  <p className="text-gray-400 mt-2 text-sm leading-relaxed">
                    {step.description.slice(0, 100)}...
                  </p>
                </div>
                <Copy className="text-gray-400" size={20} />
              </div>

              {/* Only this button should trigger the details panel */}
              <button
                className="mt-4 px-4 py-2 bg-black bg-opacity-50 text-sm rounded-lg border border-[#222222] hover:bg-opacity-80 transition"
                onClick={() => setSelectedStep(step.id)}
              >
                View Full Details
              </button>
            </div>
          ))}
        </div>

        {/* Details Panel */}
        {selectedStep !== null && (
          <div className="w-1/3 bg-[#111111]/50 backdrop-blur-lg rounded-xl border border-[#222222] p-6 relative">
            {/* Close Button */}
            <button
              className="p-0 bg-[#181818] bg-opacity-50 rounded-full hover:bg-opacity-80 transition cursor-pointer"
              onClick={() => setSelectedStep(null)} // Close the current step
            >
              <img src="/close-icon.png" alt="Close" className="w-5 h-5" />
            </button>

            {/* Step Details */}
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xl font-semibold">Step {selectedStep}:</p>
                <h3 className="text-lg mt-1">{steps[selectedStep - 1]?.title}</h3>
              </div>
              <Edit className="text-gray-400 cursor-pointer" size={20} />
            </div>

            {/* Line after "Market Analysis" */}
            <hr className="border-[#222222] my-5" />

            <p className="text-gray-400 text-sm leading-relaxed">
              {steps[selectedStep - 1]?.description}
            </p>

            {/* Line after the paragraph */}
            <hr className="border-[#222222] my-5" />

            {/* Tabs */}
            <div className="flex gap-6 mt-6 border-b border-[#222222]">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => router.push(`/template/${selectedStep}?tab=${tab}`)}
                  className={`pb-2 text-sm ${
                    searchParams.get("tab") === tab
                      ? "text-white border-b-2 border-[#C088FB] font-medium"
                      : "text-gray-400 hover:text-gray-300"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Apps List */}
            <div className="mt-6 space-y-3">
              {[1, 2, 3].map((index) => (
                <div key={index} className="p-4 bg-[#181818]/50 backdrop-blur-md rounded-xl flex flex-col">
                  <div className="flex items-start">
                    <Image src="/chatgpt.svg" alt="ChatGPT Logo" width={40} height={40} />
                  </div>
                  <div className="mt-2 flex justify-between">
                    <p className="font-medium text-white">ChatGPT</p>
                    <p className="text-sm text-gray-400 font-semibold">$4.00 - $8.00 / Free</p>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">
                    Supports GPT-4 and GPT-3.5, OpenAI&apos;s next-generation conversational AI...
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Main;

