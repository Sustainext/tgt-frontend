import React, { useState, useEffect, useRef } from "react";
import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import { MdAdd, MdOutlineDeleteOutline, MdInfoOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Oval } from "react-loader-spinner";
import { GlobalState } from "@/Context/page";
import axiosInstance from '@/app/utils/axiosMiddleware';
import AllTableWidget from '../../../../shared/widgets/BRSR/allTableWidget'

const widgets = {
  AllTableWidget: AllTableWidget
};

const view_path = "gri-governance-critical_concerns-2-16-a-critical_concerns";
const client_id = 1;
const user_id = 1;

const Table = ({ selectedOrg, year, selectedCorp,setTableDataSubmit,tableDataSubmit }) => {
  const assessment_id = typeof window !== 'undefined' ?localStorage.getItem("id"):'';
  const [materialTopics, setMaterialTopics] = useState([]);
  const [dataPresent,setDatapresent]=useState(false)
  const [formData, setFormData] = useState([
    {
  MaterialIssue: "",
  RiskOrOpportunity: "",
  Rationale: "",
  MitigationApproach: "",
  FinancialImplications: ""
}
  ]);
  const [loopen, setLoOpen] = useState(false);

  const LoaderOpen = () => {
    setLoOpen(true);
};

const LoaderClose = () => {
    setLoOpen(false);
};
  
  // Fetch material topics from API
  const fetchMaterialTopics = async () => {
    LoaderOpen()
    const url = `${process.env.BACKEND_API_URL}/materiality_dashboard/selected-material-topics/${assessment_id}/`;
    try {
      const response = await axiosInstance.get(url);
      if (response.status === 200) {
        LoaderClose()
        setMaterialTopics(response.data);
      }
    } catch (error) {
      LoaderClose()
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

  const fetchData=async()=>{
    LoaderOpen()
    const url = `${process.env.BACKEND_API_URL}/materiality_dashboard/materiality-impact/${assessment_id}/`;
    try {
      const response = await axiosInstance.get(url);
      if (response.status === 200) {
        LoaderClose()
        if(response.data.length>0){
          const arr=[]
        response.data.map((val)=>{
          const obj={
            MaterialTopic: val.material_topic,
            ImpactType: val.impact_type,
            ImpactOverview: val.impact_overview,
          }
          arr.push(obj)
        })
        setFormData(arr)
        setDatapresent(true)
        }
       
      }
    } catch (error) {
      LoaderClose()
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

//   useEffect(() => {
//     fetchMaterialTopics();
//     fetchData()
//   }, []);

  const schema = {
  type: "array",
  items: {
    type: "object",
    properties: {
      MaterialIssue: {
        type: "string",
        title: "Please specify the identified material issue",
      },
      RiskOrOpportunity: {
        type: "string",
        title: "Indicate whether the identified material issue is a risk or an opportunity",
        enum: ["Risk", "Opportunity"],
      },
      Rationale: {
        type: "string",
        title: "Explain rationale for identifying the risk/opportunity",
      },
      MitigationApproach: {
        type: "string",
        title: "In Case Of Risk, Approach To Adapt Or Mitigate",
      },
      FinancialImplications: {
        type: "string",
        title: "Expert whether the identified risk or opportunity has positive or negative financial implications",
        enum: ["Positive implications", "Negative implications"],
      },
    },
  },
};

const uiSchema = {
  "ui:widget": "AllTableWidget",
  "ui:options": {
    titles: [
      {
        key: "MaterialIssue",
        title: "Material Issue Identified",
        tooltip: "Specify the environmental or social sustainability issue relevant to your business",
        layouttype: "input",
        tooltipdispaly: "block",
      },
      {
        key: "RiskOrOpportunity",
        title: "Risk Or Opportunity",
        tooltip: "Select whether the identified issue represents a risk or an opportunity for your business",
        layouttype: "select",
        tooltipdispaly: "block",
      },
      {
        key: "Rationale",
        title: "Rationale For Identifying The Risk/Opportunity",
        tooltip: "Explain why this issue is material and how it impacts your business",
        layouttype: "multilinetextbox",
        tooltipdispaly: "block",
      },
      {
        key: "MitigationApproach",
        title: "In Case Of Risk, Approach To Adapt Or Mitigate",
        tooltip: "Describe your strategy to manage or reduce the identified risk",
        layouttype: "multilinetextbox",
        tooltipdispaly: "block",
        keytack: "RiskOrOpportunity",
        disable: "MitigationApproach",
        disableIfNotValue: ["Risk"],
      },
      {
        key: "FinancialImplications",
        title: "Financial Implications Of The Risk Or Opportunity",
        tooltip: "Select whether the financial impact is expected to be positive, negative, or neutral",
        layouttype: "select",
        tooltipdispaly: "block",
      },
    ],
  },
};

  const handleChange = (e) => {
    setFormData(e.formData);
  };

  // const handleRemoveCommittee = (index) => {
  //   const newFormData = formData.filter((_, i) => i !== index);
  //   setFormData(newFormData);
  // };

  const handleRemoveCommittee = (index) => {
    const newFormData = formData.filter((_, i) => i !== index);
    // Ensure that we always have at least one row with default values
    if (newFormData.length === 0) {
      newFormData.push({
        MaterialTopic: "", 
        ImpactType: "", 
        ImpactOverview: "",
      });
    }
    setFormData(newFormData);
  };
  
  
 
  
  const handleAddCommittee = () => {
    const newCommittee = {
      MaterialTopic: "",
      ImpactType: "",
      ImpactOverview: "",
    };
    setFormData([...formData, newCommittee]);
  };

  const transformFormData = (data) => {
    return data.map((item) => ({
      assessment: assessment_id, // Static value for assessment
      material_topic: parseInt(item.MaterialTopic, 10), // Convert MaterialTopic to material_topic as an integer
      impact_type: item.ImpactType, // Map ImpactType to impact_type
      impact_overview: item.ImpactOverview // Map ImpactOverview to impact_overview
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const transformedData = transformFormData(formData);
    
  const url = dataPresent?`${process.env.BACKEND_API_URL}/materiality_dashboard/materiality-impact/${assessment_id}/edit/`:`${process.env.BACKEND_API_URL}/materiality_dashboard/materiality-impact/create/`
try {
  const response = dataPresent?await axiosInstance.put(url,transformedData):await axiosInstance.post(url,transformedData);
  
  if(response.status>=200&&response.status<300){
    toast.success("Data submitted", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    setTableDataSubmit(true)
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
    <h1 className="text=[22px] text-[#344054] mb-4 font-semibold p-3 mt-7 mx-4">
        Material Responsible Business Conduct and Sustainability Issues
    </h1>
      <div className="p-3 mb-6 pb-6 rounded-md shadow-lg mx-4 mt-5">
      <div className="xl:mb-4 md:mb-4 2xl:mb-4 lg:mb-4 4k:mb-4 2k:mb-4 mb-6 block xl:flex lg:flex md:flex 2xl:flex 4k:flex 2k:flex justify-end">
          <div className="w-[100%] relative  xl:mb-0 lg:mb-0 md:mb-0 2xl:mb-0 4k:mb-0 2k:mb-0">
            <h2 className="flex text-[15px] mx-2 ">
           Overview of the Entity’s Material Responsible Business Conduct Issues
              <MdInfoOutline
                data-tooltip-id="tooltip-$e86" 
                data-tooltip-html={`
                  <p>This section documents the data corresponding to the material 
responsible business conduct and sustainability issues 
pertaining to environmental and social matters that present a 
risk or an opportunity to your business, rationale for identifying
 the same, approach to adapt or mitigate the risk along-with its 
financial implications</p>
                `}
                className="mt-1.5 ml-2 text-[15px] w-[10%] xl:w-[5%] md:w-[5%] lg:w-[5%] 2xl:w-[5%] 3xl:w-[5%] 4k:w-[5%] 2k:w-[5%]"
              />
              <ReactTooltip
                id="tooltip-$e86"
                place="bottom"
                effect="solid"
                style={{
                  width: "300px",
                  backgroundColor: "#000",
                  color: "white",
                  fontSize: "12px",
                  boxShadow: 3,
                  borderRadius: "8px",
                  zIndex:1000
                }}
              />
            </h2>
          </div>

          <button className="text-[#18736B] bg-slate-200 rounded-xl p-1 text-[11px] w-[100px] h-[22px] xl:ml-6 ml-2 text-center ">
            BRSR-A-VII-26
          </button>
        </div>
        <p className="text-[13.5px] text-[#344054] mb-4 mx-3">
                Please indicate material responsible business conduct and sustainability issues pertaining to environmental and social matters that present a 
risk or an opportunity to your business, as per the following format:
        </p>
        <div className="mx-2 mb-4">
          <Form
            schema={schema}
            uiSchema={uiSchema}
            formData={formData}
            onChange={handleChange}
            validator={validator}
            widgets={widgets}
            formContext={{
              onRemove: handleRemoveCommittee,
            }}
          />
        </div>
        <div className="flex justify-end">
          <div>
            <button
              type="button"
              className={`mt-5 text-center py-1 text-sm w-[100px] bg-blue-500 text-white hover:bg-blue-600 rounded  focus:outline-none focus:shadow-outline`}
              onClick={handleSubmit}
              
            >
              Submit
            </button>
          </div>
        </div>
      </div>

      {loopen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <Oval
            height={50}
            width={50}
            color="#00BFFF"
            secondaryColor="#f3f3f3"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        </div>
      )}
    </>
  );
};

export default Table;
