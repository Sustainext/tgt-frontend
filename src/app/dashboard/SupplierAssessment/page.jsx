"use client";

import { useState, useEffect } from "react";
import {
  setHeadertext1,
  setHeadertext2,
  setHeaderdisplay,
} from "../../../lib/redux/features/topheaderSlice";
import { useDispatch } from "react-redux";
import Assessments from "./assessment/page";
import Forms from "./forms/page";
import StakeholderGroup from "./stakeholderGroup/page";
import WelcomeModal from './modals/welcomeModal'
import StakeholderPage from "./stakeholders/page";

const SupplierAssessment = () => {
  const [activeTab, setActiveTab] = useState("tab1");
  const [isModalOpen,setIsModalOpen]=useState(false)
  const dispatch = useDispatch();
  const [showStakeholderList,setStakeholderList]=useState(false)

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  const Tabs=[
   {
    title:"Assessment",
    id:"tab1"
   },
   {
    title:"Forms",
    id:"tab2"
   },
   {
    title:"Stakeholders Group",
    id:"tab3"
   }
  ]
  useEffect(() => {
    dispatch(setHeadertext1(""));
    dispatch(setHeaderdisplay("none"));
    dispatch(setHeadertext2('Supplier Assessment'));
  }, [activeTab, dispatch]);

  return (
    <>
    {showStakeholderList?(
      <div>
        <StakeholderPage setStakeholderList={setStakeholderList} showStakeholderList={showStakeholderList} setActiveTab={setActiveTab} />
      </div>
    ):(
      <div>
        <div className="">
        <div className="flex flex-col justify-start overflow-x-hidden ">
        <div className="flex justify-between items-center border-b border-gray-200 mb-2 w-full">
          <div className="w-full">
           <div className="text-left mb-2 ml-3 pt-1">
              <div className="flex">
                <div>
                  <p className="gradient-text text-[22px] font-bold pt-4 pb-4 ml-3">
                   Supplier Assessment
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

          <div className="flex flex-col h-screen mx-4">
            <div className={`flex my-4 border-b`}>
                {Tabs.map((val)=>(
                    <button
                    key={val.id}
                    className={`px-4 py-1 rounded-b-none text-sm font-bold leading-[15px] sustainext-hq ${
                      activeTab === val.id
                        ? "border-b-2 border-[#1aaef4] text-[#1aaef4]"
                        : "border-transparent text-neutral-500"
                    }`}
                    onClick={() => handleTabChange(val.id)}
                  >
                    {val.title}
                  </button>
                ))}
              
             
            </div>

            <div className="flex-grow">
              <div className="flex-grow">
                {activeTab === "tab1" && <Assessments />}

                {activeTab === "tab2" && <Forms />}
                {activeTab === "tab3" && <StakeholderGroup setStakeholderList={setStakeholderList} showStakeholderList={showStakeholderList} />}
              </div>
            </div>
          </div>
        </div>
        <WelcomeModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} setActiveTab={setActiveTab} />
      </div>
    )}
      

      
    </>
  );
};

export default SupplierAssessment;
