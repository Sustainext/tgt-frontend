"use client";
import React, { useState } from "react";
import NoAssesment from "./components/noAssesment";
import NewMaterialityAssement from "./modals/newMaterialityAssesment";
import DataTable from "./components/dataTable";
import {MdAdd} from "react-icons/md"

const Materiality = ({ open }) => {

  const [data,setData]=useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false);

  const DummyData=[
    {
      organization:"Warner Brothers",
      corporate:"Acme Corp",
      type:"GRI: In Accordance with",
      timePeriod:"Jan 2023 to Jan 2024",
      enviromentTopics:["Not Selected"],
      socialTopics:["Not Selected"],
      governanceTopics:["No Material Topic"],
      status:"InProgress"
    },
    {
      organization:"Warner Brothers",
      corporate:"Acme Corp",
      type:"GRI: with Reference to",
      timePeriod:"Jan 2023 to Jan 2024",
      enviromentTopics:["GHG Emissions","Water & effluent","Waste Management","Energy"],
      socialTopics:["Occupational Health &  Safety","Labor Management","Employment","Pay equality"],
      governanceTopics:["Governance","Policy","Economic Performance","Corruption"],
      status:"Completed"
    },
    {
      organization:"Warner Brothers",
      corporate:"DC universe",
      type:"GRI: In Accordance to",
      timePeriod:"Jan 2023 to Jan 2024",
      enviromentTopics:["GHG Emissions","Water & effluent","Waste Management","Energy"],
      socialTopics:["Occupational Health &  Safety","Labor Management","Employment","Pay equality"],
      governanceTopics:["Governance","Policy","Economic Performance","Corruption"],
      status:"Outdated"
    }
  ]
  
    return (
        <>
        <div className="flex flex-col justify-start overflow-x-hidden ">
          <div className="flex justify-between items-center border-b border-gray-200 mb-5 w-full">
            <div className="w-full">
              <div className="text-left mb-4 ml-3 pt-5">
                <div className="flex">
                  <div>
                    <p className="gradient-text text-[22px] font-bold pt-4 pb-4 ml-3">
                    Materiality Dashboard
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

       
        <div className="flex justify-center items-center mt-5 mx-4">
            <div className="border border-gray-200 mb-5 w-full rounded-md">
              <div className="flex justify-between items-center w-full border-b border-gray-200 pb-5">
                    <div>
                      <p className="text-[18px] font-bold pt-5 px-5">
                      Materiality Assessments
                      </p>
                      <p className="text-[14px] text-gray-500 px-5 pt-1">
                      All the materiality assessments made for the organizations.
                      </p>
                    </div>
                    {/* button */}
                    <div className="pt-5 px-5 flex gap-[4px]">
                      <button className="text-[#007EEF] text-[14px] font-bold" onClick={()=>{setIsModalOpen(true)}}>
                      New Materiality Assessment  
                      
                      </button>
                      <span className="text-[#007EEF] text-[20px] font-bold mb-1">
                        <MdAdd/>
                      </span>
                    </div>
              </div>
              {/* main section */}
              {data?(
                <DataTable data={DummyData}/>
              ):(
             <NoAssesment isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
              )}
              
            </div>
        </div>
        <NewMaterialityAssement isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
      </>
    );
  };
  
  export default Materiality;