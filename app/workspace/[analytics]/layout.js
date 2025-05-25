'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import BenFooter from '@/components/common/BenFooter';
import AnalyticsHeader from '@/components/workspace-page/AnalyticsHeader';
import UsageInfoContainer from '@/components/workspace-page/UsageInfoContainer';
import { MdErrorOutline } from 'react-icons/md';

function AnalyticsLayout({ children }) {
  const { analytics } = useParams();
  const [toolData, setToolData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!analytics) return;

    const toolId = analytics.split('-')[0]; // Extract toolId
    const apiUrl = `https://xklp1j7zp3.execute-api.ap-southeast-2.amazonaws.com/default/voyex_tool_workspace?tool_id=${toolId}`;

    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (data.tool) setToolData(data.tool);
        else throw new Error('Tool data not found in response');
      })
      .catch((err) => {
        console.error('Failed to fetch tool data:', err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [analytics]);

  if (loading) {
    return (
      <div className="flex  flex-col gap-2 items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C088FB]"></div>
        <p className="text-white">Loading tool data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col gap-2 items-center justify-center h-screen">
        <MdErrorOutline className='text-5xl text-red-500'/>
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 w-full h-full">
      <AnalyticsHeader toolData={toolData} />
      <UsageInfoContainer toolData={toolData} />
      {/* Pass toolData to children */}
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { toolData })
      )}
      <BenFooter />
    </div>
  );
}

export default AnalyticsLayout;
