"use client";
import React, { useState } from "react";
import Annualreport2024 from "./V1-2024/page";
import ReportingforEntities from "./V2-2025/page";
import { MdKeyboardArrowDown, MdChevronLeft } from "react-icons/md";
import { useSelector } from "react-redux";

const Annualreport = ({ handleTabClick, setView, setMobileopen }) => {
  const selectedOrg = useSelector((state) => state.bils201filter.org);
  const selectedCorp = useSelector((state) => state.bils201filter.corp);
  const year = useSelector((state) => state.bils201filter.year);
  const reportType = useSelector((state) => state.bils201filter.reportType);
  const orgname = useSelector((state) => state.bils201filter.orgname);
  const corpname = useSelector((state) => state.bils201filter.corpname);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const handleBackToBILLs201 = () => {
    handleTabClick("Data collection");
    setView("home");
  };
  const toggleSidebar = () => {
    setMobileopen(true);
  };
  return (
    <>
      <div className="hidden xl:block lg:block md:hidden 2xl:block 4k:block">
        <div className="flex justify-between items-center border-b border-gray-200 mb-5 w-full">
          <div className="w-full">
            <div className="text-left mb-2 ml-3">
              <p className="text-[11px]">Social</p>
              <div className="">
                <div className=" flex pb-2 justify-between">
                  <div className="">
                    <p className="gradient-text text-[22px]  font-bold pt-1 w-full">
                      Reporting for Entities
                    </p>
                    <div className="flex gap-4">
                      <div>
                        <p className=" text-gray-700 text-[12px]  pt-1 w-full gpb-2 gap-1">
                          {orgname && (
                            <span>
                              <span className="font-semibold">
                                Organization:
                              </span>{" "}
                              {orgname}
                            </span>
                          )}
                          {orgname && corpname && (
                            <span className="px-2">/</span>
                          )}
                          {corpname && (
                            <span>
                              <span className="font-semibold">Corporate:</span>{" "}
                              {corpname}
                            </span>
                          )}
                        </p>
                      </div>

                      <div>
                        <p className=" text-gray-700 text-[12px]  pt-1 w-full gpb-2 gap-1">
                          Year: {year}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="float-end">
                    <button
                      onClick={() => setShowConfirmModal(true)}
                      className="bg-transparent text-gray-900 text-[13px]   border border-gray-300  rounded-md flex w-[160px] me-2 py-2 gap-2 px-2 "
                    >
                      {" "}
                      <MdChevronLeft className="mt-1" /> Back to Collect{" "}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="block xl:hidden lg:hidden md:block 2xl:hidden 4k:hidden -mt-[35px]">
        <div className="flex justify-between items-center border-b border-gray-200 mb-5 w-full">
          <div
            className="w-full  py-4  rounded-md  shadow-[0px_6px_12px_0px_rgba(0,0,0,0.08),0px_1px_3px_0px_rgba(0,0,0,0.10)]"
            onClick={toggleSidebar}
          >
            <div className="text-left mb-2 ml-3">
              <p className="text-[11px]">Social</p>
              <div className="flex justify-between">
                <div className="h-[50px]">
                  <p className="gradient-text text-[16px] md:text-[20px]  font-bold pt-1">
                    Reporting for Entities
                  </p>
                  <div className="flex gap-4">
                    <div>
                      <p className=" text-gray-700 text-[12px]  pt-1 w-full gpb-2 gap-1">
                        {orgname && (
                          <span>
                            <span className="font-semibold">Organization:</span>{" "}
                            {orgname}
                          </span>
                        )}
                        {orgname && corpname && <span className="px-2">/</span>}
                        {corpname && (
                          <span>
                            <span className="font-semibold">Corporate:</span>{" "}
                            {corpname}
                          </span>
                        )}
                      </p>
                    </div>

                    <div>
                      <p className=" text-gray-700 text-[12px]  pt-1 w-full gpb-2 gap-1">
                        Year: {year}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="float-end me-5">
                  <MdKeyboardArrowDown className={`text-2xl  md:-mt-[18px] `} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" float-end">
          <button
            onClick={() => setShowConfirmModal(true)}
            className="bg-transparent text-gray-900 text-[13px]   border border-gray-300  rounded-md flex w-[160px] me-2 py-2 gap-1 px-2 "
          >
            {" "}
            <MdChevronLeft className="text-xl" /> Back to Collect{" "}
          </button>
        </div>
      </div>
      {year <= 2023 && (
        <Annualreport2024
          handleTabClick={handleTabClick}
          selectedCorp={selectedCorp || ""}
          selectedOrg={selectedOrg}
          year={year}
          reportType={reportType}
          setView={setView}
        />
      )}
      {year >= 2024 && (
        <ReportingforEntities
          selectedCorp={selectedCorp || ""}
          selectedOrg={selectedOrg}
          year={year}
          reportType={reportType}
          handleTabClick={handleTabClick}
          setView={setView}
        />
      )}
      {showConfirmModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50 ">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[480px] mx-4">
            <div className="flex items-center mb-4">
              <span className="text-yellow-500 mr-2">⚠️</span>
              <h2 className="text-lg font-semibold">Data might not be saved</h2>
            </div>
            <p className="text-sm text-gray-600 mb-6">
              You may lose some data if you leave. Are you sure you want to
              proceed?
            </p>
            <div className="flex justify-between space-x-4">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm w-full text-[#667085]"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowConfirmModal(false);
                  handleBackToBILLs201(); // Proceed
                }}
                className="px-4 py-2 bg-[#007EEF] text-white rounded-md text-sm  w-full"
              >
                Yes, exit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Annualreport;
