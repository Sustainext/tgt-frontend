"use client";

import { useState, useEffect } from "react";
import { MdOutlineGroups2, MdKeyboardArrowDown, MdClose } from "react-icons/md";
import { LiaCanadianMapleLeaf } from "react-icons/lia";
import { FaCanadianMapleLeaf } from "react-icons/fa";
import axiosInstance from "../../utils/axiosMiddleware";

import { GiWoodPile } from "react-icons/gi";

const Aside = ({
  activeTab,
  handleTabClick,
  setActiveTab,
  apiData,
  setMobileopen,
}) => {
  const materialityEnvData = apiData && apiData.social ? apiData.social : {};
  const [isEmission, setEmisssion] = useState(false);
  const [isBillS211, setBillS211] = useState(false);
  const [isEnergySectionVisible, setEnergySectionVisible] = useState(false);
  const [isWasteVisible, setWasteVisible] = useState(false);
  const [isWaterVisible, setWaterVisible] = useState(false);
  const [isMaterialsVisible, setMaterialsVisible] = useState(false);
  const [isSupplierVisible, setIsSupplierVisible] = useState(false);
  const [isLegal, setIsLegal] = useState(false);
  const [isTax, setTax] = useState(false);
  const [SupplyChain, setSupplyChain] = useState(false);
  const [Safety, setSafety] = useState(false);
  const [Marketing, setMarketing] = useState(false);
  const [Privacy, setPrivacy] = useState(false);
  const [showBillS211, setShowBillS211] = useState(false);
  const toggleEmission = () => {
    setEmisssion(!isEmission);
    setWasteVisible(false);
    setMaterialsVisible(false);
    setWaterVisible(false);
    setEnergySectionVisible(false);
    setIsSupplierVisible(false);
    setIsLegal(false);
    setTax(false);
    setBillS211(false);
    setSafety(false);
    setPrivacy(false);
    setMarketing(false);
    setSupplyChain(false);
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
    setBillS211(false);
    setSafety(false);
    setPrivacy(false);
    setMarketing(false);
    setSupplyChain(false);
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
    setBillS211(false);
    setSafety(false);
    setPrivacy(false);
    setMarketing(false);
    setSupplyChain(false);
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
    setBillS211(false);
    setSafety(false);
    setPrivacy(false);
    setMarketing(false);
    setSupplyChain(false);
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
    setBillS211(false);
    setSafety(false);
    setPrivacy(false);
    setMarketing(false);
    setSupplyChain(false);
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
    setBillS211(false);
    setSafety(false);
    setPrivacy(false);
    setMarketing(false);
    setSupplyChain(false);
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
    setBillS211(false);
    setSafety(false);
    setPrivacy(false);
    setMarketing(false);
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
    setBillS211(false);
    setSafety(false);
    setPrivacy(false);
    setMarketing(false);
  };

  const toggleSupplyChain = () => {
    setSupplyChain(!SupplyChain);
    setTax(false);
    setWasteVisible(false);
    setMaterialsVisible(false);
    setWaterVisible(false);
    setEnergySectionVisible(false);
    setIsSupplierVisible(false);
    setEmisssion(false);
    setIsLegal(false);
    setBillS211(false);
    setSafety(false);
    setPrivacy(false);
    setMarketing(false);
  };
  const toggleSafety = () => {
    setSafety(!Safety);
    setPrivacy(false);
    setSupplyChain(false);
    setTax(false);
    setWasteVisible(false);
    setMaterialsVisible(false);
    setWaterVisible(false);
    setEnergySectionVisible(false);
    setIsSupplierVisible(false);
    setEmisssion(false);
    setIsLegal(false);
    setBillS211(false);
    setMarketing(false);
  };
  const toggleMarketing = () => {
    setMarketing(!Marketing);
    setSafety(false);
    setPrivacy(false);
    setSupplyChain(false);
    setTax(false);
    setWasteVisible(false);
    setMaterialsVisible(false);
    setWaterVisible(false);
    setEnergySectionVisible(false);
    setIsSupplierVisible(false);
    setEmisssion(false);
    setIsLegal(false);
    setBillS211(false);
  };
  const togglePrivacy = () => {
    setPrivacy(!Privacy);
    setMarketing(false);
    setSafety(false);
    setSupplyChain(false);
    setTax(false);
    setWasteVisible(false);
    setMaterialsVisible(false);
    setWaterVisible(false);
    setEnergySectionVisible(false);
    setIsSupplierVisible(false);
    setEmisssion(false);
    setIsLegal(false);
    setBillS211(false);
  };

  const toggleBillS211 = () => {
    setBillS211(!isBillS211);
    setPrivacy(false);
    setMarketing(false);
    setSafety(false);
    setSupplyChain(false);
    setTax(false);
    setWasteVisible(false);
    setMaterialsVisible(false);
    setWaterVisible(false);
    setEnergySectionVisible(false);
    setIsSupplierVisible(false);
    setEmisssion(false);
    setIsLegal(false);
  };

  const getAuthToken = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token")?.replace(/"/g, "");
    }
    return "";
  };
  const token = getAuthToken();

  let axiosConfig = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  const fetchBillS211 = async () => {
    try {
      const response = await axiosInstance.get(
        `${process.env.BACKEND_API_URL}/canadabills211/canada_section/`,
        axiosConfig
      );

      if (response.status === 200) {
        if (response.data.enable_section) {
          setShowBillS211(response.data.enable_section);
          handleTabClick("Identifying Information");
          toggleBillS211();
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBillS211();
  }, []);

  useEffect(() => {
    if (activeTab === "Management of Material topic OHS") {
      setEmisssion(false);
      setWasteVisible(true);
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
              <span className="text-[16px] font-extrabold">Social</span>
            </div>

            <div className=" float-end block xl:hidden md:hidden lg:hidden 2xl:hidden 4k:hidden">
              <MdClose onClick={toggleSidebar} className="text-3xl" />
            </div>
          </button>

          {/* Bill S-211 starts */}
          {showBillS211 ? (
            <div>
              <button
                className={`flex  pl-2 py-2 mb-2 focus:outline-none w-full ${
                  activeTab === "Identifying Information" ||
                  activeTab === "Annual report"
                    ? "text-[#007EEF]"
                    : "bg-white text-[#727272] "
                }`}
                onClick={toggleBillS211}
              >
                <div className="w-[20%]">
                  <FaCanadianMapleLeaf className="w-5 h-5 mr-2" />
                </div>
                <div className="w-[67%] text-left ">
                  <span className="indent-0 text-[13px]">Bill S-211</span>
                </div>

                <div className="inset-y-0  flex items-center pointer-events-none w-[25%] justify-end">
                  <MdKeyboardArrowDown
                    className={`text-lg text-neutral-500 ${
                      isBillS211 && "rotate-180"
                    }`}
                  />
                </div>
              </button>

              {isBillS211 && (
                <>
                  <div className="bg-white px-2 ml-4 3xl:ml-8 mt-2 border-l-2 border-gray-300">
                    <div>
                      <p
                        className={`flex  text-start  px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                          activeTab === "Identifying Information"
                            ? "text-blue-400"
                            : "bg-transparent text-[#727272]"
                        }`}
                        onClick={() => {
                          handleTabClick("Identifying Information");
                          toggleSidebar(); // Call the sidebar close function
                        }}
                    
                      >
                        Identifying Information
                      </p>
                    </div>

                    <div>
                      <p
                        className={`flex  text-start  px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                          activeTab === "Annual report"
                            ? "text-blue-400"
                            : "bg-transparent text-[#727272]"
                        }`}
                        onClick={() => {
                          handleTabClick("Annual report");
                          toggleSidebar(); // Call the sidebar close function
                        }}
                    
                      >
                        Annual report
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div></div>
          )}

          <div>
            <button
              className={`flex  pl-2 py-2 mb-2 focus:outline-none w-full ${
                activeTab === "Management of Material topic OHS" ||
                activeTab === "OHS Management" ||
                activeTab === "Risk Assessment" ||
                activeTab === "OHS Sevices" ||
                activeTab === "Worker Involvement in OHS" ||
                activeTab === "OHS Training" ||
                activeTab === "Promotion of Health" ||
                activeTab === "Prevention of OHS Impact" ||
                activeTab === "OHS Management System Coverage" ||
                activeTab === " Health Risk Addressed" ||
                activeTab === "Injuries" ||
                activeTab === "Ill-health" ||
                activeTab === "Hazard Reporting" ||
                activeTab === "Workers Right" ||
                activeTab === "Hazard Injuries" ||
                activeTab === "Hazards - Ill-health"
                  ? "text-blue-400"
                  : "bg-transparent text-[#727272]"
              }`}
              onClick={toggleWasteVisible}
            >
              <div className="w-[20%]">
                <MdOutlineGroups2 className="w-5 h-5 mr-2 mt-1" />
              </div>
              <div className="w-[50%] text-left ">
                <span className="indent-0 text-[13px]">
                  Occupational health and safety
                </span>
              </div>
              {materialityEnvData &&
              materialityEnvData.SocHealthSafety?.is_material_topic ? (
                <div className="w-[20%] ml-5">
                  <span className="text-[#007EEF] text-[10px] bg-[#0057a51a] py-[4px] px-[6px] rounded-md">
                    M
                  </span>
                </div>
              ) : (
                <span className="w-[20%]"></span>
              )}

              <div className="inset-y-0  flex items-center pointer-events-none w-[20%] justify-end">
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
                  {materialityEnvData &&
                  materialityEnvData.SocHealthSafety?.is_material_topic ? (
                    <div>
                      <div>
                        <p className="text-[12px]  ml-4  text-gray-400">
                          Mandatory Management Disclosure
                        </p>
                      </div>
                      <div>
                        <p
                          className={`flex  text-start ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                            activeTab === "Management of Material topic OHS"
                              ? "text-blue-400"
                              : "bg-transparent text-[#727272]"
                          }`}
                          onClick={() => {
                            handleTabClick("Management of Material topic OHS");
                            toggleSidebar(); // Call the sidebar close function
                          }}
                     
                        >
                          Management of Material topic
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div></div>
                  )}

                  <div>
                    <p className="text-[12px]  ml-4  text-gray-400">
                      Topic Management Disclosure
                    </p>
                  </div>
                  <div>
                    <p
                      className={`flex  text-start ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                        activeTab === "OHS Management"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272] "
                      }`}
                      onClick={() => {
                        handleTabClick("OHS Management");
                        toggleSidebar(); // Call the sidebar close function
                      }}
                   
                    >
                      OHS Management
                    </p>
                  </div>
                  <div>
                    <p
                      className={`flex  text-start ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                        activeTab === "Risk Assessment"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272] "
                      }`}
                      onClick={() => {
                        toggleSidebar();
                        handleTabClick("Risk Assessment")
                      }}
                    >
                      Risk Assessment
                    </p>
                  </div>
                  <div>
                    <p
                      className={`flex  text-start ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                        activeTab === "Hazard Reporting"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272] "
                      }`}
                      onClick={() => {
                        toggleSidebar();
                        handleTabClick("Hazard Reporting")
                      }}
                    
                    >
                      Hazard Reporting
                    </p>
                  </div>
                  <div>
                    <p
                      className={`flex  text-start ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                        activeTab === "Workers Right"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272] "
                      }`}
                      onClick={() => {
                        toggleSidebar();
                        handleTabClick("Workers Right")
                      }}
                     
                    >
                      Workers Right
                    </p>
                  </div>
                  <div>
                    <p
                      className={`flex  text-start ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                        activeTab === "OHS Sevices"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272] "
                      }`}
                      onClick={() => {
                        toggleSidebar();
                        handleTabClick("OHS Sevices")
                      }}
                      
                    >
                      OHS Sevices
                    </p>
                  </div>
                  <div>
                    <p
                      className={`flex  text-start ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                        activeTab === "Worker Involvement in OHS"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272] "
                      }`}
                      onClick={() => {
                        toggleSidebar();
                        handleTabClick("Worker Involvement in OHS")
                      }}
                  
                    >
                      Worker Involvement in OHS
                    </p>
                  </div>
                  <div>
                    <p
                      className={`flex  text-start ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                        activeTab === "OHS Training"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272] "
                      }`}
                      onClick={() => {
                        toggleSidebar();
                        handleTabClick("OHS Training")
                      }}
                 
                    >
                      OHS Training
                    </p>
                  </div>
                  <div>
                    <p
                      className={`flex  text-start ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                        activeTab === "Promotion of Health"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272] "
                      }`}
                      onClick={() => {
                        toggleSidebar();
                        handleTabClick("Promotion of Health")
                      }}
                  
                    >
                      Promotion of Health
                    </p>
                  </div>
                  <div>
                    <p
                      className={`flex  text-start ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                        activeTab === "Health Risk Addressed"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272] "
                      }`}
                      onClick={() => {
                        toggleSidebar();
                        handleTabClick("Health Risk Addressed")
                      }}
              
                    >
                      Health Risk Addressed
                    </p>
                  </div>
                  <div>
                    <p
                      className={`flex  text-start ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                        activeTab === "Prevention of OHS Impact"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272] "
                      }`}
                      onClick={() => {
                        toggleSidebar();
                        handleTabClick("Prevention of OHS Impact")
                      }}
                
                    >
                      Prevention of OHS Impact
                    </p>
                  </div>

                  <div>
                    <p className="text-[12px]  ml-4  text-gray-400">
                      Topic disclosure
                    </p>
                  </div>
                  <div>
                    <p
                      className={`flex  text-start ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                        activeTab === "OHS Management System Coverage"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272] "
                      }`}
                      onClick={() => {
                        toggleSidebar();
                        handleTabClick("OHS Management System Coverage")
                      }}
                   
                    >
                      OHS Management System Coverage
                    </p>
                  </div>
                  <div>
                    <p
                      className={`flex  text-start ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                        activeTab === "Injuries"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272] "
                      }`}
                      onClick={() => {
                        toggleSidebar();
                        handleTabClick("Injuries")
                      }}
                    
                    >
                      Injuries
                    </p>
                  </div>
                  <div>
                    <p
                      className={`flex  text-start ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                        activeTab === "Hazard Injuries"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272] "
                      }`}
                      onClick={() => {
                        toggleSidebar();
                        handleTabClick("Hazard Injuries")
                      }}
                    
                    >
                      Injuries-Hazards
                    </p>
                  </div>

                  <div>
                    <p
                      className={`flex  text-start ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                        activeTab === "Ill-health"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272] "
                      }`}
                      onClick={() => {
                        toggleSidebar();
                        handleTabClick("Ill-health")
                      }}
                   
                    >
                      Ill-health
                    </p>
                  </div>
                  <div>
                    <p
                      className={`flex  text-start ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                        activeTab === "Hazards - Ill-health"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272] "
                      }`}
                      onClick={() => {
                        toggleSidebar();
                        handleTabClick("Hazards - Ill-health")
                      }}
                    
                    >
                      Ill-health-Hazards
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
          <div>
            <button
              className={`flex  pl-2 py-2 mb-2 focus:outline-none w-full
              ${
                activeTab === "Community Engagement" ||
                activeTab === "Impact on Community" ||
                activeTab === "Indigenous People" ||
                activeTab === "Security Personnel" ||
                activeTab === "Security Personnel2" ||
                activeTab === "Management of Material topic Human Rights"
                  ? "text-[#007EEF]"
                  : "bg-transparent text-[#727272] "
              }`}
              onClick={toggleLegal}
            >
              <div className="w-[20%]">
                <MdOutlineGroups2 className="w-5 h-5 mr-2 mt-1" />
              </div>
              <div className="w-[50%] text-left ">
                <span className="indent-0 text-[13px]">
                  Human Rights and Community Impact
                </span>
              </div>
              {materialityEnvData &&
              materialityEnvData.SocCommunityRelation?.is_material_topic ? (
                <div className="w-[20%] ml-5">
                  <span className="text-[#007EEF] text-[10px] bg-[#0057a51a] py-[4px] px-[6px] rounded-md">
                    M
                  </span>
                </div>
              ) : (
                <span className="w-[20%]"></span>
              )}

              <div className="inset-y-0  flex items-center pointer-events-none w-[20%] justify-end">
                {/* <span className="text-[#0057A5] text-[10px] bg-[#0057a51a] py-[4px] px-[6px] rounded-md">
                  M
                </span> */}
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
                  {materialityEnvData &&
                  materialityEnvData.SocCommunityRelation?.is_material_topic ? (
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
                            "Management of Material topic Human Rights"
                              ? "text-blue-400"
                              : "bg-transparent text-[#727272]"
                          }`}
                          onClick={() => {
                            handleTabClick(
                              "Management of Material topic Human Rights"
                            )
                            toggleSidebar(); // Call the sidebar close function
                          }}
                       
                        >
                          Management of Material topic
                        </p>
                      </div>
                    </div>
                  ) : (
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
                        activeTab === "Community Engagement"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272] "
                      }`}
                      onClick={() => {
                        toggleSidebar();
                        handleTabClick("Community Engagement")
                      }}
                   
                    >
                      Local Community Engagement
                    </p>
                  </div>
                  <div>
                    <p
                      className={`flex  text-start ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                        activeTab === "Impact on Community"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272] "
                      }`}
                      onClick={() => {
                        toggleSidebar();
                        handleTabClick("Impact on Community")
                      }}
                    
                    >
                      Impact on Community
                    </p>
                  </div>
                  <div>
                    <p
                      className={`flex  text-start ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                        activeTab === "Indigenous People"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272] "
                      }`}
                      onClick={() => {
                        toggleSidebar();
                        handleTabClick("Indigenous People")
                      }}
                  
                    >
                      Indigenous People
                    </p>
                  </div>
                  <div>
                    <p
                      className={`flex  text-start ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                        activeTab === "Security Personnel"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272] "
                      }`}
                      onClick={() => {
                        toggleSidebar();
                        handleTabClick("Security Personnel")
                      }}
                    
                    >
                      Security Personnel
                    </p>
                  </div>
                  <div>
                    <p
                      className={`flex  text-start ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                        activeTab === "Security Personnel2"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272] "
                      }`}
                      onClick={() => {
                        toggleSidebar();
                        handleTabClick("Security Personnel2")
                      }}
                 
                    >
                      Training requirements apply to third party organisations
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
          <div>
            <button
              className={`flex  pl-2 py-2 mb-2 focus:outline-none w-full ${
                activeTab === "Notice Period" ||
                activeTab === "Collective Bargaining" ||
                activeTab === "Management of Material topic Labor Management"
                  ? "text-[#007EEF]"
                  : "bg-white text-[#727272] "
              }`}
              onClick={toggleEnergySectionVisibility}
            >
              <div className="w-[20%]">
                <MdOutlineGroups2 className="w-5 h-5 mr-2 mt-1" />
              </div>
              <div className="w-[50%] text-left ">
                <span className="indent-0 text-[13px]">Labor Management</span>
              </div>
              {materialityEnvData &&
              materialityEnvData.SocLabourManagement?.is_material_topic ? (
                <div className="w-[20%] ml-5">
                  <span className="text-[#007EEF] text-[10px] bg-[#0057a51a] py-[4px] px-[6px] rounded-md">
                    M
                  </span>
                </div>
              ) : (
                <span className="w-[20%]"></span>
              )}

              <div className="inset-y-0  flex items-center pointer-events-none w-[20%] justify-end">
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
                  {materialityEnvData &&
                  materialityEnvData.SocLabourManagement?.is_material_topic ? (
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
                            "Management of Material topic Labor Management"
                              ? "text-blue-400"
                              : "bg-transparent text-[#727272]"
                          }`}
                          onClick={() => {
                            toggleSidebar();
                            handleTabClick(
                              "Management of Material topic Labor Management"
                            )
                          }}
                     
                        >
                          Management of Material topic
                        </p>
                      </div>
                    </div>
                  ) : (
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
                        activeTab === "Notice Period"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272]"
                      }`}
                      onClick={() => {
                        toggleSidebar();
                        handleTabClick("Notice Period")
                      }}
                
                    >
                      Notice Period
                    </p>
                  </div>
                  <div>
                    <p
                      className={`flex  text-start ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                        activeTab === "Collective Bargaining"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272] "
                      }`}
                      onClick={() => {
                        toggleSidebar();
                        handleTabClick("Collective Bargaining")
                      }}
                   
                    >
                      Collective Bargaining
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
          <div>
            <button
              className={`flex  pl-2 py-2 mb-2 focus:outline-none w-full
              ${
                activeTab === "Child Labour" ||
                activeTab === "Forced or Compulsory Labour" ||
                activeTab === "Management of Material topic Labour"
                  ? "text-[#007EEF]"
                  : "bg-transparent text-[#727272] "
              }`}
              onClick={toggleTax}
            >
              <div className="w-[20%]">
                <MdOutlineGroups2 className="w-5 h-5 mr-2 mt-1" />
              </div>
              <div className="w-[50%] text-left ">
                <span className="indent-0 text-[13px]">
                  Child and Forced Labour
                </span>
              </div>
              {materialityEnvData &&
              materialityEnvData.SocChildLabour?.is_material_topic ? (
                <div className="w-[20%] ml-5">
                  <span className="text-[#007EEF] text-[10px] bg-[#0057a51a] py-[4px] px-[6px] rounded-md">
                    M
                  </span>
                </div>
              ) : (
                <span className="w-[20%]"></span>
              )}

              <div className="inset-y-0  flex items-center pointer-events-none w-[20%] justify-end">
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

            {isTax && (
              <>
                <div className="bg-white px-2 ml-4 3xl:ml-8 mt-2 border-l-2 border-gray-300">
                  {materialityEnvData &&
                  materialityEnvData.SocChildLabour?.is_material_topic ? (
                    <div>
                      <div>
                        <p className="text-[12px]  ml-4  text-gray-400">
                          Mandatory Management Disclosure
                        </p>
                      </div>
                      <div>
                        <p
                          className={`flex  text-start ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                            activeTab === "Management of Material topic Labour"
                              ? "text-blue-400"
                              : "bg-transparent text-[#727272]"
                          }`}
                          onClick={() => {
                            toggleSidebar();
                            handleTabClick(
                              "Management of Material topic Labour"
                            )
                          }}
                          
                        >
                          Management of Material topic
                        </p>
                      </div>
                    </div>
                  ) : (
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
                        activeTab === "Child Labour"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272] "
                      }`}
                      onClick={() => {
                        toggleSidebar();
                        handleTabClick("Child Labour")
                      }}
                     
                    >
                      Child Labour
                    </p>
                  </div>
                  <div>
                    <p
                      className={`flex  text-start ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                        activeTab === "Forced or Compulsory Labour"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272] "
                      }`}
                      onClick={() => {
                        toggleSidebar();
                        handleTabClick("Forced or Compulsory Labour")
                      }}
                  
                    >
                      Forced or Compulsory Labour
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
          <div>
            <button
              className={`flex  pl-2 py-2 mb-2 focus:outline-none w-full ${
                activeTab === "Employee Hires & Turnover" ||
                activeTab === "Benefits" ||
                activeTab === "Parental Leave" ||
                activeTab === "Diversity of Employees" ||
                activeTab === "Retirement Benefits" ||
                activeTab === "Management of Material topic Employment"
                  ? "text-[#007EEF]"
                  : "bg-white text-[#727272] "
              }`}
              onClick={toggleEmission}
            >
              <div className="w-[20%]">
                <MdOutlineGroups2 className="w-5 h-5 mr-2" />
              </div>
              <div className="w-[50%] text-left ">
                <span className="indent-0 text-[13px]">Employment</span>
              </div>
              {materialityEnvData &&
              materialityEnvData.SocEmployment?.is_material_topic ? (
                <div className="w-[20%] ml-5">
                  <span className="text-[#007EEF] text-[10px] bg-[#0057a51a] py-[4px] px-[6px] rounded-md">
                    M
                  </span>
                </div>
              ) : (
                <span className="w-[20%]"></span>
              )}

              <div className="inset-y-0  flex items-center pointer-events-none w-[20%] justify-end">
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
                  {materialityEnvData &&
                  materialityEnvData.SocEmployment?.is_material_topic ? (
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
                            "Management of Material topic Employment"
                              ? "text-blue-400"
                              : "bg-transparent text-[#727272]"
                          }`}
                          onClick={() => {
                            toggleSidebar();
                            handleTabClick(
                              "Management of Material topic Employment"
                            )
                          }}
                   
                        >
                          Management of Material topic
                        </p>
                      </div>
                    </div>
                  ) : (
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
                        activeTab === "Employee Hires & Turnover"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272]"
                      }`}
                      onClick={() => {
                        toggleSidebar();
                        handleTabClick("Employee Hires & Turnover")
                      }}
                 
                    >
                      Employee Hires & Turnover
                    </p>
                  </div>
                  <div>
                    <p
                      className={`flex  text-start ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                        activeTab === "Benefits"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272]"
                      }`}
                      onClick={() => {
                        toggleSidebar();
                        handleTabClick("Benefits")
                      }}
               
                    >
                      Benefits
                    </p>
                  </div>
                  <div>
                    <p
                      className={`flex  text-start ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                        activeTab === "Parental Leave"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272]"
                      }`}
                      onClick={() => {
                        toggleSidebar();
                        handleTabClick("Parental Leave")
                      }}
                     
                    >
                      Parental Leave
                    </p>
                  </div>
                  <div>
                    <p
                      className={`flex  text-start ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                        activeTab === "Retirement Benefits"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272]"
                      }`}
                      onClick={() => {
                        toggleSidebar();
                        handleTabClick("Retirement Benefits")
                      }}
                     
                    >
                      Retirement Benefits
                    </p>
                  </div>
                  <div>
                    <p
                      className={`flex  text-start ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                        activeTab === "Diversity of Employees"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272] "
                      }`}
                      onClick={() => {
                        toggleSidebar();
                        handleTabClick("Diversity of Employees")
                      }}
                      
                    >
                      Diversity of Employees
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Energy start  */}

          {/* waste start  */}

          {/* Materials start  */}

          <div>
            <button
              className={`flex  pl-2 py-2 mb-2 focus:outline-none w-full
              ${
                activeTab === "Training hours" ||
                activeTab === "Skill Upgrade" ||
                activeTab === "Performance & Career Development" ||
                activeTab ===
                  "Management of Material topic Training and Development"
                  ? "text-[#007EEF]"
                  : "bg-transparent text-[#727272] "
              }`}
              onClick={toggleMaterialsVisible}
            >
              <div className="w-[20%]">
                <MdOutlineGroups2 className="w-5 h-5 mr-2 mt-1" />
              </div>
              <div className="w-[50%] text-left ">
                <span className="indent-0 text-[13px]">
                  Training and Development
                </span>
              </div>
              {materialityEnvData &&
              materialityEnvData.SocHumanCapitalDevelopment
                ?.is_material_topic ? (
                <div className="w-[20%] ml-5">
                  <span className="text-[#007EEF] text-[10px] bg-[#0057a51a] py-[4px] px-[6px] rounded-md">
                    M
                  </span>
                </div>
              ) : (
                <span className="w-[20%]"></span>
              )}

              <div className="inset-y-0  flex items-center pointer-events-none w-[20%] justify-end">
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
                  {materialityEnvData &&
                  materialityEnvData.SocHumanCapitalDevelopment
                    ?.is_material_topic ? (
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
                            "Management of Material topic Training and Development"
                              ? "text-blue-400"
                              : "bg-transparent text-[#727272]"
                          }`}
                          onClick={() => {
                            toggleSidebar();
                            handleTabClick(
                              "Management of Material topic Training and Development"
                            )
                          }}
                      
                        >
                          Management of Material topic
                        </p>
                      </div>
                    </div>
                  ) : (
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
                        activeTab === "Training hours"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272] "
                      }`}
                      onClick={() => {
                        toggleSidebar();
                        handleTabClick("Training hours")
                      }}
                    
                    >
                      Training hours
                    </p>
                  </div>
                  <div>
                    <p
                      className={`flex  text-start ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                        activeTab === "Skill Upgrade"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272] "
                      }`}
                      onClick={() => {
                        toggleSidebar();
                        handleTabClick("Skill Upgrade")
                      }}
                    
                    >
                      Employee Skill Development
                    </p>
                  </div>
                  <div>
                    <p
                      className={`flex  text-start ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                        activeTab === "Performance & Career Development"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272] "
                      }`}
                      onClick={() => {
                        toggleSidebar();
                        handleTabClick("Performance & Career Development")
                      }}
                  
                    >
                      Employee Performance and Career Development
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
          <div>
            <button
              className={`flex  pl-2 py-2 mb-2 focus:outline-none w-full
              ${
                activeTab === "Customer Privacy" ||
                activeTab === "Statement of Fact" ||
                activeTab === "Management of Material topic Privacy"
                  ? "text-[#007EEF]"
                  : "bg-transparent text-[#727272] "
              }`}
              onClick={togglePrivacy}
            >
              <div className="w-[20%]">
                <MdOutlineGroups2 className="w-5 h-5 mr-2 mt-1" />
              </div>
              <div className="w-[50%] text-left ">
                <span className="indent-0 text-[13px]">
                  Customer Privacy & Data Security
                </span>
              </div>
              {materialityEnvData &&
              materialityEnvData.SocPrivacyDataSecurity?.is_material_topic ? (
                <div className="w-[20%] ml-5">
                  <span className="text-[#007EEF] text-[10px] bg-[#0057a51a] py-[4px] px-[6px] rounded-md">
                    M
                  </span>
                </div>
              ) : (
                <span className="w-[20%]"></span>
              )}

              <div className="inset-y-0  flex items-center pointer-events-none w-[20%] justify-end">
                {/* <span className="text-[#0057A5] text-[10px] bg-[#0057a51a] py-[4px] px-[6px] rounded-md">
                  M
                </span> */}
                <MdKeyboardArrowDown
                  className={`text-lg text-neutral-500 ${
                    Privacy && "rotate-180"
                  }`}
                />
              </div>
            </button>

            {Privacy && (
              <>
                <div className="bg-white px-2 ml-4 3xl:ml-8 mt-2 border-l-2 border-gray-300">
                  {materialityEnvData &&
                  materialityEnvData.SocPrivacyDataSecurity
                    ?.is_material_topic ? (
                    <div>
                      <div>
                        <p className="text-[12px]  ml-4  text-gray-400">
                          Mandatory Management Disclosure
                        </p>
                      </div>
                      <div>
                        <p
                          className={`flex  text-start ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                            activeTab === "Management of Material topic Privacy"
                              ? "text-blue-400"
                              : "bg-transparent text-[#727272]"
                          }`}
                          onClick={() => {
                            toggleSidebar();
                            handleTabClick(
                              "Management of Material topic Privacy"
                            )
                          }}
                       
                        >
                          Management of Material topic
                        </p>
                      </div>
                    </div>
                  ) : (
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
                        activeTab === "Customer Privacy"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272] "
                      }`}
                      onClick={() => {
                        toggleSidebar();
                        handleTabClick("Customer Privacy")
                      }}
               
                    >
                      Customer Privacy
                    </p>
                  </div>
                  <div>
                    <p
                      className={`flex  text-start ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                        activeTab === "Statement of Fact"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272] "
                      }`}
                      onClick={() => {
                        toggleSidebar();
                        handleTabClick("Statement of Fact")
                      }}
                    
                    >
                      Statement of Fact
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
          <div>
            <button
              className={`flex  pl-2 py-2 mb-2 focus:outline-none w-full
              ${
                activeTab === "Product/Service Safety" ||
                activeTab === "Compliance" ||
                activeTab === "Management of Material topic Safety"
                  ? "text-[#007EEF]"
                  : "bg-transparent text-[#727272] "
              }`}
              onClick={toggleSafety}
            >
              <div className="w-[20%]">
                <MdOutlineGroups2 className="w-5 h-5 mr-2 mt-1" />
              </div>
              <div className="w-[50%] text-left ">
                <span className="indent-0 text-[13px]">
                  Product Safety & Quality
                </span>
              </div>
              {materialityEnvData &&
              materialityEnvData.SocProductSafetyQuality?.is_material_topic ? (
                <div className="w-[20%] ml-5">
                  <span className="text-[#007EEF] text-[10px] bg-[#0057a51a] py-[4px] px-[6px] rounded-md">
                    M
                  </span>
                </div>
              ) : (
                <span className="w-[20%]"></span>
              )}

              <div className="inset-y-0  flex items-center pointer-events-none w-[20%] justify-end">
                {/* <span className="text-[#0057A5] text-[10px] bg-[#0057a51a] py-[4px] px-[6px] rounded-md">
                  M
                </span> */}
                <MdKeyboardArrowDown
                  className={`text-lg text-neutral-500 ${
                    Safety && "rotate-180"
                  }`}
                />
              </div>
            </button>

            {Safety && (
              <>
                <div className="bg-white px-2 ml-4 3xl:ml-8 mt-2 border-l-2 border-gray-300">
                  {materialityEnvData &&
                  materialityEnvData.SocProductSafetyQuality
                    ?.is_material_topic ? (
                    <div>
                      <div>
                        <p className="text-[12px]  ml-4  text-gray-400">
                          Mandatory Management Disclosure
                        </p>
                      </div>
                      <div>
                        <p
                          className={`flex  text-start ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                            activeTab === "Management of Material topic Safety"
                              ? "text-blue-400"
                              : "bg-transparent text-[#727272]"
                          }`}
                          onClick={() => {
                            toggleSidebar();
                            handleTabClick(
                              "Management of Material topic Safety"
                            )
                          }}
                      
                        >
                          Management of Material topic
                        </p>
                      </div>
                    </div>
                  ) : (
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
                        activeTab === "Product/Service Safety"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272] "
                      }`}
                      onClick={() => {
                        toggleSidebar();
                        handleTabClick("Product/Service Safety")
                      }}
                   
                    >
                      Product and Service Safety
                    </p>
                  </div>

                  <div>
                    <p
                      className={`flex  text-start ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                        activeTab === "Compliance"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272] "
                      }`}
                      onClick={() => {
                        toggleSidebar();
                        handleTabClick("Compliance")
                      }}
                   
                    >
                      Compliance
                    </p>
                  </div>
                  <div>
                    <p
                      className={`flex  text-start ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                        activeTab === "Products & Service"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272] "
                      }`}
                      onClick={() => {
                        toggleSidebar();
                        handleTabClick("Products & Service")
                      }}
               
                    >
                      Products & Services- Statement of Non Compliance
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
          <div>
            <button
              className={`flex  pl-2 py-2 mb-2 focus:outline-none w-full
              ${
                activeTab === "Product/Service labelling" ||
                activeTab ===
                  "Product/Service Categories Assessed for Compliance" ||
                activeTab === "Non compliance incidents- Labelling" ||
                activeTab === "Statement of non compliance - Labeling" ||
                activeTab === "Non compliance incidents - Marketing" ||
                activeTab === "Statement of non compliance - Marketing" ||
                activeTab === "Management of Material topic Marketing"
                  ? "text-[#007EEF]"
                  : "bg-transparent text-[#727272] "
              }`}
              onClick={toggleMarketing}
            >
              <div className="w-[20%]">
                <MdOutlineGroups2 className="w-5 h-5 mr-2 mt-1" />
              </div>
              <div className="w-[50%] text-left ">
                <span className="indent-0 text-[13px]">
                  Marketing and Labeling
                </span>
              </div>
              {materialityEnvData &&
              materialityEnvData.SocMarketingLabeling?.is_material_topic ? (
                <div className="w-[20%] ml-5">
                  <span className="text-[#007EEF] text-[10px] bg-[#0057a51a] py-[4px] px-[6px] rounded-md">
                    M
                  </span>
                </div>
              ) : (
                <span className="w-[20%]"></span>
              )}

              <div className="inset-y-0  flex items-center pointer-events-none w-[20%] justify-end">
                {/* <span className="text-[#0057A5] text-[10px] bg-[#0057a51a] py-[4px] px-[6px] rounded-md">
                  M
                </span> */}
                <MdKeyboardArrowDown
                  className={`text-lg text-neutral-500 ${
                    Marketing && "rotate-180"
                  }`}
                />
              </div>
            </button>

            {Marketing && (
              <>
                <div className="bg-white px-2 ml-4 3xl:ml-8 mt-2 border-l-2 border-gray-300">
                  {materialityEnvData &&
                  materialityEnvData.SocMarketingLabeling?.is_material_topic ? (
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
                            "Management of Material topic Marketing"
                              ? "text-blue-400"
                              : "bg-transparent text-[#727272]"
                          }`}
                          onClick={() => {
                            toggleSidebar();
                            handleTabClick(
                              "Management of Material topic Marketing"
                            )
                          }}
                     
                        >
                          Management of Material topic
                        </p>
                      </div>
                    </div>
                  ) : (
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
                        activeTab === "Product/Service labelling"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272] "
                      }`}
                      onClick={() => {
                        toggleSidebar();
                        handleTabClick("Product/Service labelling")
                      }}
                
                    >
                      Product/Service labelling
                    </p>
                  </div>
                  <div>
                    <p
                      className={`flex  text-start ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                        activeTab ===
                        "Product/Service Categories Assessed for Compliance"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272] "
                      }`}
                      onClick={() => {
                        toggleSidebar();
                        handleTabClick(
                          "Product/Service Categories Assessed for Compliance"
                        )
                      }}
                  
                    >
                      Product/Service Categories Assessed for Compliance
                    </p>
                  </div>
                  <div>
                    <p
                      className={`flex  text-start ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                        activeTab === "Non compliance incidents- Labelling"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272] "
                      }`}
                      onClick={() => {
                        toggleSidebar();
                        handleTabClick("Non compliance incidents- Labelling")
                      }}
                 
                    >
                      Labelling - Non Compliance Incidents
                    </p>
                  </div>
                  <div>
                    <p
                      className={`flex  text-start ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                        activeTab === "Statement of non compliance - Labeling"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272] "
                      }`}
                      onClick={() => {
                        toggleSidebar();
                        handleTabClick("Statement of non compliance - Labeling")
                      }}
                 
                    >
                      Labeling - Statement of Non Compliance
                    </p>
                  </div>
                  <div>
                    <p
                      className={`flex  text-start ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                        activeTab === "Non compliance incidents - Marketing"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272] "
                      }`}
                      onClick={() => {
                        toggleSidebar();
                        handleTabClick("Non compliance incidents - Marketing")
                      }}
                  
                    >
                      Marketing - Non Compliance Incidents
                    </p>
                  </div>
                  <div>
                    <p
                      className={`flex  text-start ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                        activeTab === "Statement of non compliance - Marketing"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272] "
                      }`}
                      onClick={() => {
                        toggleSidebar();
                        handleTabClick(
                          "Statement of non compliance - Marketing"
                        )
                      }}
                   
                    >
                      Marketing - Statement of Non Compliance
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
          <div>
            <button
              className={`flex  pl-2 py-2 mb-2 focus:outline-none w-full
              ${
                activeTab === "Suppliers Screened" ||
                activeTab === "Impacts & Actions Taken" ||
                activeTab === "Procurement Practices" ||
                activeTab === "Management of Material topic Supply"
                  ? "text-[#007EEF]"
                  : "bg-transparent text-[#727272] "
              }`}
              onClick={toggleSupplyChain}
            >
              <div className="w-[20%]">
                <MdOutlineGroups2 className="w-5 h-5 mr-2 mt-1" />
              </div>
              <div className="w-[50%] text-left ">
                <span className="indent-0 text-[13px]">
                  Supply Chain Labor Standards
                </span>
              </div>
              {materialityEnvData &&
              materialityEnvData.SocSupplyChainLabour?.is_material_topic ? (
                <div className="w-[20%] ml-5">
                  <span className="text-[#007EEF] text-[10px] bg-[#0057a51a] py-[4px] px-[6px] rounded-md">
                    M
                  </span>
                </div>
              ) : (
                <span className="w-[20%]"></span>
              )}

              <div className="inset-y-0  flex items-center pointer-events-none w-[20%] justify-end">
                {/* <span className="text-[#0057A5] text-[10px] bg-[#0057a51a] py-[4px] px-[6px] rounded-md">
                  M
                </span> */}
                <MdKeyboardArrowDown
                  className={`text-lg text-neutral-500 ${
                    SupplyChain && "rotate-180"
                  }`}
                />
              </div>
            </button>

            {SupplyChain && (
              <>
                <div className="bg-white px-2 ml-4 3xl:ml-8 mt-2 border-l-2 border-gray-300">
                  {materialityEnvData &&
                  materialityEnvData.SocSupplyChainLabour?.is_material_topic ? (
                    <div>
                      <div>
                        <p className="text-[12px]  ml-4  text-gray-400">
                          Mandatory Management Disclosure
                        </p>
                      </div>
                      <div>
                        <p
                          className={`flex  text-start ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                            activeTab === "Management of Material topic Supply"
                              ? "text-blue-400"
                              : "bg-transparent text-[#727272]"
                          }`}
                          onClick={() => {
                            toggleSidebar();
                            handleTabClick(
                              "Management of Material topic Supply"
                            )
                          }}
                       
                        >
                          Management of Material topic
                        </p>
                      </div>
                    </div>
                  ) : (
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
                        activeTab === "Suppliers Screened"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272] "
                      }`}
                      onClick={() => {
                        toggleSidebar();
                        handleTabClick("Suppliers Screened")
                      }}
                     
                    >
                      Suppliers Screened
                    </p>
                  </div>
                  <div>
                    <p
                      className={`flex  text-start ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                        activeTab === "Impacts & Actions Taken"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272] "
                      }`}
                      onClick={() => {
                        toggleSidebar();
                        handleTabClick("Impacts & Actions Taken")
                      }}
                
                    >
                      Negative Social Impacts and Action Taken
                    </p>
                  </div>
                  <div>
                    <p
                      className={`flex  text-start ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                        activeTab === "Procurement Practices"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272] "
                      }`}
                      onClick={() => {
                        toggleSidebar();
                        handleTabClick("Procurement Practices")
                      }}
                 
                    >
                      Local Suppliers
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
          <div>
            <button
              className={`flex  pl-2 py-2 mb-2 focus:outline-none w-full
              ${
                activeTab === "Diversity of the Board" ||
                activeTab === "Salary Ratio" ||
                activeTab === "Entry Level Wage" ||
                activeTab ===
                  "Management of Material topic Diversity & Equal Opportunity"
                  ? "text-[#007EEF]"
                  : "bg-transparent text-[#727272] "
              }`}
              onClick={toggleWaterVisible}
            >
              <div className="w-[20%]">
                <MdOutlineGroups2 className="w-5 h-5 mr-2 mt-1" />
              </div>
              <div className="w-[50%] text-left ">
                <span className="indent-0 text-[13px]">
                  Diversity & Equal Opportunity
                </span>
              </div>
              {materialityEnvData &&
              materialityEnvData.SocDiversityEqualOpp?.is_material_topic ? (
                <div className="w-[20%] ml-5">
                  <span className="text-[#007EEF] text-[10px] bg-[#0057a51a] py-[4px] px-[6px] rounded-md">
                    M
                  </span>
                </div>
              ) : (
                <span className="w-[20%]"></span>
              )}

              <div className="inset-y-0  flex items-center pointer-events-none w-[20%] justify-end">
                {/* <span className="text-[#0057A5] text-[10px] bg-[#0057a51a] py-[4px] px-[6px] rounded-md">
                  M
                </span> */}
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
                  {materialityEnvData &&
                  materialityEnvData.SocDiversityEqualOpp?.is_material_topic ? (
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
                            "Management of Material topic Diversity & Equal Opportunity"
                              ? "text-blue-400"
                              : "bg-transparent text-[#727272]"
                          }`}
                          onClick={() => {
                            toggleSidebar();
                            handleTabClick(
                              "Management of Material topic Diversity & Equal Opportunity"
                            )
                          }}
                    
                        >
                          Management of Material topic
                        </p>
                      </div>
                    </div>
                  ) : (
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
                        activeTab === "Diversity of the Board"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272] "
                      }`}
                      onClick={() => {
                        toggleSidebar();
                        handleTabClick("Diversity of the Board")
                      }}
            
                    >
                      Diversity of the Board
                    </p>
                  </div>

                  <div>
                    <p
                      className={`flex  text-start ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                        activeTab === "Salary Ratio"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272] "
                      }`}
                      onClick={() => {
                        toggleSidebar();
                        handleTabClick("Salary Ratio")
                      }}
                     
                    >
                      Salary Ratio
                    </p>
                  </div>
                  <div>
                    <p
                      className={`flex  text-start ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                        activeTab === "Entry Level Wage"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272] "
                      }`}
                      onClick={() => {
                        toggleSidebar();
                        handleTabClick("Entry Level Wage")
                      }}
                    
                    >
                      Entry Level Wage
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
          <div>
            <button
              className={`flex  pl-2 py-2 mb-2 focus:outline-none w-full
              ${
                activeTab === "Incidents of Discrimination" ||
                activeTab === "Management of Material topic Non Discrimination"
                  ? "text-[#007EEF]"
                  : "bg-transparent text-[#727272] "
              }`}
              onClick={toggleSupplierSectionVisibility}
            >
              <div className="w-[20%]">
                <MdOutlineGroups2 className="w-5 h-5 mr-2 mt-1" />
              </div>
              <div className="w-[50%] text-left ">
                <span className="indent-0 text-[13px]">
                  Non - Discrimination
                </span>
              </div>
              {materialityEnvData &&
              materialityEnvData.SocNonDiscrimination?.is_material_topic ? (
                <div className="w-[20%] ml-5">
                  <span className="text-[#007EEF] text-[10px] bg-[#0057a51a] py-[4px] px-[6px] rounded-md">
                    M
                  </span>
                </div>
              ) : (
                <span className="w-[20%]"></span>
              )}

              <div className="inset-y-0  flex items-center pointer-events-none w-[20%] justify-end">
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

            {isSupplierVisible && (
              <>
                <div className="bg-white px-2 ml-4 3xl:ml-8 mt-2 border-l-2 border-gray-300">
                  {materialityEnvData &&
                  materialityEnvData.SocNonDiscrimination?.is_material_topic ? (
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
                            "Management of Material topic Non Discrimination"
                              ? "text-blue-400"
                              : "bg-transparent text-[#727272]"
                          }`}
                          onClick={() => {
                            toggleSidebar();
                            handleTabClick(
                              "Management of Material topic Non Discrimination"
                            )
                          }}
                    
                        >
                          Management of Material topic
                        </p>
                      </div>
                    </div>
                  ) : (
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
                        activeTab === "Incidents of Discrimination"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272] "
                      }`}
                      onClick={() => {
                        toggleSidebar();
                        handleTabClick("Incidents of Discrimination")
                      }}
                 
                    >
                      Incidents of Discrimination
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
