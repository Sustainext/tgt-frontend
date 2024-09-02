"use client";
import React, { useState, useEffect } from "react";
import Enviroment from "../../ESGchecboxes/environment"
import Social from "../../ESGchecboxes/social"
import Governance from "../../ESGchecboxes/governance"

const Step1 = () => {
  const [envChecked,setEnvChecked]=useState(false)
  const [socChecked,setSocChecked]=useState(false)
  const [govChecked,setGovChecked]=useState(false)

  const handleChecked=(event)=>{
   if(event.target.name=="env"){
    setEnvChecked(event.target.checked)
   }
   else if(event.target.name=="soc"){
    setSocChecked(event.target.checked)
   }
   else{
    setGovChecked(event.target.checked)
   }
  }
  return (
    <>
      <div className="mt-3 mb-3">
        <p className="text-[#344054] text-[17px] font-bold pt-4 ml-6">
          Selecting ESG Topics
        </p>
        <p className="text-[#2E0B34] text-[14px]  pt-2 pb-2 ml-6">
          Select the check box in the headings of the ESG topics if that
          particular topic is a material topic.
        </p>
      </div>

      {/* checkbox */}
      <div className="mx-5">
        <div className="flex justify-between items-start">
          <div className="shadow-lg rounded-lg  w-[32.5%]">
            <div className="gradient-background p-2 rounded-t-lg flex justify-between">
              <p className="text-[##2E0B34] text-[17px] mx-2 pt-2">
                Environmental
              </p>
              <input
                  id="env"
                  type="checkbox"
                  name="env"
                  className="h-3.5 w-3.5 mt-3 mx-2"
                  onChange={handleChecked}
                />
            </div>
            <Enviroment envChecked={envChecked}/>
          </div>
          <div className="shadow-lg rounded-lg  w-[32.5%]">
            <div className="gradient-background p-2 rounded-t-lg flex justify-between">
              <p className="text-[##2E0B34] text-[17px] mx-2 pt-2">Social</p>
              <input
                  id="soc"
                  type="checkbox"
                  name="soc"
                  className="h-3.5 w-3.5 mt-3 mx-2" //green-checkbox appearance-none checked:bg-green-500 checked:border-green-500 border border-gray-500 rounded-[3px] relative bg-white
                  onChange={handleChecked}
                />
            </div>
           <Social socChecked={socChecked}/>
          </div>
          <div className="shadow-lg rounded-lg  w-[32.5%]">
            <div className="gradient-background p-2 rounded-t-lg flex justify-between">
              <p className="text-[##2E0B34] text-[17px] mx-2 pt-2">
                Governance
              </p>
              <input
                  id="gov"
                  type="checkbox"
                  name="gov"
                  className="h-3.5 w-3.5 mt-3 mx-2"
                  onChange={handleChecked}
                />
            </div>
           <Governance govChecked={govChecked}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default Step1;
