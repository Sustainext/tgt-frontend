"use client";
import React from "react";

const EmissionTopBar=({toggleDrawer,apiData})=>{
    const materialityEnvData=apiData&&apiData.environment?apiData.environment:{}
    return (
        <>
         <div className="flex justify-between items-center border-b border-gray-200 mb-5 w-full">
              <div className="w-full">
                <div className="text-left mb-4 ml-3 pt-5">
                  <p className="text-[11px]">Environment</p>
                  <div className="flex h-[28px]">
                    <div className="h-[28px]">
                      <p className="gradient-text text-[22px] font-bold h-[28px] pt-1">
                        Emission
                      </p>
                    </div>
                  </div>
                  {materialityEnvData&&materialityEnvData.EnvGhgEmission?.is_material_topic?(
                    <div className="bg-gray-100 h-[22px] w-[100px]  mx-2 mt-2 rounded-md">
                    <p className="text-gray-500 text-[12px] pt-0.5 px-2">
                      Material Topic
                    </p>
                  </div>
                ):(
                    <div></div>
                )}
                </div>
              </div>
              <div className="w-full float-end me-2">
                <div className="float-end border-l">
                  <div className="flex mb-2">
                  <button
                    className="text-[#007EEF] bg-slate-200 rounded-full text-[11px] w-[72px] h-[22px] ml-2 text-center pt-0.5"
                    onClick={() => toggleDrawer("43")}
                  >
                    GRI 305 - 1
                  </button>
                  <button
                    className="text-[#007EEF] bg-slate-200 rounded-full text-[11px] w-[72px] h-[22px] ml-2 text-center pt-0.5"
                    onClick={() => toggleDrawer("44")}
                  >
                    GRI 305 - 2
                  </button>
                  <button
                    className="text-[#007EEF] bg-slate-200 rounded-full text-[11px] w-[72px] h-[22px] ml-2 text-center pt-0.5"
                    onClick={() => toggleDrawer("45")}
                  >
                    GRI 305 - 3
                  </button>
                </div>

                <div className="flex">
                  <button
                    className="text-[#fff] bg-[#4C9F38] rounded-full text-[11px] w-[72px] h-[22px] ml-2 text-center pt-0.5 "
                    onClick={() => toggleDrawer("sd5")}
                  >
                    SDG 3
                  </button>
               
                  <button
                    className="text-[#fff] bg-[#BF8B2E] rounded-full text-[11px] w-[72px] h-[22px] ml-2 text-center pt-0.5 "
                    onClick={() => toggleDrawer("sd3")}
                  >
                    SDG 12
                  </button>
                  <button
                    className="text-[#fff] bg-lime-900 rounded-full text-[11px] w-[72px] h-[22px] ml-2 text-center pt-0.5"
                    onClick={() => toggleDrawer("sd4")}
                  >
                    SDG 13
                  </button>
                  <button
                    className="text-[#fff] bg-[#007DBC] rounded-full text-[11px] w-[72px] h-[22px] ml-2 text-center pt-0.5"
                    onClick={() => toggleDrawer("sd24")}
                  >
                    SDG 14
                  </button>
                  <button
                    className="text-[#fff] bg-[#40AE49] rounded-full text-[11px] w-[72px] h-[22px] ml-2 text-center pt-0.5"
                    onClick={() => toggleDrawer("sd8")}
                  >
                    SDG 15
                  </button>
                  </div>
                </div>
              </div>
            </div>
        </>
    )
}

export default EmissionTopBar