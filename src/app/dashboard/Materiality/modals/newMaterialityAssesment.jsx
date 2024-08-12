"use client";
import React, { useState } from "react";
import GRISVG from "../../../../../public/gri.svg";
import Image from "next/image";

const NewMaterialityAssement = ({ isModalOpen, setIsModalOpen }) => {
  const [activeTab, setActiveTab] = useState(1);
  const [assessmentApproach,setAssessmentApproach] = useState("")

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  const handleChangeRadio = (event) => {
    setAssessmentApproach(event.target.value);
  };

  return (
    <>
      {isModalOpen && (
        <div className="modal-overlay z-50">
          <div className="modal-center">
            <div className="modal-content">
              <div className="flex justify-between items-center drop-shadow-lg pt-6 w-full">
                <div className="flex">
                  <Image src={GRISVG} className="w-7 h-7 mr-2" />
                  <h2 className="self-stretch text-black  text-[18px] font-bold">
                    <span>Creating New Materiality Assessment</span>
                  </h2>
                </div>

                <button
                  className="absolute top-2 right-2 mt-4 text-gray-500 hover:text-gray-700 focus:outline-none"
                  onClick={() => {
                    setIsModalOpen(false);
                  }}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div>
                <p className="text-[13px] text-[#495057] font-[600] px-3 pt-5">
                  Select Materiality Assessment Approach
                </p>
              </div>
              <form className="space-y-2 px-6 pt-4">
                <div className="flex items-center">
                  <input
                    id="accordance"
                    name="radio"
                    type="radio"
                    value="accordance"
                    checked={assessmentApproach === "accordance"}
                    onChange={handleChangeRadio}
                    className="text-gray-600 form-radio h-4 w-4"
                  />
                  <label
                    htmlFor="accordance"
                    className="ml-2 text-gray-600 text-[15px] cursor-pointer"
                  >
                    GRI: In Accordance With
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="reference"
                    name="radio"
                    type="radio"
                    value="reference"
                    checked={assessmentApproach === "reference"}
                    onChange={handleChangeRadio}
                    className="text-gray-600 form-radio h-4 w-4"
                  />
                  <label
                    htmlFor="reference"
                    className="ml-2 text-gray-600 text-[15px] cursor-pointer"
                  >
                    GRI: with Reference To
                  </label>
                </div>
              </form>
              <div>
                <p className="text-[13px] text-[#495057] font-[600] px-3 pt-8">
                  Select Topic by
                </p>
              </div>
              <div className="w-full mx-3 mt-4">
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleTabClick(1)}
                    className={`py-2 px-4 rounded-l-lg focus:outline-none ${
                      activeTab === 1
                        ? "bg-[#DBE8F4] text-black"
                        : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                    }`}
                  >
                    Organization
                  </button>
                  <button
                    onClick={() => handleTabClick(2)}
                    className={`py-2 px-4 rounded-r-lg focus:outline-none ${
                      activeTab === 2
                        ? "bg-[#DBE8F4] text-black"
                        : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                    }`}
                  >
                    Corporate
                  </button>
                </div>
                <div className="mt-4 w-full">
                  {activeTab === 1 ? (
                    <div className="flex justify-between items-center">
                      <div className="mr-2 w-full">
                        <label
                          htmlFor="cname"
                          className="text-neutral-800 text-[13px] font-normal"
                        >
                          Select Organization
                        </label>
                        <div className="mt-2">
                          <select
                            className="block w-full rounded-md border-0 py-3 pl-4 text-neutral-500 text-xs font-normal leading-tight ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            //   value={selectedsetLocation}
                            //   onChange={handleLocationChange}
                          >
                            <option value=""> Select Organization </option>
                            {/* {selectedLocation &&
                        selectedLocation.map((location) => (
                          <option key={location.id} value={location.id}>
                            {location.name}
                          </option>
                        ))} */}
                          </select>
                        </div>
                      </div>
                      <div className="mr-2 w-full">
                        <label
                          htmlFor="cname"
                          className="text-neutral-800 text-[13px] font-normal"
                        >
                          Specify Reporting Period
                        </label>
                        <div className="mt-2">
                          <input
                            id="deadline"
                            title="deadline"
                            type="date"
                            name="deadline"
                            autoComplete="off"
                            // onChange={datahandleChange}
                            // value={deadline}
                            // min={getTodayDate()}
                            required
                            className="block w-full px-1 rounded-md border-0 py-2.5 pl-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div>
                        <div className="flex justify-between items-center">
                          <div className="mr-2 w-full">
                            <label
                              htmlFor="cname"
                              className="text-neutral-800 text-[13px] font-normal"
                            >
                              Select Organization
                            </label>
                            <div className="mt-2">
                              <select
                                className="block w-full rounded-md border-0 py-3 pl-4 text-neutral-500 text-xs font-normal leading-tight ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                //   value={selectedsetLocation}
                                //   onChange={handleLocationChange}
                              >
                                <option value=""> Select Organization </option>
                                {/* {selectedLocation &&
                        selectedLocation.map((location) => (
                          <option key={location.id} value={location.id}>
                            {location.name}
                          </option>
                        ))} */}
                              </select>
                            </div>
                          </div>

                          <div className="mr-2 w-full">
                            <label
                              htmlFor="cname"
                              className="text-neutral-800 text-[13px] font-normal"
                            >
                              Select Corporate
                            </label>
                            <div className="mt-2">
                              <select
                                className="block w-full rounded-md border-0 py-3 pl-4 text-neutral-500 text-xs font-normal leading-tight ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                //   value={selectedsetLocation}
                                //   onChange={handleLocationChange}
                              >
                                <option value=""> Select Corporate </option>
                                {/* {selectedLocation &&
                        selectedLocation.map((location) => (
                          <option key={location.id} value={location.id}>
                            {location.name}
                          </option>
                        ))} */}
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="mr-2 w-full mt-2">
                            <label
                              htmlFor="cname"
                              className="text-neutral-800 text-[13px] font-normal"
                            >
                              Specify Reporting Period
                            </label>
                            <div className="mt-2">
                              <input
                                id="deadline"
                                title="deadline"
                                type="date"
                                name="deadline"
                                autoComplete="off"
                                // onChange={datahandleChange}
                                // value={deadline}
                                // min={getTodayDate()}
                                required
                                className="block w-[50%] px-1 rounded-md border-0 py-2.5 pl-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex justify-end items-center mt-5 mb-3">
                  <button className="w-2/6 h-full mr-2  py-2 px-3 bg-[#007EEF] text-white rounded-[8px] shadow cursor-pointer">
                    Start Materiality Assessment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NewMaterialityAssement;
