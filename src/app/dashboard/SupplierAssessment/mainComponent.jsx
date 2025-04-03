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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "@/app/utils/axiosMiddleware";

const SupplierAssessment = () => {
  const [activeTab, setActiveTab] = useState("tab1");
  const [isModalOpen,setIsModalOpen]=useState(false)
  const dispatch = useDispatch();
  const [showStakeholderList,setStakeholderList]=useState(false)
  const [groupId,setGroupId]=useState({})
  const [refresh, setRefresh] = useState(false);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  const Tabs=[
   {
    title:"Assessments",
    id:"tab1"
   },
   {
    title:"Forms",
    id:"tab2"
   },
   {
    title:"Stakeholders Groups",
    id:"tab3"
   }
  ]
  useEffect(() => {
    dispatch(setHeadertext1(""));
    dispatch(setHeaderdisplay("none"));
    dispatch(setHeadertext2('Supplier Assessment'));
  }, [activeTab, dispatch]);

  const getStakeholderGroup= async()=>{
    try{
        const response = await axiosInstance.get(`/supplier_assessment/stakeholder-group/`);
        if(response.status==200){
           if(response.data.results.length>0){
            setIsModalOpen(false)
           }
           else{
            setIsModalOpen(true)
           }
        }
    }
    catch(e){
        console.error(e)
    }
  }

  useEffect(()=>{
    getStakeholderGroup()
  },[])

  return (
    <>
    {showStakeholderList?(
      <div>
        <StakeholderPage setStakeholderList={setStakeholderList} showStakeholderList={showStakeholderList} setActiveTab={setActiveTab} groupId={groupId} setGroupId={setGroupId} />
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
                {activeTab === "tab1" && <Assessments setActiveTab={setActiveTab} />}

                {activeTab === "tab2" && <Forms />}
                {activeTab === "tab3" && <StakeholderGroup setStakeholderList={setStakeholderList} showStakeholderList={showStakeholderList} groupId={groupId} setGroupId={setGroupId} refresh={refresh} setRefresh={setRefresh} />}
              </div>
            </div>
          </div>
        </div>
        <WelcomeModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} setActiveTab={setActiveTab} setStakeholderList={setStakeholderList} showStakeholderList={showStakeholderList} groupId={groupId} setGroupId={setGroupId} refresh={refresh} setRefresh={setRefresh} />
      </div>
    )}
      

      <ToastContainer style={{marginRight:'50px'}}  />
    </>
  );
};

export default SupplierAssessment;
