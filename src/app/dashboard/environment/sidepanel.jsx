"use client";

import { useState } from "react";
import {
  MdOutlineWarehouse,
  MdOutlineFactory,
  MdOutlineDeleteOutline,
  MdOutlineTungsten,
  MdKeyboardArrowDown,
  MdOutlineWater,
  MdOutlineEmojiNature,
} from "react-icons/md";

import { GiWoodPile } from "react-icons/gi";

const Aside = ({ activeTab, handleTabClick }) => {
  const [isEnergySectionVisible, setEnergySectionVisible] = useState(false);
  const [isWasteVisible, setWasteVisible] = useState(false);
  const [isWaterVisible, setWaterVisible] = useState(false);
  const [isMaterialsVisible, setMaterialsVisible] = useState(false);
  const [isSupplierVisible, setIsSupplierVisible] = useState(false);

  const toggleSupplierSectionVisibility = () => {
    setIsSupplierVisible(!isSupplierVisible);
    setWasteVisible(false);
    setMaterialsVisible(false);
    setWaterVisible(false);
    setEnergySectionVisible(false);
  };
  const toggleEnergySectionVisibility = () => {
    setEnergySectionVisible(!isEnergySectionVisible);
    setWasteVisible(false);
    setMaterialsVisible(false);
    setWaterVisible(false);
    setIsSupplierVisible(false);
  };
  const toggleWasteVisible = () => {
    setWasteVisible(!isWasteVisible);
    setEnergySectionVisible(false);
    setMaterialsVisible(false);
    setWaterVisible(false);
    setIsSupplierVisible(false);
  };
  const toggleWaterVisible = () => {
    setWaterVisible(!isWaterVisible);
    setEnergySectionVisible(false);
    setWasteVisible(false);
    setMaterialsVisible(false);
    setIsSupplierVisible(false);
  };

  const toggleMaterialsVisible = () => {
    setMaterialsVisible(!isMaterialsVisible);
    setEnergySectionVisible(false);
    setWasteVisible(false);
    setWaterVisible(false);
    setIsSupplierVisible(false);
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
  return (
    <div className="m-3 ml-2 p-2 border border-r-2 border-b-2 shadow-lg rounded-l h-full">
      <div className="flex items-start py-4 min-h-[84vh] rounded-lg text-[0.875rem] overflow-x-hidden sm:w-[200px] md:w-[200px] lg:w-[200px] xl:w-[200px] 2xl:w-[200px] 3xl:w-[351px] scrollable-content">
        <div className="flex flex-col w-full font-medium">
          <button className="flex items-center px-4 py-2 -mt-4 mb-8 rounded-none focus:outline-none text-[#727272] font-bold">
            <span className="text-[16px] font-extrabold">Environment</span>
          </button>
          <button
            className={`flex items-center justify-between px-2 py-2 mb-2 focus:outline-none w-full ${
              activeTab === "Emissions"
                ? "text-[#007EEF]"
                : "bg-transparent text-[#727272] "
            }`}
            onClick={() => handleemssionClick("Emissions")}
          >
            <div className="w-[20%]">
              <MdOutlineFactory className="w-5 h-5 mr-2" />
            </div>
            <div className="w-[47%] text-left ml-2">
              <span className="indent-0">
                Emissions
              </span>
            </div>

            <div className="inset-y-0  flex items-center pointer-events-none w-[45%] justify-end">
              <span className="text-[#0057A5] text-[10px] bg-[#0057a51a] py-[4px] px-[6px] rounded-md">M</span>
              <MdKeyboardArrowDown className="text-lg text-neutral-500" />
            </div>
          </button>
          {/* Energy start  */}
          <div>
            <button
              className={`flex items-center  px-2 py-2 mb-2 focus:outline-none w-full ${
                activeTab === "Energy consumed inside the organization" ||
                activeTab ===
                  "Energy consumption outside of the organization" ||
                activeTab === "Energy Intensity" ||
                activeTab === "Reduction of energy consumption" ||
                activeTab ===
                  "Reductions in energy requirements of products and services"
                  ? "text-[#007EEF]"
                  : "bg-white text-[#727272] "
              }`}
              onClick={toggleEnergySectionVisibility}
            >
              <div className="w-[20%]">
                <MdOutlineTungsten className="w-5 h-5 mr-2" />
              </div>
              <div className="w-[47%] text-left ml-2">
              <span className="indent-0">
                  Energy
                </span>
              </div>

              <div className="inset-y-0  flex items-center pointer-events-none w-[45%] justify-end">
              <span className="text-[#0057A5] text-[10px] bg-[#0057a51a] py-[4px] px-[6px] rounded-md">M</span>
               
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

                <div className="bg-white px-2 ml-5 3xl:ml-8 mt-2 border-l-2 border-gray-300">
                {/* <div>
                    <p className="text-[12px]  ml-3  text-[#727272]">
                    Mandatory Management Disclosure
                    </p>
                  </div> */}
                  {/* <div>
                    <p
                      className={`flex  text-start ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                        activeTab === "Management of Material topic"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272]"
                      }`}
                      onClick={() =>
                        handleTabClick(
                          "Management of Material topic"
                        )
                      }
                    >
                      Management of Material topic
                    </p>
                  </div> */}
                  <div>
                    <p className="text-[12px]  ml-3  text-[#727272]">
                      Topic disclosure
                    </p>
                  </div>
                  <div>
                    <p
                      className={`flex  text-start ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                        activeTab === "Energy consumed inside the organization"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272]"
                      }`}
                      onClick={() =>
                        handleTabClick(
                          "Energy consumed inside the organization"
                        )
                      }
                    >
                      Energy consumed inside the organization
                    </p>
                  </div>
                  <div>
                    <p
                      className={`flex  text-start ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                        activeTab ===
                        "Energy consumption outside of the organization"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272] "
                      }`}
                      onClick={() =>
                        handleTabClick(
                          "Energy consumption outside of the organization"
                        )
                      }
                    >
                      Energy consumption outside of the organization
                    </p>
                  </div>
                  <div>
                    <p
                      className={`flex  text-start ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                        activeTab === "Energy Intensity"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272] "
                      }`}
                      onClick={() => handleTabClick("Energy Intensity")}
                    >
                      Energy Intensity
                    </p>
                  </div>
                  <div>
                    <p
                      className={`flex  text-start ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                        activeTab === "Reduction of energy consumption"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272] "
                      }`}
                      onClick={() =>
                        handleTabClick("Reduction of energy consumption")
                      }
                    >
                      Reduction of energy consumption
                    </p>
                  </div>
                  <div>
                    <p
                      className={`flex  text-start ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                        activeTab ===
                        "Reductions in energy requirements of products and services"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272] "
                      }`}
                      onClick={() =>
                        handleTabClick(
                          "Reductions in energy requirements of products and services"
                        )
                      }
                    >
                      Reductions in energy requirements of products and services
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
          {/* waste start  */}
          <div>
            <button
              className={`flex items-center justify-between px-2 py-2 mb-2 focus:outline-none w-full ${
                activeTab === "Significant waste related impact" ||
                activeTab ===
                  "Management of significant waste related impacts" ||
                activeTab === "Waste generated" ||
                activeTab === "Waste Diverted from disposal" ||
                activeTab === "Waste diverted to disposal"
                  ? "text-blue-400"
                  : "bg-transparent text-[#727272]"
              }`}
              onClick={toggleWasteVisible}
            >
             <div className="w-[20%]">
                <MdOutlineDeleteOutline className="w-5 h-5 mr-2" />
              </div>
              <div className="w-[47%] text-left ml-2">
              <span className="indent-0">
                  Waste
                </span>
              </div>

              <div className="inset-y-0  flex items-center pointer-events-none w-[45%] justify-end">
              <span className="text-[#0057A5] text-[10px] bg-[#0057a51a] py-[4px] px-[6px] rounded-md">
                  M
                </span>
                <MdKeyboardArrowDown
                  className={`text-lg text-neutral-500 ${
                    isWasteVisible && "rotate-180"
                  }`}
                />
              </div>
            </button>

            {/* Energy section content */}
            {isWasteVisible && (
              <>
                <div className="bg-white px-2 ml-5 3xl:ml-8 mt-2 border-l-2 border-gray-300">
                  <div>
                    <p className="text-[12px]  ml-3  text-gray-400">
                      Topic Management Disclosure
                    </p>
                  </div>
                  <div>
                    <p
                      className={`flex  text-start ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                        activeTab === "Significant waste related impact"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272] "
                      }`}
                      onClick={() =>
                        handleTabClick("Significant waste related impact")
                      }
                    >
                      Significant waste related impact
                    </p>
                  </div>
                  <div>
                    <p
                      className={`flex  text-start ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                        activeTab ===
                        "Management of significant waste related impacts"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272] "
                      }`}
                      onClick={() =>
                        handleTabClick(
                          "Management of significant waste related impacts"
                        )
                      }
                    >
                      Management of significant waste related impacts
                    </p>
                  </div>
                  <div>
                    <p className="text-[12px]  ml-3  text-gray-400">
                      Topic Disclosure
                    </p>
                  </div>

                  <div>
                    <p
                      className={`flex  text-start ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                        activeTab === "Waste generated"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272]"
                      }`}
                      onClick={() => handleTabClick("Waste generated")}
                    >
                      Waste generated
                    </p>
                  </div>

                  <div>
                    <p
                      className={`flex  text-start ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                        activeTab === "Waste Diverted from disposal"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272] "
                      }`}
                      onClick={() =>
                        handleTabClick("Waste Diverted from disposal")
                      }
                    >
                      Waste Diverted from disposal
                    </p>
                  </div>
                  <div>
                    <p
                      className={`flex  text-start ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                        activeTab === "Waste diverted to disposal"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272] "
                      }`}
                      onClick={() =>
                        handleTabClick("Waste diverted to disposal")
                      }
                    >
                      Waste Directed to disposal
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
          {/* Materials start  */}

          <div>
            <button
              className={`flex items-center justify-between px-2 py-2 mb-2 focus:outline-none w-full
              ${
                activeTab === "Materials used by weight or volume" ||
                activeTab === "Recycled input materials used" ||
                activeTab === "Reclaimed products and their packaging materials"
                  ? "text-[#007EEF]"
                  : "bg-transparent text-[#727272] "
              }`}
              onClick={toggleMaterialsVisible}
            >
              <div className="w-[20%]">
                <GiWoodPile className="w-5 h-5 mr-2" />
              </div>
              <div className="w-[47%] text-left ml-2">
              <span className="indent-0">
                  Materials
                </span>
              </div>

              <div className="inset-y-0  flex items-center pointer-events-none w-[45%] justify-end">
              <span className="text-[#0057A5] text-[10px] bg-[#0057a51a] py-[4px] px-[6px] rounded-md">
                  M
                </span>
                <MdKeyboardArrowDown
                  className={`text-lg text-neutral-500 ${
                    isMaterialsVisible && "rotate-180"
                  }`}
                />
              </div>
            </button>

            {/* Energy section content */}
            {isMaterialsVisible && (
              <>
                <div className="bg-white px-2 ml-5 3xl:ml-8 mt-2 border-l-2 border-gray-300">
                  <div>
                    <p
                      className={`flex  text-start ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                        activeTab === "Materials used by weight or volume"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272]"
                      }`}
                      onClick={() =>
                        handleTabClick("Materials used by weight or volume")
                      }
                    >
                      {" "}
                      Materials used by weight or volume
                    </p>
                  </div>
                  <div>
                    <p
                      className={`flex  text-start ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                        activeTab === "Recycled input materials used"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272] "
                      }`}
                      onClick={() =>
                        handleTabClick("Recycled input materials used")
                      }
                    >
                      Recycled input materials used
                    </p>
                  </div>
                  <div>
                    <p
                      className={`flex  text-start ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                        activeTab ===
                        "Reclaimed products and their packaging materials"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272] "
                      }`}
                      onClick={() =>
                        handleTabClick(
                          "Reclaimed products and their packaging materials"
                        )
                      }
                    >
                      Reclaimed products and their packaging materials
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Water and effluents */}
          <div className={`relative `}>
            <button
              className={`flex items-center justify-between px-2 py-2 mb-2 focus:outline-none w-full
              ${
                activeTab === "Interaction with water as shared resource" ||
                activeTab ===
                  "Water Withdrawal and Water Discharge from All Areas" ||
                activeTab ===
                  "Water withdrawal/Discharge from areas with water stress" ||
                activeTab === "Substances of concern" ||
                activeTab === "Change in water storage"
                  ? "text-blue-400"
                  : "bg-transparent text-[#727272] "
              }`}
              onClick={toggleWaterVisible}
            >
             <div className="w-[20%]">
                <MdOutlineWater className="w-5 h-5 mr-2" />
              </div>
              <div className="w-[47%] text-left ml-2">
                <span className="indent-0">
                  Water and effluents
                </span>
              </div>

              <div className="inset-y-0  flex items-center pointer-events-none w-[45%] justify-end">
              <span className="text-[#0057A5] text-[10px] bg-[#0057a51a] py-[4px] px-[6px] rounded-md">
                  M
                </span>
                <MdKeyboardArrowDown
                  className={`text-lg text-neutral-500 ${
                    isWaterVisible && "rotate-180"
                  }`}
                />
              </div>
            </button>

            {/* Water and effluents section content */}
            {isWaterVisible && (
              <>
                <div className="bg-white px-2 ml-5 3xl:ml-8 mt-2 border-l-2 border-gray-300">
                  <div>
                    <p className="text-[12px]  ml-3  text-gray-400">
                      Topic management disclosure
                    </p>
                  </div>
                  <div>
                    <p
                      className={`flex  text-start ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                        activeTab ===
                        "Interaction with water as shared resource"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272] "
                      }`}
                      onClick={() =>
                        handleTabClick(
                          "Interaction with water as shared resource"
                        )
                      }
                    >
                      Interaction with water as shared resource
                    </p>
                  </div>
                  <div>
                    <p className="text-[12px]  ml-3  text-gray-400">
                      Topic Disclosure
                    </p>
                  </div>
                  <div>
                    <p
                      className={`flex  text-start ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                        activeTab ===
                        "Water Withdrawal and Water Discharge from All Areas"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272] "
                      }`}
                      onClick={() =>
                        handleTabClick(
                          "Water Withdrawal and Water Discharge from All Areas"
                        )
                      }
                    >
                      {" "}
                      Water Withdrawal and Water Discharge from All Areas
                    </p>
                  </div>
                  <div>
                    <p
                      className={`flex  text-start ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                        activeTab ===
                        "Water withdrawal/Discharge from areas with water stress"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272]"
                      }`}
                      onClick={() =>
                        handleTabClick(
                          "Water withdrawal/Discharge from areas with water stress"
                        )
                      }
                    >
                      Water withdrawal and Water Discharge from areas with water
                      stress
                    </p>
                  </div>

                  <div>
                    <p
                      className={`flex  text-start ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                        activeTab === "Substances of concern"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272] "
                      }`}
                      onClick={() => handleTabClick("Substances of concern")}
                    >
                      Substances of concern
                    </p>
                  </div>
                  <div>
                    <p
                      className={`flex  text-start ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                        activeTab === "Change in water storage"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272] "
                      }`}
                      onClick={() => handleTabClick("Change in water storage")}
                    >
                      Change in water storage
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* supplier environmental assessment */}
          <div>
            <button
              className={`flex justify-between px-2  mb-2 focus:outline-none w-full ${
                activeTab ===
                  "New suppliers that were screened using environmental criteria" ||
                activeTab ===
                  "Negative environmental impacts in the supply chain and actions taken"
                  ? "text-[#007EEF]"
                  : "bg-white text-[#727272] "
              }`}
              onClick={toggleSupplierSectionVisibility}
            >
              <div className="w-[20%]">
                <MdOutlineWarehouse className="w-5 h-5 mr-2" />
              </div>
              <div className="w-[47%] text-left ml-2">
                <span className="indent-0">
                  Supplier Environmental Assessment
                </span>
              </div>

              <div className="inset-y-0  flex items-center pointer-events-none w-[45%] justify-end">
              <span className="text-[#0057A5] text-[10px] bg-[#0057a51a] py-[4px] px-[6px] rounded-md">
                  M
                </span>
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
                <div className="bg-white px-2 ml-5 3xl:ml-8 mt-2 border-l-2 border-gray-300">
                  <div>
                    <p className="text-[12px]  ml-3  text-[#727272]">
                      Topic disclosure
                    </p>
                  </div>
                  <div>
                    <p
                      className={`flex  text-start ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                        activeTab ===
                        "New suppliers that were screened using environmental criteria"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272]"
                      }`}
                      onClick={() =>
                        handleTabClick(
                          "New suppliers that were screened using environmental criteria"
                        )
                      }
                    >
                      New suppliers that were screened using environmental
                      criteria
                    </p>
                  </div>
                  <div>
                    <p
                      className={`flex  text-start ml-4 px-2 py-2  focus:outline-none w-full text-[12px] cursor-pointer ${
                        activeTab ===
                        "Negative environmental impacts in the supply chain and actions taken"
                          ? "text-blue-400"
                          : "bg-transparent text-[#727272] "
                      }`}
                      onClick={() =>
                        handleTabClick(
                          "Negative environmental impacts in the supply chain and actions taken"
                        )
                      }
                    >
                      Negative environmental impacts in the supply chain and
                      actions taken
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
          {/* <button
            className={`flex items-center justify-between  px-2 py-2 mb-2 focus:outline-none ${activeTab === "Bio diversity"
              ? "text-[#007EEF] border-l-4 border-[#007EEF]"
              : "bg-transparent text-[#727272] "
              }`}
            onClick={() => handleTabClick("Bio diversity")}
          >
            <MdOutlineEmojiNature  className="w-5 h-5 mr-2" />
            <span className="text-left sm:w-[92px] md:w-[92px] lg:w-[92px] xl:w-[92px] 2xl:w-[92px] 3xl:w-[198px]">Bio diversity</span>
            <div className=" inset-y-0 -right-2 flex items-center pointer-events-none">
              <MdKeyboardArrowDown
                className="text-lg text-neutral-500"
              />
            </div>
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Aside;
