"use client";
import React from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { MdKeyboardArrowDown, MdClose } from "react-icons/md";
const AirQualityTopBar = ({
  toggleDrawer,
  sdgData,
  apiData,
  SignificantSpills,
  griData,
  setMobileopen
}) => {
  const materialityEnvData =
    apiData && apiData.environment ? apiData.environment : {};
    const toggleSidebar = () => {
      setMobileopen(true);
    };
  return (
    <>
      <div className="hidden xl:block lg:block md:hidden 2xl:block 4k:block">
        <div className="flex justify-between items-center border-b border-gray-200 mb-5 w-full">
          <div className="w-full">
            <div className="text-left mb-2 ml-3 pt-5">
              <p className="text-[11px]">Environment</p>
              <div className="flex h-[28px]">
                <div className="h-[28px]">
                  <p className="gradient-text text-[22px] font-bold h-[28px] pt-1">
                    Air Quality & other emissions
                  </p>
                </div>
                {materialityEnvData &&
                materialityEnvData.EnvAirQuality?.is_material_topic ? (
                  <div className="bg-gray-100 h-[22px] w-[100px]  mx-2 mt-2 rounded-md">
                    <p className="text-gray-500 text-[12px] pt-0.5 px-2">
                      Material Topic
                    </p>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          </div>
          <div className="w-full float-end pt-5 me-1">
            <div className="flex float-end border-l">
              {SignificantSpills ? (
                <div>
                  <button
                    className={`text-[#007EEF] bg-slate-200 rounded-full text-[11px] w-[100px] h-[22px] ml-2 text-center pt-0.5`}
                    onClick={() => toggleDrawer("52")}
                  >
                    GRI 306-3, 2016
                  </button>
                </div>
              ) : (
                <div></div>
              )}
              {griData &&
                griData.map((val) => (
                  <div>
                    <button
                      className={`text-[${val.textColor}] ${val.bgColor} rounded-full text-[11px] w-[72px] h-[22px] ml-2 text-center pt-0.5`}
                      onClick={() => toggleDrawer(val.toggle)}
                    >
                      {val.tagName}
                    </button>
                  </div>
                ))}
              {/* {brsr &&
              brsr.map((val) => (
                <div className=" relative">
                  <button
                    data-tooltip-id={val.id}
                    data-tooltip-content={val.content}
                    className="text-[#18736B] bg-slate-200 rounded-full text-[11px] w-[95px] h-[22px] ml-2 text-center pt-0.5"
                  >
                    {val.tagName}
                  </button>
                  <ReactTooltip
                    id={val.id}
                    place="bottom"
                    effect="solid"
                    style={{
                      width: "290px",
                      backgroundColor: "#000",
                      color: "white",
                      fontSize: "12px",
                      boxShadow: 3,
                      borderRadius: "8px",
                      textAlign: "center",
                    }}
                  ></ReactTooltip>
                </div>
              ))} */}
              {sdgData &&
                sdgData.map((val) => (
                  <div>
                    <button
                      className={`text-[${val.textColor}] ${val.bgColor} rounded-full text-[11px] w-[72px] h-[22px] ml-2 text-center pt-0.5`}
                      onClick={() => toggleDrawer(val.toggle)}
                    >
                      {val.tagName}
                    </button>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

         {/* mobile version */}
            <div className="block justify-between items-center border-b border-gray-200 mb-5 w-full xl:hidden lg:hidden md:block 2xl:hidden 4k:hidden">
              <div className="w-full  py-4  rounded-md  shadow-[0px_6px_12px_0px_rgba(0,0,0,0.08),0px_1px_3px_0px_rgba(0,0,0,0.10)] h-[100px]" onClick={toggleSidebar}>
                <div className="text-left mb-2 ml-3 pt-0 flex justify-between">
                  <div className="">
                    <p className="text-[11px]">Environment</p>
                    <div className="h-[28px]">
                      <div className="h-[28px]">
                        <p className="gradient-text text-[22px] font-bold h-[28px] pt-1">
                        Air Quality & other emissions
                        </p>
                      </div>
                      {materialityEnvData &&
                      materialityEnvData.EnvAirQuality?.is_material_topic ? (
                        <div className="bg-gray-100 h-[22px] w-[100px] mt-2 rounded-md">
                          <p className="text-gray-500 text-[12px] pt-0.5 px-2">
                            Material Topic
                          </p>
                        </div>
                      ) : (
                        <div></div>
                      )}
                    </div>
                  </div>
      
                  <div className="flex items-center me-5">
                    <MdKeyboardArrowDown className={`text-2xl float-end `} />
                  </div>
                </div>
              </div>
      
              <div className="w-full pt-5 me-1 mb-2">
            <div className="flex">
              {SignificantSpills ? (
                <div>
                  <button
                    className={`text-[#007EEF] bg-slate-200 rounded-full text-[11px] w-[100px] h-[22px] ml-2 text-center pt-0.5`}
                    onClick={() => toggleDrawer("52")}
                  >
                    GRI 306-3, 2016
                  </button>
                </div>
              ) : (
                <div></div>
              )}
              {griData &&
                griData.map((val) => (
                  <div>
                    <button
                      className={`text-[${val.textColor}] ${val.bgColor} rounded-full text-[11px] w-[72px] h-[22px] ml-2 text-center pt-0.5`}
                      onClick={() => toggleDrawer(val.toggle)}
                    >
                      {val.tagName}
                    </button>
                  </div>
                ))}
              {/* {brsr &&
              brsr.map((val) => (
                <div className=" relative">
                  <button
                    data-tooltip-id={val.id}
                    data-tooltip-content={val.content}
                    className="text-[#18736B] bg-slate-200 rounded-full text-[11px] w-[95px] h-[22px] ml-2 text-center pt-0.5"
                  >
                    {val.tagName}
                  </button>
                  <ReactTooltip
                    id={val.id}
                    place="bottom"
                    effect="solid"
                    style={{
                      width: "290px",
                      backgroundColor: "#000",
                      color: "white",
                      fontSize: "12px",
                      boxShadow: 3,
                      borderRadius: "8px",
                      textAlign: "center",
                    }}
                  ></ReactTooltip>
                </div>
              ))} */}
              {sdgData &&
                sdgData.map((val) => (
                  <div>
                    <button
                      className={`text-[${val.textColor}] ${val.bgColor} rounded-full text-[11px] w-[72px] h-[22px] ml-2 text-center pt-0.5`}
                      onClick={() => toggleDrawer(val.toggle)}
                    >
                      {val.tagName}
                    </button>
                  </div>
                ))}
            </div>
          </div>
            </div>
    </>
  );
};

export default AirQualityTopBar;
