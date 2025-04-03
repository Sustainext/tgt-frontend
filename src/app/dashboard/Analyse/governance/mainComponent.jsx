'use client'
import React, { useState,useEffect } from "react";
import Header from "./Header";
import Aside from "./Aside";
import AnalyseAnnualtotalcompensationratio from "./Annual-total-compensation-ratio/page"
import {
  setHeadertext1,
  setHeadertext2,
  setHeaderdisplay,
  setMiddlename
} from "../../../../lib/redux/features/topheaderSlice";
import { useDispatch } from "react-redux";
const Governance = () => {
  const [activeTab, setActiveTab] = useState("Tab1");
  const [isBoxOpen, setIsBoxOpen] = useState(false);
  const dispatch = useDispatch();
  const [mobileopen, setMobileopen] = useState(false);
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setMobileopen(false);
  };
  useEffect(() => {
    const headerTextMapping = {
      Tab1: 'Annual total compensation ratio',
  
    };
    dispatch(setHeadertext1("Analyse"));
    dispatch(setHeaderdisplay("block"));
    dispatch(setHeadertext2(headerTextMapping[activeTab] || 'Annual total compensation ratio'));
    dispatch(setMiddlename("Governance"));
}, [activeTab, dispatch]);
  return (
       <div className="relative xl:flex justify-start">
          <div className="hidden xl:block lg:block md:block 2xl:block 4k:block 2k:block">
            <div className="relative left-10 w-[199px] min-h-[90vh] py-[11px] flex-col items-end inline-flex ">
              <Aside activeTab={activeTab} handleTabClick={handleTabClick} />
            </div>
            
          </div>
          {mobileopen ? (
            <div className="block xl:hidden lg:hidden md:hidden 2xl:hidden 4k:hidden">
              <div>
                <Aside
                  activeTab={activeTab}
                  handleTabClick={handleTabClick}
                  setMobileopen={setMobileopen}
                />
              </div>
            </div>
          ) : (
            <div className="w-full xl:ms-8 md:ms-8 lg:ms-8 2xl:ms-8 4k:ms-8 2k:ms-8">
              <div className="hidden xl:block lg:block md:block 2xl:block 4k:block 2k:block sticky xl:top-14 bg-white z-[100]">
                <Header
                  activeTab={activeTab}
                  setIsBoxOpen={setIsBoxOpen}
                  setMobileopen={setMobileopen}
                />
              </div>
              <div className="block xl:hidden lg:hidden md:hidden 2xl:hidden 4k:hidden 2k:hidden ">
                <Header
                  activeTab={activeTab}
                  setIsBoxOpen={setIsBoxOpen}
                  setMobileopen={setMobileopen}
                />
              </div>
              {activeTab === "Tab1" && <AnalyseAnnualtotalcompensationratio />}
            </div>
          )}
        </div>

  );
};

export default Governance;
