'use client'
import React, { useState, useEffect, useLayoutEffect } from 'react';
import Aside from './Aside';
import EnvironmentTrack from './Environment/page';
import SocialTrack from './Social/page'
import GovernanceTrack from './Governance/page'
import { GlobalState } from '@/Context/page';
import axiosInstance from '../../utils/axiosMiddleware'

const Index = () => {
  const [activeModule, setActiveModule] = useState("Environment");
  const [contentSize, setContentSize] = useState({ width: 0, height: 0 });
  const [containerWidth, setContainerWidth] = useState('100%');
  // const [dashboardData, setDashboardData] = useState(null);
  const open = GlobalState();

  const handleTabClick = (module) => {
    setActiveModule(module);
  };

  useLayoutEffect(() => {
    const updateSizes = () => {
      const mainSidebarWidth = open ? 230 : 80;
      const totalSidebarWidth = mainSidebarWidth;

      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      
      const contentWidth = screenWidth - totalSidebarWidth;
      const contentHeight = screenHeight;

      setContentSize({
        width: Math.max(contentWidth, 250), // Minimum width of 250px
        height: Math.max(contentHeight, 400) // Minimum height of 400px
      });

      if (screenWidth > 1600) {
        setContainerWidth('1600px');
      } else {
        setContainerWidth('100%');
      }
    };

    updateSizes();
    window.addEventListener('resize', updateSizes);
    return () => window.removeEventListener('resize', updateSizes);
  }, [open]); 

  useEffect(()=>{
    const fetchDashboardData = async () => {
      const response = await axiosInstance('/sustainapp/track_dashboards/');
      console.log('response',response);
      
      const data = response.data;
      setDashboardData(data);
    }
    fetchDashboardData();
  },[])

  return (
    <div className="flex justify-center overflow-x-auto">
      <div className="flex justify-start" style={{ width: containerWidth, minWidth: '100%' }}>
        <div className="w-[220px] min-h-[90vh] py-[11px] flex-shrink-0">
          <Aside activeTab={activeModule} handleTabClick={handleTabClick} />
        </div>
        <div className='flex-grow flex justify-center items-center'>
          {activeModule === 'Environment' && (
            <EnvironmentTrack contentSize={contentSize} dashboardData={dashboardData} />
          )}
          {activeModule === 'Social' && 
          <SocialTrack contentSize={contentSize} dashboardData={dashboardData} />
          }
          {/* {activeModule === 'Governance' && 
          <GovernanceTrack contentSize={contentSize} />
          } */}
        </div>
      </div>
    </div>
  );
};

export default Index;