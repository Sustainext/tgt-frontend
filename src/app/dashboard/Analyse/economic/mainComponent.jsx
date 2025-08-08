'use client';
import React, { useState, useEffect } from 'react';
import Header from './Header';
import Aside from './Aside';
import Operationsassessed from './operations-assessed/page';
import Ratioentrylevels from './ratio-entry-levels/page';
import Anticorruptions from './anti-corruption/page';
import {
  setHeadertext1,
  setHeadertext2,
  setHeaderdisplay,
  setMiddlename,
} from '../../../../lib/redux/features/topheaderSlice';
import { useDispatch } from 'react-redux';
const AnalyseEconomic = () => {
  const [activeTab, setActiveTab] = useState('Tab2');
  const [isBoxOpen, setIsBoxOpen] = useState(false);
  const [mobileopen, setMobileopen] = useState(false);
  const dispatch = useDispatch();
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setMobileopen(false);
  };
  useEffect(() => {
    const headerTextMapping = {
      Tab1: 'Ratio of the entry-level wage to the minimum wage by gender at significant locations of operation',
      Tab2: 'Operations assessed for risks related to corruption',
      Tab3: 'Communication and training about anti-corruption policies and procedures',
    };
    dispatch(setHeadertext1('Analyse'));
    dispatch(setHeaderdisplay('block'));
    dispatch(
      setHeadertext2(
        headerTextMapping[activeTab] ||
          'Ratio of the entry-level wage to the minimum wage by gender at significant locations of operation'
      )
    );
    dispatch(setMiddlename('Economic'));
  }, [activeTab, dispatch]);
  return (
    <div className='relative xl:flex lg:flex 2xl:flex 4k:flex justify-start'>
      <div className='hidden xl:block lg:block md:hidden 2xl:block 4k:block 2k:block'>
        <div className='relative left-[2rem] w-[199px] min-h-[90vh] py-[11px] flex-col items-end inline-flex max-w-[13rem]'>
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
        <div className='flex-1 ps-4 me-4 max-w-full overflow-hidden ms-3'>
          <div className='hidden xl:block lg:block md:hidden 2xl:block 4k:block 2k:block sticky xl:top-14 lg:top-14 2xl:top-14 4k:top-14 bg-white z-[100]'>
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
          {activeTab === 'Tab1' && <Ratioentrylevels />}
          {activeTab === 'Tab2' && <Operationsassessed />}
          {activeTab === 'Tab3' && <Anticorruptions />}
        </div>
      )}
    </div>
  );
};

export default AnalyseEconomic;
