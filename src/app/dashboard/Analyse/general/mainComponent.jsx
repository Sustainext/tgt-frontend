'use client'
import React, { useState,useEffect } from "react";
import Header from "./Header";
import Aside from "./Aside";
import Employees from "./Employees/page";
import StrategyPolicyPractices
 from "./Strategy-policy-practices/page";
 import {
  setHeadertext1,
  setHeadertext2,
  setHeaderdisplay,
  setMiddlename
} from "../../../../lib/redux/features/topheaderSlice";
import { useDispatch } from "react-redux";
const General = () => {
  const [activeTab, setActiveTab] = useState("Tab1");
  const [isBoxOpen, setIsBoxOpen] = useState(false);
    const [mobileopen, setMobileopen] = useState(false);
  const dispatch = useDispatch();
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setMobileopen(false);
  };
  useEffect(() => {
    const headerTextMapping = {
      Tab1: 'Employees',
      Tab2: 'Strategy, policies and practices',
  
    };
    dispatch(setHeadertext1("Analyse"));
    dispatch(setHeaderdisplay("block"));
    dispatch(setHeadertext2(headerTextMapping[activeTab] || 'Employees'));
    dispatch(setMiddlename("General"));
}, [activeTab, dispatch]);
  return (
    <div className="relative xl:flex lg:flex 2xl:flex 4k:flex justify-start">
    <div className="hidden xl:block lg:block md:hidden 2xl:block 4k:block 2k:block">
      <div className="relative left-10 w-[199px] min-h-[90vh] py-[11px] flex-col items-end inline-flex ">
        <Aside activeTab={activeTab} handleTabClick={handleTabClick} />
      </div>
      
    </div>
    {mobileopen ? (
      <div className="block xl:hidden lg:hidden md:block 2xl:hidden 4k:hidden">
        <div>
          <Aside
            activeTab={activeTab}
            handleTabClick={handleTabClick}
            setMobileopen={setMobileopen}
          />
        </div>
      </div>
    ) : (
      <div className="w-full xl:ms-8 md:ms-0 lg:ms-8 2xl:ms-8 4k:ms-8 2k:ms-8">
        <div className="hidden xl:block lg:block md:hidden 2xl:block 4k:block 2k:block sticky xl:top-14 lg:top-14 2xl:top-14 4k:top-14 bg-white z-[100]">
          <Header
            activeTab={activeTab}
            setIsBoxOpen={setIsBoxOpen}
            setMobileopen={setMobileopen}
          />
        </div>
        <div className="block xl:hidden lg:hidden md:block 2xl:hidden 4k:hidden 2k:hidden ">
          <Header
            activeTab={activeTab}
            setIsBoxOpen={setIsBoxOpen}
            setMobileopen={setMobileopen}
          />
        </div>
        {activeTab === "Tab1" && <Employees  setMobileopen={setMobileopen } />}
        {activeTab === "Tab2" && <StrategyPolicyPractices setMobileopen={setMobileopen} />}
      </div>
    )}
  </div>
 
  );
};

export default General;
