"use client";
import React, { useState,useEffect } from "react";
import GRISVG from "../../../../../public/gri.svg";
import Image from "next/image";
import DateRangePicker from "@/app/utils/DatePickerComponent";
import { useRouter } from 'next/navigation'
 

const NewMaterialityAssement = ({ isModalOpen, setIsModalOpen }) => {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState(1);
  const [assessmentApproach,setAssessmentApproach] = useState("")
  const [isDateRangeValid, setIsDateRangeValid] = useState(true);
  const [organisations, setOrganisations] = useState([]);
  const[selectedOrg,setSelectedOrg]=useState([])
  const [corporates, setCorporates] = useState([]);
  const [errors, setErrors] = useState({
    organization: "Please select an organization",
    corporate: "Please select a location",
  });

  const [dateRange, setDateRange] = useState({
    start: null,
    end: null
  });

  useEffect(() => {
    const fetchOrg = async () => {
      try {
        const response = await axiosInstance.get(`/orggetonly`);
        setOrganisations(response.data);
      } catch (e) {
        console.error("Failed fetching organization:", e);
      }
    };

    fetchOrg();
  }, []);

  // useEffect(() => {
  //   const fetchCorporates = async () => {
  //     if (selectedOrg) {
  //       try {
  //         const response = await axiosInstance.get(`/corporate/`, {
  //           params: { organization_id: selectedOrg },
  //         });
  //         setCorporates(response.data);
  //       } catch (e) {
  //         console.error("Failed fetching corporates:", e);
  //       }
  //     }
  //   };

  //   fetchCorporates();
  // }, [selectedOrg]);

  const handleOrgChange = (e) => {
    const newOrg = e.target.value;
    setSelectedOrg(newOrg);
    // setSelectedCorp("");
    setErrors((prevErrors) => ({
      ...prevErrors,
      organization: newOrg ? "" : "Please select an organization",
    }));
  };

  const handleDateChange = (newRange) => {
    setDateRange(newRange);

    // setDatasetparams((prevParams) => ({
    //   ...prevParams,
    //   start: newRange.start,
    //   end: newRange.end
    // }));
  };

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  const handleChangeRadio = (event) => {
    if(event=="reference"){
      setAssessmentApproach("reference");
    }
    else if(event=="accordance"){
      setAssessmentApproach("accordance");
    }
    
  };

  return (
    <>
      {isModalOpen && (
       <div className="fixed inset-0 flex justify-center items-center bg-[#00000080] z-50">
       <div className="relative bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-3xl">
         <div className="flex justify-between items-center drop-shadow-lg w-full">
           <div className="flex">
             <Image src={GRISVG} className="w-7 h-7 mr-2" />
             <h2 className="text-black text-[18px] font-bold">
               Creating New Materiality Assessment
             </h2>
           </div>
           <button
             className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
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
         <div>
         <form className="space-y-2 px-6 pt-4">
           <div className="flex items-center" onClick={()=>{handleChangeRadio("accordance")}}>
             <input
               id="accordance"
               name="radio"
               type="radio"
               value="accordance"
               checked={assessmentApproach === "accordance"}
               className="text-gray-600 form-radio h-4 w-4"
             />
             <label
               htmlFor="accordance"
               className="ml-2 text-gray-600 text-[15px] cursor-pointer"
             >
               GRI: In Accordance With
             </label>
           </div>
           <div className="flex items-center" onClick={()=>{handleChangeRadio("reference")}}>
             <input
               id="reference"
               name="radio"
               type="radio"
               value="reference"
               checked={assessmentApproach === "reference"}
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
         </div>
        
         <div>
           <p className="text-[13px] text-[#495057] font-[600] px-3 pt-8">
             Select Topic by
           </p>
         </div>
         <div className="w-full mx-3 mt-4">
           <div className="flex">
             <button
               onClick={() => handleTabClick(1)}
               className={`py-1 px-4 rounded-l-lg focus:outline-none border border-gray-200 ${
                 activeTab === 1
                   ? "bg-[#DBE8F4] text-black"
                   : "bg-white-200 text-gray-600 hover:bg-white-300"
               }`}
             >
               Organization
             </button>
             <button
               onClick={() => handleTabClick(2)}
               className={`py-1 px-4 rounded-r-lg focus:outline-none border border-gray-200 ${
                 activeTab === 2
                   ? "bg-[#DBE8F4] text-black"
                   : "bg-white-200 text-gray-600 hover:bg-white-300"
               }`}
             >
               Corporate
             </button>
           </div>
           <div className="mt-4 w-full">
             {activeTab === 1 ? (
               <div className="flex justify-between items-center">
                {/* <div className="mr-2">
                  <label
                    htmlFor="cname"
                    className="text-neutral-800 text-[13px] font-normal"
                  >
                    Select Organization*
                  </label>
                  <div className="mt-2">
                    <select
                      className="block w-full rounded-md border-0 py-1.5 pl-4 text-neutral-500 text-xs font-normal leading-tight ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={selectedOrg}
                      onChange={handleOrgChange}
                    >
                      <option value="01">Select Organization</option>
                      {organisations &&
                        organisations.map((org) => (
                          <option key={org.id} value={org.id}>
                            {org.name}
                          </option>
                        ))}
                    </select>
                    {errors.organization && (
                      <p className="text-red-500 text-sm top=16  left-0 pl-2">
                        {errors.organization}
                      </p>
                    )}
                  </div>
                </div> */}
                 <div className="mr-2 w-full">
                     <label
                       htmlFor="cname"
                       className="text-neutral-800 text-[13px] font-normal"
                     >
                       Select Organization
                     </label>
                     <div className="mt-2">
                       <select
                         className="block w-full rounded-md border-0 py-1.5 pl-4 text-neutral-500 text-xs font-normal leading-tight ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                       >
                         <option value=""> Select Organization </option>
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
                     <DateRangePicker
                       startDate={dateRange.start}
                       endDate={dateRange.end}
                       onDateChange={handleDateChange}
                     />
                     {!isDateRangeValid && (
                       <div className="text-red-600 text-xs mt-2">
                         Please select a valid date range.
                       </div>
                     )}
                   </div>
                 </div>
               </div>
             ) : (
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
                         className="block w-full rounded-md border-0 py-1.5 pl-4 text-neutral-500 text-xs font-normal leading-tight ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                       >
                         <option value=""> Select Organization </option>
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
                         className="block w-full rounded-md border-0 py-1.5 pl-4 text-neutral-500 text-xs font-normal leading-tight ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                       >
                         <option value=""> Select Corporate </option>
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
                     <div className="mt-2 w-[50%]">
                       <DateRangePicker
                         startDate={dateRange.start}
                         endDate={dateRange.end}
                         onDateChange={handleDateChange}
                       />
                       {!isDateRangeValid && (
                         <div className="text-red-600 text-xs mt-2">
                           Please select a valid date range.
                         </div>
                       )}
                     </div>
                   </div>
                 </div>
               </div>
             )}
           </div>
           <div className="flex justify-end items-center mt-5">
             <button className="w-2/6 h-full mr-2 py-2 px-3 bg-[#007EEF] text-white rounded-[8px] shadow cursor-pointer"
             onClick={()=>{
              if(assessmentApproach=="accordance"){
                router.push('Materiality/accordance')
              }
              else if(assessmentApproach=="reference"){
                router.push('Materiality/reference')
              }
             }}
             >
               Start Materiality Assessment
             </button>
           </div>
         </div>
       </div>
     </div>
     
      )}
    </>
  );
};

export default NewMaterialityAssement;
