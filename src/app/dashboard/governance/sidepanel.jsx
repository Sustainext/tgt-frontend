"use client";

import { useState, useEffect } from "react";
import {  MdOutlineDiversity1, MdKeyboardArrowDown, MdClose} from "react-icons/md";

import { GiWoodPile } from "react-icons/gi";

const Aside = ({ activeTab, handleTabClick, apiData, setMobileopen }) => {
  const [isEmission, setEmisssion] = useState(false);
  const [isEnergySectionVisible, setEnergySectionVisible] = useState(false);
  const [isWasteVisible, setWasteVisible] = useState(false);
  const [isWaterVisible, setWaterVisible] = useState(false);
  const [isMaterialsVisible, setMaterialsVisible] = useState(false);
  const [isSupplierVisible, setIsSupplierVisible] = useState(false);
  const [isLegal, setIsLegal] = useState(false);
  const [isTax, setTax] = useState(false);
  const [Political, setPolitical] = useState(false);
  const [ManagingConcerns, setManagingConcerns] = useState(false);
  const materialityEnvData =
    apiData && apiData.governance ? apiData.governance : {};

  const toggleEmission = () => {
    setEmisssion(!isEmission);
    setWasteVisible(false);
    setMaterialsVisible(false);
    setWaterVisible(false);
    setEnergySectionVisible(false);
    setIsSupplierVisible(false);
    setIsLegal(false);
    setTax(false);
  };
  const toggleSupplierSectionVisibility = () => {
    setIsSupplierVisible(!isSupplierVisible);
    setWasteVisible(false);
    setMaterialsVisible(false);
    setWaterVisible(false);
    setEnergySectionVisible(false);
    setEmisssion(false);
    setIsLegal(false);
    setTax(false);
  };
  const toggleEnergySectionVisibility = () => {
    setEnergySectionVisible(!isEnergySectionVisible);
    setWasteVisible(false);
    setMaterialsVisible(false);
    setWaterVisible(false);
    setIsSupplierVisible(false);
    setEmisssion(false);
    setIsLegal(false);
    setTax(false);
  };
  const toggleWasteVisible = () => {
    setWasteVisible(!isWasteVisible);
    setEnergySectionVisible(false);
    setMaterialsVisible(false);
    setWaterVisible(false);
    setIsSupplierVisible(false);
    setEmisssion(false);
    setIsLegal(false);
    setTax(false);
  };
  const toggleWaterVisible = () => {
    setWaterVisible(!isWaterVisible);
    setEnergySectionVisible(false);
    setWasteVisible(false);
    setMaterialsVisible(false);
    setIsSupplierVisible(false);
    setEmisssion(false);
    setIsLegal(false);
    setTax(false);
  };

  const toggleMaterialsVisible = () => {
    setMaterialsVisible(!isMaterialsVisible);
    setEnergySectionVisible(false);
    setWasteVisible(false);
    setWaterVisible(false);
    setIsSupplierVisible(false);
    setEmisssion(false);
    setIsLegal(false);
    setTax(false);
  };
  const toggleLegal = () => {
    setIsLegal(!isLegal);
    setWasteVisible(false);
    setMaterialsVisible(false);
    setWaterVisible(false);
    setEnergySectionVisible(false);
    setIsSupplierVisible(false);
    setEmisssion(false);
    setTax(false);
  };
  const toggleTax = () => {
    setTax(!isTax);
    setWasteVisible(false);
    setMaterialsVisible(false);
    setWaterVisible(false);
    setEnergySectionVisible(false);
    setIsSupplierVisible(false);
    setEmisssion(false);
    setIsLegal(false);
  };
  const toggleManagingConcerns = () => {
    setPolitical(false);
    setTax(false);
    setWasteVisible(false);
    setMaterialsVisible(false);
    setWaterVisible(false);
    setEnergySectionVisible(false);
    setIsSupplierVisible(false);
    setEmisssion(false);
    setIsLegal(false);
    setManagingConcerns(!ManagingConcerns);
  };
  const togglePolitical = () => {
    setPolitical(!Political);
    setTax(false);
    setWasteVisible(false);
    setMaterialsVisible(false);
    setWaterVisible(false);
    setEnergySectionVisible(false);
    setIsSupplierVisible(false);
    setEmisssion(false);
    setIsLegal(false);
  };
  const handleemssionClick = (option) => {
    // Handle clicking on an option in the Energy dropdown list
    handleTabClick(`${option}`);
    setEnergySectionVisible(false);
    setWasteVisible(false);
    setWaterVisible(false);
    setMaterialsVisible(false); // Hide the section after clicking an option
    setIsSupplierVisible(false);
  };
  useEffect(() => {
    if (activeTab === "Structure") {
      setEmisssion(true);
      setWasteVisible(false);
      setMaterialsVisible(false);
      setWaterVisible(false);
      setEnergySectionVisible(false);
      setIsSupplierVisible(false);
    }
  }, [activeTab]);
  const toggleSidebar = () => {
    setMobileopen(false);
  };
  return (
    <div className="m-3 ml-2 p-2 border border-r-2 border-b-2 shadow-lg rounded-md h-full">
      <div className="flex items-start py-4 min-h-[84vh] rounded-lg text-[0.875rem] overflow-x-hidden sm:w-[200px] md:w-[200px] lg:w-[200px] xl:w-[200px] 2xl:w-[200px] 3xl:w-[351px] scrollable-content">
        <div className="flex flex-col w-full font-medium">
          <button className="flex justify-between items-center px-4 py-2 -mt-4 mb-8 rounded-none focus:outline-none text-[#727272] font-bold">
            <div>
              {" "}
              <span className="text-[16px] font-extrabold">Governance</span>
            </div>

            <div className=" float-end block xl:hidden md:hidden lg:hidden 2xl:hidden 4k:hidden">
              <MdClose onClick={toggleSidebar} className="text-3xl" />
            </div>
          </button>
          <div>
            <button
              className={`flex  pl-2 py-2 mb-2 focus:outline-none w-full ${
                activeTab === "Structure" ||
                activeTab === "Nomination and Selection" ||
                activeTab === "Chair of Board"
                  ? "text-[#007EEF]"
                  : "bg-white text-[#727272] "
              }`}
              onClick={toggleEmission}
            >
              <div className="w-[20%]">
                < MdOutlineDiversity1 className="w-[16px] h-[16px] mr-2 mt-0.5" />
              </div>
              <div className="w-[50%] text-left flex items-center ">
                <span className="indent-0 text-[13px]">Board Info</span>
              </div>

              <div className="inset-y-0  flex items-center pointer-events-none w-[15%] justify-end">
                <MdKeyboardArrowDown
                  className={`text-lg text-neutral-500 ${
                    isEmission && "rotate-180"
                  }`}
                />
              </div>
            </button>

            {/* Energy section content */}
            {isEmission && (
              <>
                <div className="bg-white px-2 ml-4 3xl:ml-8 mt-2 border-l-2 border-gray-300">
                  <div>
                    <p className="text-[12px]  ml-16 xl:ml-4 md:xl:ml-4 lg:ml-4 2xl:ml-4 4k:ml-4 2k:ml-4  text-gray-400">
                      Topic disclosure
                    </p>
                  </div>
                  <div>
                    <p
                      className={`flex  text-start ml-16 xl:ml-4 md:xl:ml-4 lg:ml-4 2xl:ml-4 4k:ml-4 2k:ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                        activeTab === "Structure"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272]"
                      }`}
                      onClick={() => handleTabClick("Structure")}
                    >
                      Structure
                    </p>
                  </div>
                  {/* <div>
                    <p
                      className={`flex  text-start ml-16 xl:ml-4 md:xl:ml-4 lg:ml-4 2xl:ml-4 4k:ml-4 2k:ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                        activeTab ===
                        "Defined benefit plan obligations and other retirement plans"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272]"
                      }`}
                      onClick={() =>
                        handleTabClick(
                          "Defined benefit plan obligations and other retirement plans"
                        )
                      }
                    >
                      Defined benefit plan obligations and other retirement
                      plans
                    </p>
                  </div> */}
                  <div>
                    <p
                      className={`flex  text-start ml-16 xl:ml-4 md:xl:ml-4 lg:ml-4 2xl:ml-4 4k:ml-4 2k:ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                        activeTab === "Nomination and Selection"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272]"
                      }`}
                      onClick={() => handleTabClick("Nomination and Selection")}
                    >
                      Nomination and Selection
                    </p>
                  </div>
                  <div>
                    <p
                      className={`flex  text-start ml-16 xl:ml-4 md:xl:ml-4 lg:ml-4 2xl:ml-4 4k:ml-4 2k:ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                        activeTab === "Chair of Board"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272]"
                      }`}
                      onClick={() => handleTabClick("Chair of Board")}
                    >
                      Chair of Board
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Energy start  */}
          <div>
            <button
              className={`flex  pl-2 py-2 mb-2 focus:outline-none w-full ${
                activeTab === "Management of Impact" ||
                activeTab === "Delegation of Responsibility" ||
                activeTab === "Sustainability Reporting"
                  ? "text-[#007EEF]"
                  : "bg-white text-[#727272] "
              }`}
              onClick={toggleEnergySectionVisibility}
            >
              <div className="w-[20%]">
                < MdOutlineDiversity1 className="w-[16px] h-[16px] mr-2 mt-0.5" />
              </div>
              <div className="w-[50%] text-left ">
                <span className="indent-0 text-[13px]">
                  Board Involvement in Sustainability
                </span>
              </div>

              <div className="inset-y-0  flex items-center pointer-events-none w-[15%] justify-end">
                {/* <span className="text-[#0057A5] text-[10px] bg-[#0057a51a] py-[4px] px-[6px] rounded-md">M</span> */}

                <MdKeyboardArrowDown
                  className={`text-lg text-neutral-500 ${
                    isEnergySectionVisible && "rotate-180"
                  }`}
                />
              </div>
            </button>

            {/* Energy section content */}
            {isEnergySectionVisible && (
              <>
                <div className="bg-white px-2 ml-4 3xl:ml-8 mt-2 border-l-2 border-gray-300">
                  <div>
                    <p className="text-[12px]  ml-16 xl:ml-4 md:xl:ml-4 lg:ml-4 2xl:ml-4 4k:ml-4 2k:ml-4  text-gray-400">
                      Topic disclosure
                    </p>
                  </div>
                  <div>
                    <p
                      className={`flex  text-start ml-16 xl:ml-4 md:xl:ml-4 lg:ml-4 2xl:ml-4 4k:ml-4 2k:ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                        activeTab === "Management of Impact"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272]"
                      }`}
                      onClick={() => handleTabClick("Management of Impact")}
                    >
                      Management of Impact
                    </p>
                  </div>
                  <div>
                    <p
                      className={`flex  text-start ml-16 xl:ml-4 md:xl:ml-4 lg:ml-4 2xl:ml-4 4k:ml-4 2k:ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                        activeTab === "Delegation of Responsibility"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272] "
                      }`}
                      onClick={() =>
                        handleTabClick("Delegation of Responsibility")
                      }
                    >
                      Delegation of Responsibility
                    </p>
                  </div>
                  <div>
                    <p
                      className={`flex  text-start ml-16 xl:ml-4 md:xl:ml-4 lg:ml-4 2xl:ml-4 4k:ml-4 2k:ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                        activeTab === "Sustainability Reporting"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272] "
                      }`}
                      onClick={() => handleTabClick("Sustainability Reporting")}
                    >
                      Sustainability Reporting
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
          {/* waste start  */}
          <div>
            <button
              className={`flex  pl-2 py-2 mb-2 focus:outline-none w-full ${
                activeTab === "Conflict of Interest" ||
                activeTab === "Critical Concerns"
                  ? "text-blue-400"
                  : "bg-transparent text-[#727272]"
              }`}
              onClick={toggleWasteVisible}
            >
              <div className="w-[20%]">
                < MdOutlineDiversity1 className="w-[16px] h-[16px] mr-2 mt-0.5" />
              </div>
              <div className="w-[50%] text-left ">
                <span className="indent-0 text-[13px]">Governance</span>
              </div>

              <div className="inset-y-0  flex items-center pointer-events-none w-[15%] justify-end">
                {/* <span className="text-[#0057A5] text-[10px] bg-[#0057a51a] py-[4px] px-[6px] rounded-md">
                  M
                </span> */}
                <MdKeyboardArrowDown
                  className={`text-lg text-neutral-500 ${
                    isWasteVisible && "rotate-180"
                  }`}
                />
              </div>
            </button>

            {isWasteVisible && (
              <>
                <div className="bg-white px-2 ml-4 3xl:ml-8 mt-2 border-l-2 border-gray-300">
                  <div>
                    <p className="text-[12px]  ml-16 xl:ml-4 md:xl:ml-4 lg:ml-4 2xl:ml-4 4k:ml-4 2k:ml-4  text-gray-400">
                      Topic disclosure
                    </p>
                  </div>

                  <div>
                    <p
                      className={`flex  text-start ml-16 xl:ml-4 md:xl:ml-4 lg:ml-4 2xl:ml-4 4k:ml-4 2k:ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                        activeTab === "Conflict of Interest"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272] "
                      }`}
                      onClick={() => handleTabClick("Conflict of Interest")}
                    >
                      Conflict of Interest
                    </p>
                  </div>
                  <div>
                    <p
                      className={`flex  text-start ml-16 xl:ml-4 md:xl:ml-4 lg:ml-4 2xl:ml-4 4k:ml-4 2k:ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                        activeTab === "Critical Concerns"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272] "
                      }`}
                      onClick={() => handleTabClick("Critical Concerns")}
                    >
                      Critical Concerns
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
          {/* Materials start  */}

          <div>
            <button
              className={`flex  pl-2 py-2 mb-2 focus:outline-none w-full
              ${
                activeTab === "Sustainability Knowledge" ||
                activeTab === "Performance Evaluations" ||
                activeTab === "Remuneration" ||
                activeTab === "Determine Remuneration" ||
                activeTab === "Compensation Ratio"
                  ? "text-[#007EEF]"
                  : "bg-transparent text-[#727272] "
              }`}
              onClick={toggleMaterialsVisible}
            >
              <div className="w-[20%]">
                < MdOutlineDiversity1 className="w-[16px] h-[16px] mr-2 mt-0.5" />
              </div>
              <div className="w-[50%] text-left ">
                <span className="indent-0 text-[13px]">
                  Performance and Renumerations
                </span>
              </div>

              <div className="inset-y-0  flex items-center pointer-events-none w-[15%] justify-end">
                {/* <span className="text-[#0057A5] text-[10px] bg-[#0057a51a] py-[4px] px-[6px] rounded-md">
                  M
                </span> */}
                <MdKeyboardArrowDown
                  className={`text-lg text-neutral-500 ${
                    isMaterialsVisible && "rotate-180"
                  }`}
                />
              </div>
            </button>

            {isMaterialsVisible && (
              <>
                <div className="bg-white px-2 ml-4 3xl:ml-8 mt-2 border-l-2 border-gray-300">
                  <div>
                    <p className="text-[12px]  ml-16 xl:ml-4 md:xl:ml-4 lg:ml-4 2xl:ml-4 4k:ml-4 2k:ml-4  text-gray-400">
                      Topic disclosure
                    </p>
                  </div>

                  <div>
                    <p
                      className={`flex  text-start ml-16 xl:ml-4 md:xl:ml-4 lg:ml-4 2xl:ml-4 4k:ml-4 2k:ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                        activeTab === "Sustainability Knowledge"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272] "
                      }`}
                      onClick={() => handleTabClick("Sustainability Knowledge")}
                    >
                      Sustainability Knowledge
                    </p>
                  </div>
                  <div>
                    <p
                      className={`flex  text-start ml-16 xl:ml-4 md:xl:ml-4 lg:ml-4 2xl:ml-4 4k:ml-4 2k:ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                        activeTab === "Performance Evaluations"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272] "
                      }`}
                      onClick={() => handleTabClick("Performance Evaluations")}
                    >
                      Performance Evaluations
                    </p>
                  </div>
                  <div>
                    <p
                      className={`flex  text-start ml-16 xl:ml-4 md:xl:ml-4 lg:ml-4 2xl:ml-4 4k:ml-4 2k:ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                        activeTab === "Remuneration"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272] "
                      }`}
                      onClick={() => handleTabClick("Remuneration")}
                    >
                      Remuneration
                    </p>
                  </div>
                  <div>
                    <p
                      className={`flex  text-start ml-16 xl:ml-4 md:xl:ml-4 lg:ml-4 2xl:ml-4 4k:ml-4 2k:ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                        activeTab === "Determine Remuneration"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272] "
                      }`}
                      onClick={() => handleTabClick("Determine Remuneration")}
                    >
                      Determine Remuneration
                    </p>
                  </div>
                  <div>
                    <p
                      className={`flex  text-start ml-16 xl:ml-4 md:xl:ml-4 lg:ml-4 2xl:ml-4 4k:ml-4 2k:ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                        activeTab === "Compensation Ratio"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272] "
                      }`}
                      onClick={() => handleTabClick("Compensation Ratio")}
                    >
                      Compensation Ratio
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* supplier environmental assessment */}
          <div>
            <button
              className={`flex  pl-2 py-2 mb-2 focus:outline-none w-full ${
                activeTab === "Sustainability Strategy"
                  ? "text-[#007EEF]"
                  : "bg-white text-[#727272] "
              }`}
              onClick={toggleSupplierSectionVisibility}
            >
              <div className="w-[20%]">
                < MdOutlineDiversity1 className="w-[16px] h-[16px] mr-2 mt-0.5" />
              </div>
              <div className="w-[50%] text-left ">
                <span className="indent-0 text-[13px]">
                  Sustainability Strategy
                </span>
              </div>

              <div className="inset-y-0  flex items-center pointer-events-none w-[15%] justify-end">
                {/* <span className="text-[#0057A5] text-[10px] bg-[#0057a51a] py-[4px] px-[6px] rounded-md">
                  M
                </span> */}
                <MdKeyboardArrowDown
                  className={`text-lg text-neutral-500 ${
                    isSupplierVisible && "rotate-180"
                  }`}
                />
              </div>
            </button>

            {/* Energy section content */}
            {isSupplierVisible && (
              <>
                <div className="bg-white px-2 ml-4 3xl:ml-8 mt-2 border-l-2 border-gray-300">
                  <div>
                    <p className="text-[12px]  ml-16 xl:ml-4 md:xl:ml-4 lg:ml-4 2xl:ml-4 4k:ml-4 2k:ml-4  text-gray-400">
                      Topic disclosure
                    </p>
                  </div>
                  <div>
                    <p
                      className={`flex  text-start ml-16 xl:ml-4 md:xl:ml-4 lg:ml-4 2xl:ml-4 4k:ml-4 2k:ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                        activeTab === "Sustainability Strategy"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272]"
                      }`}
                      onClick={() => handleTabClick("Sustainability Strategy")}
                    >
                      Sustainability Strategy
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>

          <div>
            <button
              className={`flex  pl-2 py-2 mb-2 focus:outline-none w-full ${
                activeTab === "Policy Commitments" ||
                activeTab === "Implementing Commitments"
                  ? "text-[#007EEF]"
                  : "bg-white text-[#727272] "
              }`}
              onClick={toggleTax}
            >
              <div className="w-[20%]">
                < MdOutlineDiversity1 className="w-[16px] h-[16px] mr-2 mt-0.5" />
              </div>
              <div className="w-[50%] text-left ">
                <span className="indent-0 text-[13px]">Policy</span>
              </div>

              <div className="inset-y-0  flex items-center pointer-events-none w-[15%] justify-end">
                {/* <span className="text-[#0057A5] text-[10px] bg-[#0057a51a] py-[4px] px-[6px] rounded-md">
                  M
                </span> */}
                <MdKeyboardArrowDown
                  className={`text-lg text-neutral-500 ${
                    isTax && "rotate-180"
                  }`}
                />
              </div>
            </button>

            {/* Energy section content */}
            {isTax && (
              <>
                <div className="bg-white px-2 ml-4 3xl:ml-8 mt-2 border-l-2 border-gray-300">
                  <div>
                    <p className="text-[12px]  ml-16 xl:ml-4 md:xl:ml-4 lg:ml-4 2xl:ml-4 4k:ml-4 2k:ml-4  text-gray-400">
                      Topic disclosure
                    </p>
                  </div>
                  <div>
                    <p
                      className={`flex  text-start ml-16 xl:ml-4 md:xl:ml-4 lg:ml-4 2xl:ml-4 4k:ml-4 2k:ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                        activeTab === "Policy Commitments"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272]"
                      }`}
                      onClick={() => handleTabClick("Policy Commitments")}
                    >
                      Policy Commitments
                    </p>
                  </div>
                  <div>
                    <p
                      className={`flex  text-start ml-16 xl:ml-4 md:xl:ml-4 lg:ml-4 2xl:ml-4 4k:ml-4 2k:ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                        activeTab === "Implementing Commitments"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272] "
                      }`}
                      onClick={() => handleTabClick("Implementing Commitments")}
                    >
                      Implementing Commitments
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
          <div>
            <button
              className={`flex  pl-2 py-2 mb-2 focus:outline-none w-full ${
                activeTab === "Process"
                  ? "text-[#007EEF]"
                  : "bg-white text-[#727272] "
              }`}
              onClick={togglePolitical}
            >
              <div className="w-[20%]">
                < MdOutlineDiversity1 className="w-[16px] h-[16px] mr-2 mt-0.5" />
              </div>
              <div className="w-[50%] text-left ">
                <span className="indent-0 text-[13px]">Remediation</span>
              </div>

              <div className="inset-y-0  flex items-center pointer-events-none w-[15%] justify-end">
                {/* <span className="text-[#0057A5] text-[10px] bg-[#0057a51a] py-[4px] px-[6px] rounded-md">
                  M
                </span> */}
                <MdKeyboardArrowDown
                  className={`text-lg text-neutral-500 ${
                    Political && "rotate-180"
                  }`}
                />
              </div>
            </button>

            {/* Energy section content */}
            {Political && (
              <>
                <div className="bg-white px-2 ml-4 3xl:ml-8 mt-2 border-l-2 border-gray-300">
                  <div>
                    <p className="text-[12px]  ml-16 xl:ml-4 md:xl:ml-4 lg:ml-4 2xl:ml-4 4k:ml-4 2k:ml-4  text-gray-400">
                      Topic disclosure
                    </p>
                  </div>
                  <div>
                    <p
                      className={`flex  text-start ml-16 xl:ml-4 md:xl:ml-4 lg:ml-4 2xl:ml-4 4k:ml-4 2k:ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                        activeTab === "Process"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272]"
                      }`}
                      onClick={() => handleTabClick("Process")}
                    >
                      Process
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
          <div>
            <button
              className={`flex  pl-2 py-2 mb-2 focus:outline-none w-full ${
                activeTab === "Advice & Concerns"
                  ? "text-[#007EEF]"
                  : "bg-white text-[#727272] "
              }`}
              onClick={toggleManagingConcerns}
            >
              <div className="w-[20%]">
                < MdOutlineDiversity1 className="w-[16px] h-[16px] mr-2 mt-0.5" />
              </div>
              <div className="w-[50%] text-left ">
                <span className="indent-0 text-[13px]">Managing Concerns</span>
              </div>

              <div className="inset-y-0  flex items-center pointer-events-none w-[15%] justify-end">
                {/* <span className="text-[#0057A5] text-[10px] bg-[#0057a51a] py-[4px] px-[6px] rounded-md">
                  M
                </span> */}
                <MdKeyboardArrowDown
                  className={`text-lg text-neutral-500 ${
                    Political && "rotate-180"
                  }`}
                />
              </div>
            </button>

            {/* Energy section content */}
            {ManagingConcerns && (
              <>
                <div className="bg-white px-2 ml-4 3xl:ml-8 mt-2 border-l-2 border-gray-300">
                  <div>
                    <p className="text-[12px]  ml-16 xl:ml-4 md:xl:ml-4 lg:ml-4 2xl:ml-4 4k:ml-4 2k:ml-4  text-gray-400">
                      Topic disclosure
                    </p>
                  </div>
                  <div>
                    <p
                      className={`flex  text-start ml-16 xl:ml-4 md:xl:ml-4 lg:ml-4 2xl:ml-4 4k:ml-4 2k:ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                        activeTab === "Advice & Concerns"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272]"
                      }`}
                      onClick={() => handleTabClick("Advice & Concerns")}
                    >
                      Advice & Concerns
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Aside;
