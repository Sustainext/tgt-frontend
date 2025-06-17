"use client";

import { useState, useEffect } from "react";
import { MdDiversity2, MdKeyboardArrowDown, MdClose} from "react-icons/md";

import { GiWoodPile } from "react-icons/gi";
import Cookies from "js-cookie";
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
    const [tcfd, setTcfd] = useState(false);
  const materialityEnvData =
    apiData && apiData.governance ? apiData.governance : {};
const frameworkId = Cookies.get("selected_framework_id");
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
  const toggleTcfd = () => {
    setTcfd(!tcfd);
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
    if (activeTab === "Org Details") {
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
      <div className="flex items-start py-4 min-h-[84vh] rounded-lg text-[0.875rem] overflow-x-hidden sm:w-[200px] md:w-[43%] lg:w-[200px] xl:w-[200px] 2xl:w-[200px] 3xl:w-[351px] scrollable-content">
        <div className="flex flex-col w-full font-medium">
          <button className="flex justify-between items-center px-4 py-2 -mt-4 mb-8 rounded-none focus:outline-none text-[#727272] font-bold">
            <div>
              {" "}
              <span className="text-[16px] font-extrabold">General</span>
            </div>

            <div className=" float-end block xl:hidden md:block lg:hidden 2xl:hidden 4k:hidden">
              <MdClose onClick={toggleSidebar} className="text-3xl" />
            </div>
          </button>
          {frameworkId === "6" && (
             <div>
            <button
              className={`flex  pl-2 py-2 mb-2 focus:outline-none w-full ${
                activeTab === "TCFD Disclosure Selection"
                  ? "text-[#007EEF]"
                  : "bg-white text-[#727272] "
              }`}
              onClick={toggleTcfd}
            >
              <div className="w-[20%]">
                <MdDiversity2 className="w-[16px] h-[16px] mr-2 mt-0.5" />
              </div>
              <div className="w-[50%] text-left flex items-center ">
                <span className="indent-0 text-[13px]">TCFD reporting Information</span>
              </div>

              <div className="inset-y-0  flex items-center pointer-events-none w-[15%] justify-end">
                <MdKeyboardArrowDown
                  className={`text-lg text-neutral-500 ${
                    tcfd && "rotate-180"
                  }`}
                />
              </div>
            </button>

            {/* Energy section content */}
            {tcfd && (
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
                        activeTab === "TCFD Disclosure Selection"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272]"
                      }`}
                      onClick={() => handleTabClick("TCFD Disclosure Selection")}
                    >
                      TCFD Disclosure Selection
                    </p>
                  </div>
           
             
                </div>
              </>
            )}
          </div>
          )}
          <div>
            <button
              className={`flex  pl-2 py-2 mb-2 focus:outline-none w-full ${
                activeTab === "Org Details" ||
                activeTab === "Entities" ||
                activeTab === "Report Details" || 
                activeTab === "Assurance" || 
                activeTab === "Restatement" 
                  ? "text-[#007EEF]"
                  : "bg-white text-[#727272] "
              }`}
              onClick={toggleEmission}
            >
              <div className="w-[20%]">
                <MdDiversity2 className="w-[16px] h-[16px] mr-2 mt-0.5" />
              </div>
              <div className="w-[50%] text-left flex items-center ">
                <span className="indent-0 text-[13px]">GRI Reporting info</span>
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
                        activeTab === "Org Details"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272]"
                      }`}
                      onClick={() => handleTabClick("Org Details")}
                    >
                      Org Details
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
                        activeTab === "Entities"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272]"
                      }`}
                      onClick={() => handleTabClick("Entities")}
                    >
                      Entities
                    </p>
                  </div>
                  <div>
                    <p
                      className={`flex  text-start ml-16 xl:ml-4 md:xl:ml-4 lg:ml-4 2xl:ml-4 4k:ml-4 2k:ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                        activeTab === "Report Details"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272]"
                      }`}
                      onClick={() => handleTabClick("Report Details")}
                    >
                      Report Details
                    </p>
                  </div>
                  <div>
                    <p
                      className={`flex  text-start ml-16 xl:ml-4 md:xl:ml-4 lg:ml-4 2xl:ml-4 4k:ml-4 2k:ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                        activeTab === "Restatement"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272]"
                      }`}
                      onClick={() => handleTabClick("Restatement")}
                    >
                      Restatement
                    </p>
                  </div>
                  <div>
                    <p
                      className={`flex  text-start ml-16 xl:ml-4 md:xl:ml-4 lg:ml-4 2xl:ml-4 4k:ml-4 2k:ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                        activeTab === "Assurance"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272]"
                      }`}
                      onClick={() => handleTabClick("Assurance")}
                    >
                      Assurance
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
                activeTab === "Business Details" ||
                activeTab === "Workforce-Employees" ||
                activeTab === "Workforce-Other Workers"
                  ? "text-[#007EEF]"
                  : "bg-white text-[#727272] "
              }`}
              onClick={toggleEnergySectionVisibility}
            >
              <div className="w-[20%]">
                <MdDiversity2 className="w-[16px] h-[16px] mr-2 mt-0.5" />
              </div>
              <div className="w-[50%] text-left ">
                <span className="indent-0 text-[13px]">
                Organization Details

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
                    <p className="text-[12px]  ml-16 xl:ml-4 md:xl:ml-4 lg:ml-4 2xl:ml-4 4k:ml-4 2k:ml-4  text-gray-400 ">
                      Topic disclosure
                    </p>
                  </div>
                  <div>
                    <p
                      className={`flex  text-start ml-16 xl:ml-4 md:xl:ml-4 lg:ml-4 2xl:ml-4 4k:ml-4 2k:ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                        activeTab === "Business Details"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272]"
                      }`}
                      onClick={() => handleTabClick("Business Details")}
                    >
                      Business Details
                    </p>
                  </div>
                  <div>
                    <p
                      className={`flex  text-start ml-16 xl:ml-4 md:xl:ml-4 lg:ml-4 2xl:ml-4 4k:ml-4 2k:ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                        activeTab === "Workforce-Employees"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272] "
                      }`}
                      onClick={() =>
                        handleTabClick("Workforce-Employees")
                      }
                    >
                      Workforce-Employees
                    </p>
                  </div>
                  <div>
                    <p
                      className={`flex  text-start ml-16 xl:ml-4 md:xl:ml-4 lg:ml-4 2xl:ml-4 4k:ml-4 2k:ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                        activeTab === "Workforce-Other Workers"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272] "
                      }`}
                      onClick={() => handleTabClick("Workforce-Other Workers")}
                    >
                      Workforce-Other Workers
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
                activeTab === "Laws and Regulation" 
                  ? "text-blue-400"
                  : "bg-transparent text-[#727272]"
              }`}
              onClick={toggleWasteVisible}
            >
              <div className="w-[20%]">
                <MdDiversity2 className="w-[16px] h-[16px] mr-2 mt-0.5" />
              </div>
              <div className="w-[50%] text-left ">
                <span className="indent-0 text-[13px]">Compliance
                </span>
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
                    <p className="text-[12px]  ml-16 xl:ml-4 md:xl:ml-4 lg:ml-4 2xl:ml-4 4k:ml-4 2k:ml-4  text-gray-400 ">
                      Topic disclosure
                    </p>
                  </div>

                  <div>
                    <p
                      className={`flex  text-start ml-16 xl:ml-4 md:xl:ml-4 lg:ml-4 2xl:ml-4 4k:ml-4 2k:ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                        activeTab === "Laws and Regulation"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272] "
                      }`}
                      onClick={() => handleTabClick("Laws and Regulation")}
                    >
                    Laws and Regulation
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
                activeTab === "Membership & Association"
                  ? "text-[#007EEF]"
                  : "bg-transparent text-[#727272] "
              }`}
              onClick={toggleMaterialsVisible}
            >
              <div className="w-[20%]">
                <MdDiversity2 className="w-[16px] h-[16px] mr-2 mt-0.5" />
              </div>
              <div className="w-[50%] text-left ">
                <span className="indent-0 text-[13px]">
                Membership & Association
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
                    <p className="text-[12px]  ml-16 xl:ml-4 md:xl:ml-4 lg:ml-4 2xl:ml-4 4k:ml-4 2k:ml-4  text-gray-400 ">
                      Topic disclosure
                    </p>
                  </div>

                  <div>
                    <p
                      className={`flex  text-start ml-16 xl:ml-4 md:xl:ml-4 lg:ml-4 2xl:ml-4 4k:ml-4 2k:ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                        activeTab === "Membership & Association"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272] "
                      }`}
                      onClick={() => handleTabClick("Membership & Association")}
                    >
                      Membership & Association
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
                activeTab === "Stakeholder Engagement"
                  ? "text-[#007EEF]"
                  : "bg-white text-[#727272] "
              }`}
              onClick={toggleSupplierSectionVisibility}
            >
              <div className="w-[20%]">
                <MdDiversity2 className="w-[16px] h-[16px] mr-2 mt-0.5" />
              </div>
              <div className="w-[50%] text-left ">
                <span className="indent-0 text-[13px]">
                Stakeholder Engagement
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
                    <p className="text-[12px]  ml-16 xl:ml-4 md:xl:ml-4 lg:ml-4 2xl:ml-4 4k:ml-4 2k:ml-4  text-gray-400 ">
                      Topic disclosure
                    </p>
                  </div>
                  <div>
                    <p
                      className={`flex  text-start ml-16 xl:ml-4 md:xl:ml-4 lg:ml-4 2xl:ml-4 4k:ml-4 2k:ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                        activeTab === "Stakeholder Engagement"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272]"
                      }`}
                      onClick={() => handleTabClick("Stakeholder Engagement")}
                    >
                     Stakeholder Engagement
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>

          <div>
            <button
              className={`flex  pl-2 py-2 mb-2 focus:outline-none w-full ${
                activeTab === "Collective Bargaining Agreements"
                  ? "text-[#007EEF]"
                  : "bg-white text-[#727272] "
              }`}
              onClick={toggleTax}
            >
              <div className="w-[20%]">
                <MdDiversity2 className="w-[16px] h-[16px] mr-2 mt-0.5" />
              </div>
              <div className="w-[50%] text-left ">
                <span className="indent-0 text-[13px]">Collective Bargaining Agreements</span>
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
                    <p className="text-[12px]  ml-16 xl:ml-4 md:xl:ml-4 lg:ml-4 2xl:ml-4 4k:ml-4 2k:ml-4  text-gray-400 ">
                      Topic disclosure
                    </p>
                  </div>
                  <div>
                    <p
                      className={`flex  text-start ml-16 xl:ml-4 md:xl:ml-4 lg:ml-4 2xl:ml-4 4k:ml-4 2k:ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                        activeTab === "Collective Bargaining Agreements"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272]"
                      }`}
                      onClick={() => handleTabClick("Collective Bargaining Agreements")}
                    >
                     Collective Bargaining Agreements
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
