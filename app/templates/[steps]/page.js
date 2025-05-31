"use client";

import BenNavbar from '@/components/common/BenNavbar';
import StepsNavOpen from '@/components/templates-page/StepsNavOpen';
import React, { useEffect, useState } from 'react';
import StepsHeader from './StepsHeader';
import { useParams } from 'next/navigation';
import Body from './Body';

const Page = () => {
  const [isHistoryVisible, setIsHistoryVisible] = useState(false);
  const [templateData, setTemplateData] = useState(null);
  const [toolsData, setToolsData] = useState({});
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const { steps } = useParams();

  const [templateId] = steps.split('-');

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

  // Fake progress bar effect
  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setProgress(prev => {
          const next = Math.min(prev + Math.random() * 10, 95);
          return next;
        });
      }, 300);
      return () => clearInterval(interval);
    }
  }, [loading]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`https://datufuybl2.execute-api.ap-southeast-2.amazonaws.com/default/voyexTemplates?template_id=${templateId}`);
        if (!res.ok) throw new Error('Failed to fetch template data');
        const data = await res.json();
        const template = data.template;
        setTemplateData(template);

        const toolIds = [...new Set(template.steps_used.flatMap(step => step.tools))];

        const tools = await Promise.all(
          toolIds.map(async (toolId) => {
            const res = await fetch(`https://2zztcz7h0a.execute-api.ap-southeast-2.amazonaws.com/default/voyex_tools_api?tool_id=${toolId}`);
            if (!res.ok) throw new Error(`Failed to fetch tool ${toolId}`);
            const data = await res.json();
            return { toolId, data };
          })
        );

        const toolsMap = {};
        tools.forEach(({ toolId, data }) => {
          toolsMap[toolId] = data;
        });
        setToolsData(toolsMap);
        setProgress(100);
        setTimeout(() => setLoading(false), 300); // slight delay to complete progress bar
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Oops! Something went wrong while loading your experience.");
        setLoading(false);
      }
    };

    if (templateId) {
      fetchData();
    }
  }, [templateId]);

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(19,19,20,0.8)]">
        <div className="bg-[#1C1D1F] p-[27px] items-center h-full w-full flex flex-col gap-[29px] rounded-[41px] max-w-[794px] max-h-[585px] overflow-y-scroll scrollbar-hide">
          <span className="flex items-center justify-center py-[23px] text-5xl font-bold text-[#f4f4f4]">
            Voyex
          </span>
          <div className="flex flex-row items-center justify-between py-[71px] w-full max-w-[900px]">
            <div className="flex flex-col gap-6 items-start flex-grow">
              <p className="text-2xl font-medium text-[#ffffff]">Creating your personalized Experience</p>
              <p className="text-base font-normal text-[#ffffff]">
                Wait while voyex generates the perfect templates for you
              </p>
              <div className="bg-[#ffffff] w-[354px] h-[14px] rounded-[25px] overflow-hidden">
                <div
                  style={{
                    width: progress === 100 ? '101%' : `${progress}%`,
                    height: '100%',
                    backgroundImage: 'linear-gradient(89.86deg, #C088FB 0.12%, #725195 80.93%)',
                    transition: progress === 100 ? 'none' : 'width 0.3s ease',
                  }}
                />
              </div>
            </div>
            <span className="text-[107px] font-medium text-white">{Math.floor(progress)}%</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center text-white px-6">
        <h1 className="text-4xl font-bold mb-4">Error</h1>
        <p className="text-lg mb-6">{error}</p>
        <button
          onClick={() => location.reload()}
          className="px-6 py-3 bg-[#C088FB] hover:bg-[#A76DF1] rounded-xl font-bold text-black"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-row items-center w-screen h-screen">
      <BenNavbar
        toggleHistoryVisibility={toggleHistoryVisibility}
        isHistoryVisible={isHistoryVisible}
      />
      <div className="flex-grow relative flex h-full w-full flex-col gap-6 p-4 justify-start items-center overflow-y-scroll scrollbar-hide scroll-container">
        <StepsHeader templateData={templateData} />
        <Body templateData={templateData} toolsData={toolsData} />
      </div>
    </div>
  );
};

export default Page;
