"use client";
import React, { useState, useEffect } from "react";
import AccordancePopup from "../modals/accordancePopup";
import Aside from "./sidePannel";
import SelectMaterialityTopic from "./selectMaterialityTopic/page";
import MaterialAssessmentProcess from "./materialAssessmentProcess/page";
import ManagementApproach from "./managementApproach/page";
import axiosInstance from "../../../utils/axiosMiddleware";
import { Oval } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Accordance = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("selectMaterialityTopic");
  const [cardData, setCarddata] = useState({});
  const [esgSeleted, setEsgSelected] = useState({});
  const [mobileopen, setMobileopen] = useState(false);
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setMobileopen(false);
  };

  useEffect(() => {
    const isFirstVisit =
      typeof window !== "undefined"
        ? localStorage.getItem("hasVisitedacc")
        : "";
    if (isFirstVisit == "true") {
      setIsModalOpen(true);
      localStorage.setItem("hasVisitedacc", "false");
    }
  }, []);

  const id = typeof window !== "undefined" ? localStorage.getItem("id") : "";
  const fetchDetails = async () => {
    const url = `${process.env.BACKEND_API_URL}/materiality_dashboard/materiality-assessments/${id}/`;
    try {
      const response = await axiosInstance.get(url);
      if (response.status == 200) {
        setCarddata(response.data);
        if (response.data.esg_selected) {
          setEsgSelected(response.data.esg_selected);
        }
      } else {
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
    } catch (error) {
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
  };
  useEffect(() => {
    fetchDetails();
  }, []);

  return (
    <>
      <div className="flex w-full">
        <div className="block xl:flex lg:flex md:flex 2xl:flex 4k:flex w-full">
          <div className="hidden xl:block lg:block md:block 2xl:block 4k:block">
            <Aside activeTab={activeTab} handleTabClick={handleTabClick} />
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
            <div className="w-full">
              {activeTab === "selectMaterialityTopic" && (
                <SelectMaterialityTopic
                  handleTabClick={handleTabClick}
                  cardData={cardData}
                  esgSeleted={esgSeleted}
                  setMobileopen={setMobileopen}
                />
              )}
              {activeTab === "materialAssessmentProcess" && (
                <MaterialAssessmentProcess
                  handleTabClick={handleTabClick}
                  setMobileopen={setMobileopen}
                />
              )}
              {activeTab === "managementApproach" && (
                <ManagementApproach setMobileopen={setMobileopen} />
              )}
            </div>
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
