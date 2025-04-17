// components/AnalyticsManagerWrapper.js
'use client';  // Ensure this file is treated as client-side only
import AnalyticsManager from '@/utils/AnalyticsManager';
import { useEffect } from 'react';


const AnalyticsManagerWrapper = () => {
  useEffect(() => {
    AnalyticsManager.init(); // Initialize AnalyticsManager
  }, []);

  return null; // This component doesn't render anything
};

export default AnalyticsManagerWrapper;
