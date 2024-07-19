'use client'
import React, { useState, useLayoutEffect } from 'react';

const breakpoints = {
  xs: { width: 500, height: 400 },    // Extra small screens
  sm: { width: 800, height: 600 },    // Small screens
  md: { width: 1000, height: 700 },   // Medium screens
  lg: { width: 1200, height: 800 },   // Large screens
  xl: { width: 1400, height: 900 },   // Extra large screens
  xxl: { width: 1600, height: 1000 }  // Extra extra large screens
};

const Index = () => {
  const [activeTab, setActiveTab] = useState('zoho');
  const [iframeSize, setIframeSize] = useState(breakpoints.md);

  useLayoutEffect(() => {
    const getIframeSize = () => {
      const width = window.innerWidth;

      if (width >= 1400) return breakpoints.xxl; // >= 1400px
      if (width >= 1200) return breakpoints.xl;  // >= 1200px
      if (width >= 992) return breakpoints.lg;   // >= 992px
      if (width >= 768) return breakpoints.md;   // >= 768px
      if (width >= 576) return breakpoints.sm;   // >= 576px
      return breakpoints.xs;                     // < 576px
    };

    const handleResize = () => {
      setIframeSize(getIframeSize());
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const { width, height } = iframeSize;

  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='mb-4'>
        <button
          className={`px-4 py-2 ${activeTab === 'zoho' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('zoho')}
        >
          Zoho Dashboard
        </button>
        <button
          className={`ml-2 px-4 py-2 ${activeTab === 'powerbi' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('powerbi')}
        >
          PowerBI Dashboard
        </button>
      </div>
      <div className='w-full flex justify-center'>
        {activeTab === 'zoho' && (
          <iframe
            frameBorder='0'
            width={width}
            height={height}
            src={`${process.env.NEXT_APP_TRACK_URL}`}
          ></iframe>
        )}
        {activeTab === 'powerbi' && (
          <iframe
            frameBorder='0'
            width={width}
            height={height}
            src={`${process.env.NEXT_APP_POWERBI_URL}`}
          ></iframe>
        )}
      </div>
    </div>
  );
};

export default Index;

