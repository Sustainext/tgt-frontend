"use client";
import React, { useState, useEffect } from "react";
import Enviroment from "../../ESGchecboxes/environment"
import Social from "../../ESGchecboxes/social"
import Governance from "../../ESGchecboxes/governance"
import { useRouter } from 'next/navigation'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../../../../../utils/axiosMiddleware";

const Step1 = ({handleNext}) => {
  const router = useRouter()
  const [envChecked,setEnvChecked]=useState(false)
  const [socChecked,setSocChecked]=useState(false)
  const [govChecked,setGovChecked]=useState(false)
  const [formData, setFormData] = useState([{}]);
  const [dataPresent,setDatapresent]=useState(false)

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

  const id=localStorage.getItem("id")

  const fetchSelectedTopic=async()=>{

    const url = `${process.env.BACKEND_API_URL}/materiality_dashboard/get-material-topics/${id}/`;
    try {
      const response = await axiosInstance.get(url);
      if(response.status==200 && response.data.length>0){

        const groupedData = {
          Environmental: [],
          Social: [],
          Governance: []
      };
      
      const categoryMap = {
          environment: 'Environmental',
          social: 'Social',
          governance: 'Governance'
      };
      
      response.data.forEach(item => {
          const categoryKey = categoryMap[item.esg_category.toLowerCase()];
          if (categoryKey) {
              groupedData[categoryKey].push(item.id.toString());
          }
      });
      
      
      // const arr=Object.values(groupedData).flat();
      setFormData([groupedData]);
      if(groupedData.Environmental.length>0){
        setEnvChecked(true)
      }
      if(groupedData.Social.length>0){
        setSocChecked(true)
      }
      if(groupedData.Governance.length>0){
          setGovChecked(true)
      }
      setDatapresent(true)
      
      }
      // else{
      //   toast.error("Oops, something went wrong", {
      //     position: "top-right",
      //     autoClose: 1000,
      //     hideProgressBar: false,
      //     closeOnClick: true,
      //     pauseOnHover: true,
      //     draggable: true,
      //     progress: undefined,
      //     theme: "colored",
      //   });
      // }
      
    }
    catch (error) {
      toast.error("Oops, something went wrong", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }

  useEffect(()=>{
    fetchSelectedTopic()
  },[])

  const handleSubmit = async(e) => {
    const arr=Object.values(formData[0]).flat();
    e.preventDefault();
   const data={
        "assessment_id":id,
        "topics":arr,
        // "esg_selected":{environmentChecked:envChecked,socialChecked:socChecked,governanceChecked:govChecked}
    }
    const url = dataPresent?`${process.env.BACKEND_API_URL}/materiality_dashboard/assessment-topic-selections/${id}/edit/`:`${process.env.BACKEND_API_URL}/materiality_dashboard/assessment-topic-selection/`
  try {
    const response = dataPresent?await axiosInstance.put(url,data):await axiosInstance.post(url,data);
    
    if(response.status>=200&&response.status<300){
      handleNext()
    }
    else{
      toast.error("Oops, something went wrong", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
    
    }
   
  catch (error) {
    toast.error("Oops, something went wrong", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }
   
};
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
            <div className="gradient-background p-2 rounded-t-lg flex justify-between green-checkbox">
              <p className="text-[#2E0B34] text-[17px] mx-2 pt-2">
                Environmental
              </p>
              <input
                  id="env"
                  type="checkbox"
                  name="env"
                  checked={envChecked}
                  className="h-3.5 w-3.5 mt-3 mx-2"
                  onChange={handleChecked}
                />
            </div>
            <Enviroment envChecked={envChecked} formData={formData} setFormData={setFormData}/>
          </div>
          <div className="shadow-lg rounded-lg  w-[32.5%]">
            <div className="gradient-background p-2 rounded-t-lg flex justify-between green-checkbox">
              <p className="text-[#2E0B34] text-[17px] mx-2 pt-2">Social</p>
              <input
                  id="soc"
                  type="checkbox"
                  name="soc"
                  checked={socChecked}
                  className="h-3.5 w-3.5 mt-3 mx-2" //green-checkbox appearance-none checked:bg-green-500 checked:border-green-500 border border-gray-500 rounded-[3px] relative bg-white
                  onChange={handleChecked}
                />
            </div>
           <Social socChecked={socChecked} formData={formData} setFormData={setFormData}/>
          </div>
          <div className="shadow-lg rounded-lg  w-[32.5%]">
            <div className="gradient-background p-2 rounded-t-lg flex justify-between green-checkbox">
              <p className="text-[#2E0B34] text-[17px] mx-2 pt-2">
                Governance
              </p>
              <input
                  id="gov"
                  type="checkbox"
                  name="gov"
                  checked={govChecked}
                  className="h-3.5 w-3.5 mt-3 mx-2"
                  onChange={handleChecked}
                />
            </div>
           <Governance govChecked={govChecked} formData={formData} setFormData={setFormData}/>
          </div>
        </div>
      </div>

      {/* buttons */}
      <div className="flex justify-end w-full gap-4 mt-4">
        <button
                  className="w-auto h-full mr-2 py-2 px-3 text-[#727272]  cursor-pointer"
                  onClick={()=>{
                    router.push("/dashboard/Materiality")
                  }}
                >
                  {"<"} Back to Dashboard
          </button>
          <button
                  className="w-[16%] h-full mr-4 py-2 px-2 bg-[#007EEF] text-white rounded-[8px] shadow cursor-pointer"
                  onClick={handleSubmit}
                >
                  Next {">"}
                </button>
        </div>
    </>
  );
};

export default Step1;
