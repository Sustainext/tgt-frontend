"use client";
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
import axiosInstance from '@/app/utils/axiosMiddleware'
import MaterialityRadioWidget from "../../../../shared/widgets/Input/materialityRadioWidget"
import MaterialityInputWidget from "../../../../shared/widgets/Input/materialityInputWidget";
import MaterialityTableWidget from "../../../../shared/widgets/Table/materialityTableWidget";
import CompletePopup from '../../modals/completePopup'

const widgets = {
  MaterialityInputWidget: MaterialityInputWidget,
  MaterialityRadioWidget: MaterialityRadioWidget,
  MaterialityTableWidget:MaterialityTableWidget

};

const view_path = "";
const client_id = 1;
const user_id = 1;

const schema = {
    type: "array",
    items: {
        type: "object",
        properties: {
            Q2: {
                type: "string",
                title: "Report whether the organization is involved with the negative impacts through its activities or as a result of its business relationships, and describe the activities or business relationships",

            },
            Q3: {
                type: "string",
                title: "Describe how engagement with stakeholders has informed the actions taken (3-3-d) and how stakeholder feedback is used to assess the effectiveness of the actions taken (3-3-e).",

            },

        },

    },
};

const uiSchema = {
    items: {
        "ui:order": ["Q2","Q3"],
        Q2: {
            "ui:title": "Report whether the organization is involved with the negative impacts through its activities or as a result of its business relationships, and describe the activities or business relationships",
            "ui:tooltip":
                "<p>Describe the methods used to identify organisations impacts on the economy, environment and people. E.g. economic, environment and social impact assessment, grievance mechanisms etc.</p> <p>Impact: </p> <p>Effect the organization has or could have on the economy, environment and people including on their human rights, which in turn can indicate its contribution (negative or positive) to sustainable development.</p> <p>Human rights: </p> <p>Rights inherent to all human beings, which include, at a minimum, the rights set out in the United Nations (UN) International Bill of Human Rights and the principles concerning fundamental rights set out in the International Labour Organization (ILO) Declaration on Fundamental Principles and Rights at Work.</p> <p>Business relationships: </p> <p>Relationships that the organization has with business partners, with \entities in its value chain including those beyond the first tier, and with any other entities directly linked to its operations, products, or service.</p>",
            "ui:tooltipdisplay": "block",
            "ui:widget": "MaterialityInputWidget",
            "ui:tag":"GRI-3-3-b",
            "ui:horizontal": true,
            "ui:options": {
                label: false,
            },
        },
        Q3: {
            "ui:title": "Describe how engagement with stakeholders has informed the actions taken (3-3-d) and how stakeholder feedback is used to assess the effectiveness of the actions taken (3-3-e).",
            "ui:tooltip":
                "<p>Describe in detail, how stakeholders have been involved in determining an appropriate remedy for a negative impact and their feedback is used to assess the effectiveness of the action taken.</p>",
            "ui:tooltipdisplay": "block",
            "ui:widget": "MaterialityInputWidget",
            "ui:tag":"GRI-3-3-f",
            "ui:section":"grid grid-cols-2",
            "ui:horizontal": true,
            "ui:options": {
                label: false,
            },
        },

          "ui:options": {
            orderable: false,
            addable: false,
            removable: false,
            layout: "horizontal",
        },
    },
};

const InputField = ({ selectedOrg, year, selectedCorp,setTableDataSubmit,tableDataSubmit }) => {
    const [formData, setFormData] = useState([{}]);
    const [r_schema, setRemoteSchema] = useState({});
    const [r_ui_schema, setRemoteUiSchema] = useState({});
    const [loopen, setLoOpen] = useState(false);
    const toastShown = useRef(false);
    const { open } = GlobalState();
    const [dataPresent,setDatapresent]=useState(false)
    const [dataSubmit,setDataSubmit] = useState(false)
    const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);

    const LoaderOpen = () => {
        setLoOpen(true);
    };

    const LoaderClose = () => {
        setLoOpen(false);
    };

    const handleChange = (e) => {
        setFormData(e.formData);
    };

    const assessment_id=typeof window !== 'undefined' ?localStorage.getItem("id"):''

    const fetchDetails = async()=>{
      const url = `${process.env.BACKEND_API_URL}/materiality_dashboard/management-approach-question/${assessment_id}/`;
      try {
        const response = await axiosInstance.get(url);
        if(response.status==200){
          if(response.data){
            setFormData(
              [
                {Q2:response.data.negative_impact_involvement_description,
                  Q3:response.data.stakeholder_engagement_effectiveness_description
  
                }
              ]
            ) 
            setDatapresent(true)
          }
          
        }
        
        }
       
      catch (error) {
        // toast.error("Oops, something went wrong", {
        //   position: "top-right",
        //   autoClose: 1000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        //   theme: "colored",
        // });
      }
    }

    const fetchData=async()=>{
        LoaderOpen()
        const url = `${process.env.BACKEND_API_URL}/materiality_dashboard/materiality-impact/${assessment_id}/`;
        try {
          const response = await axiosInstance.get(url);
          if (response.status === 200) {
            LoaderClose()
            if(response.data.length>0){
                setDataSubmit(true)
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

    useEffect(()=>{
      fetchDetails()
      fetchData()
    },[tableDataSubmit])

    
    const handleSubmit = async(e) => {
        if(!formData[0].Q2){
            return
        }
        e.preventDefault();
       const data={
            "assessment":assessment_id,
            "negative_impact_involvement_description":formData[0].Q2,
            "stakeholder_engagement_effectiveness_description":formData[0].Q3
        }
        const url = dataPresent?`${process.env.BACKEND_API_URL}/materiality_dashboard/management-approach-question/${assessment_id}/edit/`:`${process.env.BACKEND_API_URL}/materiality_dashboard/management-approach-question/create/`;
      try {
        const response = dataPresent?await axiosInstance.put(url,data):await axiosInstance.post(url,data);
        if(response.status>=200&&response.status<300){
            toast.success("Data Submitted", {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
              if(dataSubmit){
                const markComplete={
                    "status":"completed",
                }
                const CompleteUrl = `${process.env.BACKEND_API_URL}/materiality_dashboard/materiality-assessments/${assessment_id}/`
                try{
                  const response = await axiosInstance.patch(CompleteUrl,markComplete);
            
                  if(response.status==200){
                    setIsCompleteModalOpen(true)
                  }
                }
                catch(error){
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
            <div className="mt-7">
                <div className='mx-2 mb-3'>
                    <Form
                        schema={schema}
                        uiSchema={uiSchema}
                        formData={formData}
                        onChange={handleChange}
                        validator={validator}
                        widgets={widgets}

                    />
                </div>
            </div>
            <div className="flex justify-end w-full gap-4 mt-4 ">
          <button
           onClick={handleSubmit}
                  className="w-[15%] h-full mr-2 py-2 px-2 bg-[#007EEF] text-white rounded-[8px] shadow cursor-pointer"
                >
                  Save and Proceed {">"}
                </button>
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
            <CompletePopup  isCompleteModalOpen={isCompleteModalOpen}
      setIsCompleteModalOpen={setIsCompleteModalOpen}/>
            <ToastContainer/>
        </>
    );
};

export default InputField;
