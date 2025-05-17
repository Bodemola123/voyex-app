'use client'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import "../../../globals.css"
import BenNavbar from '@/components/common/BenNavbar'
import BenFooter from '@/components/common/BenFooter'
import AiNavOpen from '@/components/galatimart-page/AiNavOpen'
import Header from './Header'
import Body from './Body'

const Aidescription = () => {
  const [isHistoryVisible, setIsHistoryVisible] = useState(false);
  const [toolData, setToolData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedTools, setRelatedTools] = useState([]);

  const params = useParams();
  const slug = params?.slug || '';
  const toolId = slug.split('-')[0];

  useEffect(() => {
    const savedState = localStorage.getItem('isHistoryVisible');
    if (savedState !== null) {
      setIsHistoryVisible(JSON.parse(savedState));
    }
  }, []);

  const toggleHistoryVisibility = () => {
    setIsHistoryVisible((prev) => {
      const newState = !prev;
      localStorage.setItem('isHistoryVisible', JSON.stringify(newState));
      return newState;
    });
  };

  
  useEffect(() => {
    if (!toolId) return;
  
    const fetchTool = async () => {
      try {
        setLoading(true);
  
        // Fetch main tool
        const res = await fetch(`https://2zztcz7h0a.execute-api.ap-southeast-2.amazonaws.com/default/voyex_tools_api?tool_id=${toolId}`);
        const data = await res.json();
        const tool = data?.data;
if (!tool) throw new Error("Invalid tool data received.");
        setToolData(tool);
  
        if (tool.category) {
          const categoryRes = await fetch(
            `https://2zztcz7h0a.execute-api.ap-southeast-2.amazonaws.com/default/voyex_tools_api?category=${tool.category}`
          );
          const categoryData = await categoryRes.json();
        
          const tools = Array.isArray(categoryData.data?.[tool.category])
            ? categoryData.data[tool.category]
            : [];
        
          console.log("Category API response:", categoryData);
        
          // Filter out current tool
          const filtered = tools.filter(t => t.tool_id !== tool.tool_id);
        
          // Shuffle and pick 5 random tools
          const shuffled = filtered.sort(() => 0.5 - Math.random());
          const randomFive = shuffled.slice(0, 5);
        
          setRelatedTools(randomFive);
          console.log("The random five", randomFive);
        }
        
      } catch (err) {
        console.error('Error fetching tool data or related tools:', err);
        setError('Failed to load tool data.');
      } finally {
        setLoading(false);
      }
    };
  
    fetchTool();
  }, [toolId]);
  

  return (
    <div className='flex flex-row items-center w-full h-screen'>
      <BenNavbar
        toggleHistoryVisibility={toggleHistoryVisibility}
        isHistoryVisible={isHistoryVisible}
      />

      <div className={`transition-all duration-300 ${isHistoryVisible ? 'w-[360px]' : 'w-0'} bg-[#131314] overflow-hidden`}>
        {isHistoryVisible && toolData?.usecases && (
          <AiNavOpen useCase={toolData.usecases} />
        )}
      </div>

      <div className='text-white relative flex flex-grow flex-col gap-10 p-6 justify-between w-full h-full overflow-y-scroll scrollbar-hide scroll-container'>
        {loading ? (
                <div className="w-full h-full flex flex-col gap-2 justify-center items-center mx-auto my-auto">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C088FB]"></div>
                <p className="text-lg text-white text-center">Fetching Tool Data.... Please wait</p>
              </div>

        ) : error ? (
          <p className="text-red-400 text-lg text-center mx-auto my-auto">{error}</p>
        ) : (
          <>
            <Header
              logo={toolData.logo_url}
              title={toolData.tool_name}
              rating={toolData.rating}
              userCount={"5M+"}
              category={toolData.category}
              toolUrl={toolData.tool_url}
              tags={toolData.use_case_tags}
            />
            <Body
            description={toolData.large_description}
            relatedTools={relatedTools}
            developerNote={toolData.developer_note}
            plansBenefits={toolData.plan_benefits}
            userReviews={toolData.user_reviews}
            title={toolData.tool_name}
            rating={toolData.rating}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Aidescription;
