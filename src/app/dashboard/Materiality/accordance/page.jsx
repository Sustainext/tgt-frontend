"use client";
import React, { useState, useEffect } from "react";
import AccordancePopup from "../modals/accordancePopup";
import Aside from "./sidePannel";
import SelectMaterialityTopic from "./selectMaterialityTopic/page";
import MaterialAssessmentProcess from "./materialAssessmentProcess/page"
import ManagementApproach from "./managementApproach/page";
import axiosInstance from "../../../utils/axiosMiddleware";
import { Oval } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Accordance = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("selectMaterialityTopic");
  const [cardData,setCarddata]= useState({})

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const isFirstVisit = localStorage.getItem('hasVisitedacc');
    if (isFirstVisit=='true') {
      setIsModalOpen(true);
      localStorage.setItem('hasVisitedacc','false');
    }
  }, []);

  const id=localStorage.getItem("id")
  const fetchDetails = async()=>{
    const url = `${process.env.BACKEND_API_URL}/materiality_dashboard/materiality-assessments/${id}/`;
    try {
      const response = await axiosInstance.get(url);
      if(response.status==200){
        setCarddata(response.data)
      }
      else{
        toast.error("Oops, something went wrong", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
      
    }
    catch (error) {
      toast.error("Oops, something went wrong", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }
  useEffect(()=>{
    fetchDetails()
  },[])
  
  return (
    <>
      <div className="flex w-full">
        {/* side bar */}
        <div>
          <Aside activeTab={activeTab} handleTabClick={handleTabClick} />
        </div>

        {/* main content */}
        <div className="w-full">
          {activeTab === "selectMaterialityTopic" && <SelectMaterialityTopic  handleTabClick={handleTabClick} cardData={cardData} />}
          {activeTab === "materialAssessmentProcess" && (
            <MaterialAssessmentProcess handleTabClick={handleTabClick} />
          )}
          {activeTab === "managementApproach" && (
            <ManagementApproach />
          )}
        </div>
      </div>

      <AccordancePopup
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />

    </>
  );
};
export default Accordance;
