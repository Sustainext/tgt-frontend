"use client";

import { useState, useEffect } from "react";
import {MdOutlineGroups2,MdKeyboardArrowDown} from "react-icons/md";

import { GiWoodPile } from "react-icons/gi";

const Aside = ({ activeTab, handleTabClick,apiData }) => {
  const [isEmission, setEmisssion] = useState(false);
  const [isEnergySectionVisible, setEnergySectionVisible] = useState(false);
  const [isWasteVisible, setWasteVisible] = useState(false);
  const [isWaterVisible, setWaterVisible] = useState(false);
  const [isMaterialsVisible, setMaterialsVisible] = useState(false);
  const [isSupplierVisible, setIsSupplierVisible] = useState(false);
  const [isLegal, setIsLegal] = useState(false);
  const [isTax, setTax] = useState(false);
  const [Political, setPolitical]  = useState(false);

  const materialityEnvData=apiData&&apiData.governance?apiData.governance:{}

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
  const togglePolitical = () => {
    setPolitical(!Political)
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
    if (activeTab === "Management of Material topic Economic Performance") {
      setEmisssion(true);
      setWasteVisible(false);
      setMaterialsVisible(false);
      setWaterVisible(false);
      setEnergySectionVisible(false);
      setIsSupplierVisible(false);
    }
  }, [activeTab]);
  return (
    <div className="m-3 ml-2 p-2 border border-r-2 border-b-2 shadow-lg rounded-md h-full">
      <div className="flex items-start py-4 min-h-[84vh] rounded-lg text-[0.875rem] overflow-x-hidden sm:w-[200px] md:w-[200px] lg:w-[200px] xl:w-[200px] 2xl:w-[200px] 3xl:w-[351px] scrollable-content">
        <div className="flex flex-col w-full font-medium">
          <button className="flex items-center px-4 py-2 -mt-4 mb-8 rounded-none focus:outline-none text-[#727272] font-bold">
            <span className="text-[16px] font-extrabold">Economic </span>
          </button>
          <div>
            <button
              className={`flex  pl-2 py-2 mb-2 focus:outline-none w-full ${
                activeTab ===
                  "Management of Material topic Economic Performance" ||
                activeTab === "Direct economic value generated & distributed" ||
                activeTab === "Financial assistance received from government"
                  ? "text-[#007EEF]"
                  : "bg-white text-[#727272] "
              }`}
              onClick={toggleEmission}
            >
              <div className="w-[20%]">
                <MdOutlineGroups2 className="w-5 h-5 mr-2 mt-1" />
              </div>
              <div className="w-[50%] text-left ">
                <span className="indent-0 text-[13px]">
                  Economic Performance
                </span>
              </div>
              {materialityEnvData&&materialityEnvData.GovEconomicPerformance?.is_material_topic?(
                <div className="w-[15%] ml-5">
                   <span className="text-[#007EEF] text-[10px] bg-[#0057a51a] py-[4px] px-[6px] rounded-md">
                  M
          </span>
                </div>
                 
              ):(
                <span className="w-[15%] ml-5"></span>
              )}

              <div className="inset-y-0  flex items-center pointer-events-none w-[15%] justify-end">
                {/* <span className="text-[#0057A5] text-[10px] bg-[#0057a51a] py-[4px] px-[6px] rounded-md">M</span> */}

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
                  {materialityEnvData&&materialityEnvData.GovEconomicPerformance?.is_material_topic?(
                      <div>
                        <div>
                    <p className="text-[12px]  ml-4  text-gray-400">
                      Mandatory Management Disclosure
                    </p>
                  </div>
                  <div>
                    <p
                      className={`flex  text-start ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                        activeTab ===
                        "Management of Material topic Economic Performance"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272]"
                      }`}
                      onClick={() =>
                        handleTabClick(
                          "Management of Material topic Economic Performance"
                        )
                      }
                    >
                      Management of Material topic
                    </p>
                  </div>
                      </div>
                  ):(
                    <div></div>
                  )}
                  
                  <div>
                    <p className="text-[12px]  ml-4  text-gray-400">
                      Topic disclosure
                    </p>
                  </div>
                  <div>
                    <p
                      className={`flex  text-start ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                        activeTab ===
                        "Direct economic value generated & distributed"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272]"
                      }`}
                      onClick={() =>
                        handleTabClick(
                          "Direct economic value generated & distributed"
                        )
                      }
                    >
                      Direct Economic Value Generated
                    </p>
                  </div>
                  {/* <div>
                    <p
                      className={`flex  text-start ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
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
                      className={`flex  text-start ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                        activeTab ===
                        "Financial assistance received from government"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272]"
                      }`}
                      onClick={() =>
                        handleTabClick(
                          "Financial assistance received from government"
                        )
                      }
                    >
                      Government Assistance
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
                activeTab === "Financial Implications due to climate change" ||
                activeTab === "Climate related Risks" ||
                activeTab === "Climate Related Opportunities" ||
                activeTab === "Management of Material topic risks"
                  ? "text-[#007EEF]"
                  : "bg-white text-[#727272] "
              }`}
              onClick={toggleEnergySectionVisibility}
            >
              <div className="w-[20%]">
                <MdOutlineGroups2 className="w-5 h-5 mr-2 mt-1" />
              </div>
              <div className="w-[50%] text-left ">
                <span className="indent-0 text-[13px]">
                Climate Risks and Opportunities
                </span>
              </div>
              {materialityEnvData&&materialityEnvData.ClimateRisksAndOpportunities?.is_material_topic?(
                <div className="w-[15%] ml-5">
                   <span className="text-[#007EEF] text-[10px] bg-[#0057a51a] py-[4px] px-[6px] rounded-md">
                  M
          </span>
                </div>
                 
              ):(
                <span className="w-[15%] ml-5"></span>
              )}

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
                  {materialityEnvData&&materialityEnvData.ClimateRisksAndOpportunities?.is_material_topic?(
                      <div>
                         <div>
                    <p className="text-[12px]  ml-4  text-gray-400">
                      Mandatory Management Disclosure
                    </p>
                  </div>
                  <div>
                    <p
                      className={`flex  text-start ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                        activeTab === "Management of Material topic risks"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272]"
                      }`}
                      onClick={() =>
                        handleTabClick("Management of Material topic risks")
                      }
                    >
                      Management of Material topic
                    </p>
                  </div>
                      </div>
                  ):(
                    <div></div>
                  )}
                 
                  <div>
                    <p className="text-[12px]  ml-4  text-gray-400">
                      Topic disclosure
                    </p>
                  </div>
                  <div>
                    <p
                      className={`flex  text-start ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                        activeTab ===
                        "Financial Implications due to climate change"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272]"
                      }`}
                      onClick={() =>
                        handleTabClick(
                          "Financial Implications due to climate change"
                        )
                      }
                    >
                      Financial Implications due to Climate Change
                    </p>
                  </div>
                  <div>
                    <p
                      className={`flex  text-start ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                        activeTab === "Climate related Risks"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272] "
                      }`}
                      onClick={() => handleTabClick("Climate related Risks")}
                    >
                     Climate Related Risks
                    </p>
                  </div>
                  <div>
                    <p
                      className={`flex  text-start ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                        activeTab === "Climate Related Opportunities"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272] "
                      }`}
                      onClick={() =>
                        handleTabClick("Climate Related Opportunities")
                      }
                    >
                      Climate Related Opportunities
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
                activeTab ===
                  "Proportion of senior management hired from the local community" ||
                activeTab === "Management of Material topic Market"
                  ? "text-blue-400"
                  : "bg-transparent text-[#727272]"
              }`}
              onClick={toggleWasteVisible}
            >
              <div className="w-[20%]">
                <MdOutlineGroups2 className="w-5 h-5 mr-2 mt-1" />
              </div>
              <div className="w-[50%] text-left ">
                <span className="indent-0 text-[13px]">Economic Governance</span>
              </div>
              {materialityEnvData&&materialityEnvData.GovGovernance?.is_material_topic?(
                <div className="w-[15%] ml-5">
                   <span className="text-[#007EEF] text-[10px] bg-[#0057a51a] py-[4px] px-[6px] rounded-md">
                  M
          </span>
                </div>
                 
              ):(
                <span className="w-[15%] ml-5"></span>
              )}

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
                  {materialityEnvData&&materialityEnvData.GovGovernance?.is_material_topic?(
                    <div>
                       <div>
                    <p className="text-[12px]  ml-4  text-gray-400">
                      Mandatory Management Disclosure
                    </p>
                  </div>
                  <div>
                    <p
                      className={`flex  text-start ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                        activeTab === "Management of Material topic Market"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272]"
                      }`}
                      onClick={() =>
                        handleTabClick("Management of Material topic Market")
                      }
                    >
                      Management of Material topic
                    </p>
                  </div>
                    </div>
                  ):(
                    <div></div>
                  )}
                 
                  <div>
                    <p className="text-[12px]  ml-4  text-gray-400">
                      Topic disclosure
                    </p>
                  </div>
                 
                  <div>
                    <p
                      className={`flex  text-start ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                        activeTab ===
                        "Proportion of senior management hired from the local community"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272] "
                      }`}
                      onClick={() =>
                        handleTabClick(
                          "Proportion of senior management hired from the local community"
                        )
                      }
                    >
                      Senior Management Hired from Local Community
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
                activeTab ===
                  "Management of Material topic Indirect Economic" ||
                activeTab ===
                  "Infrastructure investments and services supported" ||
                activeTab === "Significant indirect economic impacts"
                  ? "text-[#007EEF]"
                  : "bg-transparent text-[#727272] "
              }`}
              onClick={toggleMaterialsVisible}
            >
              <div className="w-[20%]">
                <MdOutlineGroups2 className="w-5 h-5 mr-2" />
              </div>
              <div className="w-[50%] text-left ">
                <span className="indent-0 text-[13px]">
                Economic Impacts
                </span>
              </div>
              {materialityEnvData&&materialityEnvData.GovEconomicImpact?.is_material_topic?(
                <div className="w-[15%] ml-5">
                   <span className="text-[#007EEF] text-[10px] bg-[#0057a51a] py-[4px] px-[6px] rounded-md">
                  M
          </span>
                </div>
                 
              ):(
                <span className="w-[15%] ml-5"></span>
              )}

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
                  {materialityEnvData&&materialityEnvData.GovEconomicImpact?.is_material_topic?(
                    <div>
                      <div>
                    <p className="text-[12px]  ml-4  text-gray-400">
                      Mandatory Management Disclosure
                    </p>
                  </div>
                  <div>
                    <p
                      className={`flex  text-start ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                        activeTab ===
                        "Management of Material topic Indirect Economic"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272]"
                      }`}
                      onClick={() =>
                        handleTabClick(
                          "Management of Material topic Indirect Economic"
                        )
                      }
                    >
                      Management of Material topic
                    </p>
                  </div>
                    </div>
                  ):(
                    <div></div>
                  )}
                  
                  <div>
                    <p className="text-[12px]  ml-4  text-gray-400">
                      Topic disclosure
                    </p>
                  </div>

                  <div>
                    <p
                      className={`flex  text-start ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                        activeTab ===
                        "Infrastructure investments and services supported"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272] "
                      }`}
                      onClick={() =>
                        handleTabClick(
                          "Infrastructure investments and services supported"
                        )
                      }
                    >
                      Infrastructure Investments and Services Supported
                    </p>
                  </div>
                  <div>
                    <p
                      className={`flex  text-start ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                        activeTab === "Significant indirect economic impacts"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272] "
                      }`}
                      onClick={() =>
                        handleTabClick("Significant indirect economic impacts")
                      }
                    >
                    Indirect Economic Impacts
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Water and effluents */}
          {/* <div className={`relative `}>
            <button
              className={`flex  pl-2 py-2 mb-2 focus:outline-none w-full
              ${
                activeTab === "Proportion of spending on local suppliers"
                  ? "text-blue-400"
                  : "bg-transparent text-[#727272] "
              }`}
              onClick={toggleWaterVisible}
            >
         
              <div className="w-[67%] text-left ">
                <span className="indent-0 text-[13px]">
                  Procurement Practices
                </span>
              </div>

              <div className="inset-y-0  flex items-center pointer-events-none w-[25%] justify-end">
          
                <MdKeyboardArrowDown
                  className={`text-lg text-neutral-500 ${
                    isWaterVisible && "rotate-180"
                  }`}
                />
              </div>
            </button>

        
            {isWaterVisible && (
              <>
                 <div className="bg-white px-2 ml-4 3xl:ml-8 mt-2 border-l-2 border-gray-300">
                  <div>
                    <p className="text-[12px]  ml-4  text-gray-400">
                      Topic disclosure
                    </p>
                  </div>
                  <div>
                    <p
                      className={`flex  text-start ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                        activeTab ===
                        "Proportion of spending on local suppliers"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272] "
                      }`}
                      onClick={() =>
                        handleTabClick(
                          "Proportion of spending on local suppliers"
                        )
                      }
                    >
                      Proportion of spending on local suppliers
                    </p>
                  </div>
                </div>
              </>
            )}
          </div> */}

          {/* supplier environmental assessment */}
          <div>
            <button
              className={`flex  pl-2 py-2 mb-2 focus:outline-none w-full ${
                activeTab ===
                  "Operations assessed for risks related to corruption" ||
                activeTab === "Management of Material topic Anti" ||
                activeTab === "Public legal cases regarding corruption"||
                activeTab ===
                  "Confirmed incidents of corruption and actions taken" ||
                      activeTab === "Anti Competitive Behavior"
                  ? "text-[#007EEF]"
                  : "bg-white text-[#727272] "
              }`}
              onClick={toggleSupplierSectionVisibility}
            >
             <div className="w-[20%]">
                <MdOutlineGroups2 className="w-5 h-5 mr-2" />
              </div>
              <div className="w-[50%] text-left ">
                <span className="indent-0 text-[13px]">Anti Corruption</span>
              </div>
              {materialityEnvData&&materialityEnvData.GovCorruption?.is_material_topic?(
                <div className="w-[15%] ml-5">
                   <span className="text-[#007EEF] text-[10px] bg-[#0057a51a] py-[4px] px-[6px] rounded-md">
                  M
          </span>
                </div>
                 
              ):(
                <span className="w-[15%] ml-5"></span>
              )}

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
                  {materialityEnvData&&materialityEnvData.GovCorruption?.is_material_topic?(
                      <div>
                         <div>
                    <p className="text-[12px]  ml-4  text-gray-400">
                      Mandatory Management Disclosure
                    </p>
                  </div>
                  <div>
                    <p
                      className={`flex  text-start ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                        activeTab === "Management of Material topic Anti"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272]"
                      }`}
                      onClick={() =>
                        handleTabClick("Management of Material topic Anti")
                      }
                    >
                      Management of Material topic
                    </p>
                  </div>
                      </div>
                  ):(
                    <div></div>
                  )}
                 
                  <div>
                    <p className="text-[12px]  ml-4  text-gray-400">
                      Topic disclosure
                    </p>
                  </div>
                  <div>
                    <p
                      className={`flex  text-start ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                        activeTab ===
                        "Operations assessed for risks related to corruption"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272]"
                      }`}
                      onClick={() =>
                        handleTabClick(
                          "Operations assessed for risks related to corruption"
                        )
                      }
                    >
                     Risks related to Corruption
                    </p>
                  </div>
                  <div>
                    <p
                      className={`flex  text-start ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                        activeTab ===
                        "Communication and training about anti-corruption policies and procedures"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272] "
                      }`}
                      onClick={() =>
                        handleTabClick(
                          "Communication and training about anti-corruption policies and procedures"
                        )
                      }
                    >
                      Anit-corruption Policies and Procedures
                    </p>
                  </div>
                  <div>
                    <p
                      className={`flex  text-start ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                        activeTab ===
                        "Confirmed incidents of corruption and actions taken"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272] "
                      }`}
                      onClick={() =>
                        handleTabClick(
                          "Confirmed incidents of corruption and actions taken"
                        )
                      }
                    >
                     Incidents of Corruption
                    </p>
                  </div>
                  <div>
                    <p
                      className={`flex  text-start ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                        activeTab === "Public legal cases regarding corruption"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272] "
                      }`}
                      onClick={() =>
                        handleTabClick(
                          "Public legal cases regarding corruption"
                        )
                      }
                    >
                      Public legal cases regarding corruption
                    </p>
                  </div>
                  <div>
                    <p
                      className={`flex  text-start ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                        activeTab === "Anti Competitive Behavior"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272] "
                      }`}
                      onClick={() =>
                        handleTabClick("Anti Competitive Behavior")
                      }
                    >
                     Legal Actions
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* <div className={`relative `}>
            <button
              className={`flex items-center justify-between py-2 mb-2 focus:outline-none w-full
              ${
                activeTab === "Public legal cases regarding corruption"
            
                  ? "text-blue-400"
                  : "bg-transparent text-[#727272] "
              }`}
              onClick={toggleLegal}
            >
           
              <div className="w-[67%] text-left ">
                <span className="indent-0 text-[13px]">Legal Actions</span>
              </div>

              <div className="inset-y-0  flex items-center pointer-events-none w-[25%] justify-end">
            
                <MdKeyboardArrowDown
                  className={`text-lg text-neutral-500 ${
                    isLegal && "rotate-180"
                  }`}
                />
              </div>
            </button>

        
            {isLegal && (
              <>
                 <div className="bg-white px-2 ml-4 3xl:ml-8 mt-2 border-l-2 border-gray-300">
                  <div>
                    <p className="text-[12px]  ml-4  text-gray-400">
                      Topic disclosure
                    </p>
                  </div>
                  <div>
                    <p
                      className={`flex  text-start ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                        activeTab === "Public legal cases regarding corruption"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272] "
                      }`}
                      onClick={() =>
                        handleTabClick(
                          "Public legal cases regarding corruption"
                        )
                      }
                    >
                      Public legal cases regarding corruption
                    </p>
                  </div>
              
                </div>
              </>
            )}
          </div> */}

          <div>
            <button
              className={`flex  pl-2 py-2 mb-2 focus:outline-none w-full ${
                activeTab === "Approach to tax" ||
                activeTab === "Management of Material topic Tax" ||
                activeTab === "Country-by-country reporting" ||
                activeTab === "Tax governance, control, and risk management" ||
                activeTab ===
                  "Stakeholder engagement and management of concerns related to tax"
                  ? "text-[#007EEF]"
                  : "bg-white text-[#727272] "
              }`}
              onClick={toggleTax}
            >
             <div className="w-[20%]">
                <MdOutlineGroups2 className="w-5 h-5 mr-2" />
              </div>
              <div className="w-[50%] text-left ">
                <span className="indent-0 text-[13px]">Tax Transparency</span>
              </div>
              {materialityEnvData&&materialityEnvData.GovTaxTransparency?.is_material_topic?(
                <div className="w-[15%] ml-5">
                   <span className="text-[#007EEF] text-[10px] bg-[#0057a51a] py-[4px] px-[6px] rounded-md">
                  M
          </span>
                </div>
                 
              ):(
                <span className="w-[15%] ml-5"></span>
              )}

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
                  {materialityEnvData&&materialityEnvData.GovTaxTransparency?.is_material_topic?(
                    <div>
                       <div>
                    <p className="text-[12px]  ml-4  text-gray-400">
                      Mandatory Management Disclosure
                    </p>
                  </div>
                  <div>
                    <p
                      className={`flex  text-start ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                        activeTab === "Management of Material topic Tax"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272]"
                      }`}
                      onClick={() =>
                        handleTabClick("Management of Material topic Tax")
                      }
                    >
                      Management of Material topic
                    </p>
                  </div>
                    </div>
                  ):(
                    <div></div>
                  )}
                 
                  <div>
                    <p className="text-[12px]  ml-4  text-gray-400">
                      Topic disclosure
                    </p>
                  </div>
                  <div>
                    <p
                      className={`flex  text-start ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                        activeTab === "Approach to tax"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272]"
                      }`}
                      onClick={() => handleTabClick("Approach to tax")}
                    >
                      Approach to tax
                    </p>
                  </div>
                  <div>
                    <p
                      className={`flex  text-start ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                        activeTab ===
                        "Tax governance, control, and risk management"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272] "
                      }`}
                      onClick={() =>
                        handleTabClick(
                          "Tax governance, control, and risk management"
                        )
                      }
                    >
                      Tax Governance & Risk Management
                    </p>
                  </div>
                  <div>
                    <p
                      className={`flex  text-start ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                        activeTab ===
                        "Stakeholder engagement and management of concerns related to tax"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272] "
                      }`}
                      onClick={() =>
                        handleTabClick(
                          "Stakeholder engagement and management of concerns related to tax"
                        )
                      }
                    >
                    Stakeholder Engagement
                    </p>
                  </div>
                  <div>
                    <p
                      className={`flex  text-start ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                        activeTab === "Country-by-country reporting"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272] "
                      }`}
                      onClick={() =>
                        handleTabClick("Country-by-country reporting")
                      }
                    >
                      Country-by-Country Reporting
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
          <div>
            <button
              className={`flex  pl-2 py-2 mb-2 focus:outline-none w-full ${
                activeTab === "Political Contribution" ||
                activeTab === "Management of Material topic Political Influence" 
            
                  ? "text-[#007EEF]"
                  : "bg-white text-[#727272] "
              }`}
              onClick={togglePolitical}
            >
             <div className="w-[20%]">
                <MdOutlineGroups2 className="w-5 h-5 mr-2 mt-1" />
              </div>
              <div className="w-[50%] text-left ">
                <span className="indent-0 text-[13px]">Lobbying and Political Influence</span>
              </div>
              {materialityEnvData&&materialityEnvData.GovPolicy?.is_material_topic?(
                <div className="w-[15%] ml-5">
                   <span className="text-[#007EEF] text-[10px] bg-[#0057a51a] py-[4px] px-[6px] rounded-md">
                  M
          </span>
                </div>
                 
              ):(
                <span className="w-[15%] ml-5"></span>
              )}

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
                  {materialityEnvData&&materialityEnvData.GovPolicy?.is_material_topic?(
                      <div>
                        <div>
                    <p className="text-[12px]  ml-4  text-gray-400">
                      Mandatory Management Disclosure
                    </p>
                  </div>
                  <div>
                    <p
                      className={`flex  text-start ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                        activeTab === "Management of Material topic Political Influence"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272]"
                      }`}
                      onClick={() =>
                        handleTabClick("Management of Material topic Political Influence")
                      }
                    >
                      Management of Material topic
                    </p>
                  </div>
                      </div>
                  ):(
                    <div></div>
                  )}
                  
                  <div>
                    <p className="text-[12px]  ml-4  text-gray-400">
                      Topic disclosure
                    </p>
                  </div>
                  <div>
                    <p
                      className={`flex  text-start ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                        activeTab === "Political Contribution"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272]"
                      }`}
                      onClick={() => handleTabClick("Political Contribution")}
                    >
                      Political Contribution
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
