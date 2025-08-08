'use client';
import React, { useState, useEffect } from 'react';
import Header from './Header';
import Aside from './Aside';
import AnalyseEmission from './Emission/page';
import AnalyseEnergy from './Energy/page';
import AnalyseWaste from './Waste/page';
import AnalyseMaterials from './Materials/page';
import AnalyseWaterEffluents from './Water-Effluents/page';
import SupplierEnvironmentalImpact from './supplier-enironmental-assessment/page';
// import AnalyseEffluents from "./Effluents/page"
import AnalysePackagingMaterials from './PackagingMaterials/page';
import {
  setHeadertext1,
  setHeadertext2,
  setHeaderdisplay,
  setMiddlename,
} from '../../../../lib/redux/features/topheaderSlice';
import AirQuality from './AirQuality/page';
import { useDispatch } from 'react-redux';

const environment = () => {
  const [activeTab, setActiveTab] = useState('Emissions');
  const [isBoxOpen, setIsBoxOpen] = useState(false);
  const dispatch = useDispatch();
  const [mobileopen, setMobileopen] = useState(false);
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setMobileopen(false);
  };

  useEffect(() => {
    dispatch(setHeadertext1('Analyse'));
    dispatch(setHeaderdisplay('block'));
    dispatch(setMiddlename('Environment'));
    // Dynamically set header text 2 based on the active tab
    switch (activeTab) {
      case 'Emissions':
        dispatch(setHeadertext2('Emissions'));
        break;
      case 'Energy':
        dispatch(setHeadertext2('Energy'));
        break;
      case 'Waste Management':
        dispatch(setHeadertext2('Waste Management'));
        break;
      // case "Effluents":
      //   dispatch(setHeadertext2("Effluents"));
      //   break;
      case 'Material Use and Efficiency':
        dispatch(setHeadertext2('Material Use and Efficiency'));
        break;
      case 'Packaging Materials':
        dispatch(setHeadertext2('Packaging Materials'));
        break;
      case 'Water and effluents':
        dispatch(setHeadertext2('Water & Effluents'));
        break;
      case 'Supplier Environmental Assessment':
        dispatch(setHeadertext2('Supplier Environmental Assessment'));
        break;
      case 'Air Quality & other emissions':
        dispatch(setHeadertext2('Air Quality & other emissions'));
        break;
      default:
        dispatch(setHeadertext2(''));
    }
  }, [activeTab, dispatch]);

  return (
    <div className='flex flex-col lg:flex-row w-full max-w-full overflow-hidden'>
      <div className='hidden xl:block lg:block md:hidden 2xl:block 4k:block 2k:block'>
        <div className='flex-shrink-0 w-[220px] py-[11px]'>
          <Aside activeTab={activeTab} handleTabClick={handleTabClick} />
        </div>
      </div>
      {mobileopen ? (
        <div className='block xl:hidden lg:hidden md:block 2xl:hidden 4k:hidden'>
          <div>
            <Aside
              activeTab={activeTab}
              handleTabClick={handleTabClick}
              setMobileopen={setMobileopen}
            />
          </div>
        </div>
      ) : (
        <div className='flex-1 flex flex-col w-full max-w-full overflow-hidden ml-3'>
          <div className='hidden xl:block lg:block md:hidden 2xl:block 4k:block 2k:block sticky xl:top-0 lg:top-0 2xl:top-0 4k:top-0 bg-white '>
            <Header
              activeTab={activeTab}
              setIsBoxOpen={setIsBoxOpen}
              setMobileopen={setMobileopen}
            />
          </div>
          <div className='block xl:hidden lg:hidden md:block 2xl:hidden 4k:hidden 2k:hidden '>
            <Header
              activeTab={activeTab}
              setIsBoxOpen={setIsBoxOpen}
              setMobileopen={setMobileopen}
            />
          </div>
          {activeTab === 'Emissions' && <AnalyseEmission />}
          {activeTab === 'Energy' && (
            <AnalyseEnergy
              isBoxOpen={isBoxOpen}
              setMobileopen={setMobileopen}
            />
          )}
          {activeTab === 'Waste Management' && (
            <AnalyseWaste isBoxOpen={isBoxOpen} setMobileopen={setMobileopen} />
          )}
          {/* {activeTab === "Effluents" && <AnalyseEffluents isBoxOpen={isBoxOpen}  setMobileopen={setMobileopen} />} */}
          {activeTab === 'Material Use and Efficiency' && (
            <AnalyseMaterials
              isBoxOpen={isBoxOpen}
              setMobileopen={setMobileopen}
            />
          )}
          {activeTab === 'Packaging Materials' && (
            <AnalysePackagingMaterials
              isBoxOpen={isBoxOpen}
              setMobileopen={setMobileopen}
            />
          )}
          {activeTab === 'Water and effluents' && (
            <AnalyseWaterEffluents
              isBoxOpen={isBoxOpen}
              setMobileopen={setMobileopen}
            />
          )}
          {activeTab === 'Supplier Environmental Assessment' && (
            <SupplierEnvironmentalImpact
              isBoxOpen={isBoxOpen}
              setMobileopen={setMobileopen}
            />
          )}
          {activeTab === 'Air Quality & other emissions' && (
            <AirQuality isBoxOpen={isBoxOpen} setMobileopen={setMobileopen} />
          )}
        </div>
      )}
    </div>
  );
};

export default environment;
