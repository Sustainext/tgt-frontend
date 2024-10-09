'use client'
import React, { useState,useEffect } from "react";
import Header from "./Header";
import Aside from "./Aside";
import AnalyseAnnualtotalcompensationratio from "./Annual-total-compensation-ratio/page"
import {
  setHeadertext1,
  setHeadertext2,
  setHeaderdisplay
} from "../../../../lib/redux/features/topheaderSlice";
import { useDispatch } from "react-redux";
const Governance = () => {
  const [activeTab, setActiveTab] = useState("Tab1");
  const [isBoxOpen, setIsBoxOpen] = useState(false);
  const dispatch = useDispatch();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  useEffect(() => {
   
    dispatch(setHeadertext1("Analysis"));
    dispatch(setHeaderdisplay("none"));
    dispatch(setHeadertext2('Governance'));
}, [activeTab, dispatch]);
  return (
    <div className="relative flex justify-start">
      <div className="relative left-10 w-[199px] min-h-[90vh] py-[11px] flex-col items-end inline-flex">
        <Aside activeTab={activeTab} handleTabClick={handleTabClick} />
      </div>
      <div className="w-full ms-8">
        <div className="sticky top-14 bg-white z-[100]">
          <Header activeTab={activeTab} setIsBoxOpen={setIsBoxOpen} />
        </div>
        {activeTab === "Tab1" && <AnalyseAnnualtotalcompensationratio />}


      </div>
    </div>
  );
};

export default Governance;
