'use client';
import React, { useState } from 'react';
import StepsProductCard from './StepsProductCard';
import ToolDetailsModal from './ToolDetailsModal';

const Body = ({ templateData, toolsData }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [selectedTool, setSelectedTool] = useState(null); // modal state

  const steps = templateData.steps_used;
  const currentStep = steps[currentStepIndex];

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

const getToolDetails = (toolIds) => {
  return toolIds
    .map((id) => toolsData[id]?.data)
    .filter(Boolean);
};


  return (
    <>
      <div className="flex flex-col gap-8 w-full">
        {/* Step Timeline */}
        <div className="bg-[#1c1d1f] border p-4 gap-x-6 gap-y-3 flex flex-wrap justify-center items-center border-[#FFFFFF26] rounded-2xl">
          {steps.map((step, index) => (
            <div
              key={step.step_id}
              className="flex flex-row gap-1.5 justify-center items-center"
            >
              <div
                className={`${
                  index === currentStepIndex
                    ? 'bg-[#C088FB] border-[1.74px] border-[#C088FB]'
                    : 'bg-transparent'
                } px-2.5 py-1.5 rounded-[23.47px]`}
              >
                <p
                  className={`${
                    index === currentStepIndex
                      ? 'text-[#0D0D0D] text-[14px] font-black'
                      : 'text-[#c088fb] text-[14px] font-black'
                  }`}
                >
                  {step.step_id}
                </p>
              </div>
              <p
                className={`text-sm font-bold ${
                  index === currentStepIndex ? 'text-[#ffffff]' : 'text-[#565656]'
                }`}
              >
                {step.step_name}
              </p>
            </div>
          ))}
        </div>

        {/* Step Header & Description */}
        <div className="flex flex-col gap-4 items-start justify-start">
          <div className="flex flex-row gap-2.5 items-center ">
            <p className="font-bold text-4xl uppercase">{currentStep.step_name}</p>
            <div className="bg-[#C088FB33] rounded-[17px] px-4 py-2">
              <p className="text-[#C088FB] text-sm font-extrabold">
                Step {currentStep.step_id}
              </p>
            </div>
          </div>
          <div className="font-normal text-base text-[#ffffff]">
            <p>{currentStep.step_description}</p>
          </div>
        </div>

        {/* Suggested Tools */}
        <div className="flex flex-col gap-4 ">
          <p className="text-[24px] text-[#f4f4f4] font-bold">Suggested Tools</p>
          <p className="text-base font-normal">
            Where the cosmic meets the artificial, these stellar tools will help you chart your
            course and{' '}
            <span className="font-bold lowercase">{currentStep.step_name}</span> with precision:
          </p>
          <div className="overflow-x-scroll scrollbar-hide grid grid-rows-1 grid-flow-col gap-4 w-full">
            {getToolDetails(currentStep.tools).map((tool) => (
              <StepsProductCard
                key={tool.tool_id}
                tool={tool}
                onSeeDetails={() => setSelectedTool(tool)} // <-- Pass open modal handler
              />
            ))}
          </div>
        </div>

        {/* Step Navigation */}
        <div className="flex justify-between items-center w-full -mt-4">
          {currentStepIndex > 0 && (
            <button
              onClick={handlePrevious}
              className="rounded-[30px] px-4 py-3 bg-[#ffffff] hover:scale-105 transition"
            >
              <p className="text-sm font-black text-black">Previous Step</p>
            </button>
          )}
          {currentStepIndex < steps.length - 1 && (
            <button
              onClick={handleNext}
              className="rounded-[30px] px-4 py-3 bg-[#ffffff] hover:scale-105 transition"
            >
              <p className="text-sm font-black text-black">Continue to Next Step</p>
            </button>
          )}
        </div>
      </div>

      {/* Modal rendering */}
      {selectedTool && (
        <ToolDetailsModal tool={selectedTool} onClose={() => setSelectedTool(null)} />
      )}
    </>
  );
};

export default Body;
