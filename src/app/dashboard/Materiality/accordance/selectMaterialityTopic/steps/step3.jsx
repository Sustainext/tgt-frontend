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
import MaterialityRadioWidget from "../../../../../shared/widgets/Input/materialityRadioWidget"
import MaterialityInputWidget from "../../../../../shared/widgets/Input/materialityInputWidget";
import TopicSelectedPopup from "../../../modals/topicSelectedPopup"

const widgets = {
  MaterialityInputWidget: MaterialityInputWidget,
  MaterialityRadioWidget: MaterialityRadioWidget,
};

const view_path = "gri-governance-critical_concerns-2-16-a-critical_concerns";
const client_id = 1;
const user_id = 1;

const schema = {
    type: "array",
    items: {
      type: "object",
      properties: {
        Q1: {
          type: "string",
          title: "Are there any changes to the list of material topics compared to the previous reporting period?",
          enum: ["Yes", "No"],
        },
      },
      dependencies: {
        Q1: {
          oneOf: [
            {
              properties: {
                Q1: {
                  enum: ["Yes"],
                },
                Q2: {
                  type: "string",
                  title: "If yes, specify the changes to the list of material topics compared to the previous reporting period?",
                },
  
              },
            },
          ],
        },
      },
    },
  };
  
  const uiSchema = {
    items: {
      "ui:order": ["Q1", "Q2"],
      Q1: {
        "ui:title": "Are there any changes to the list of material topics compared to the previous reporting period?",
        "ui:tooltip":
        "<p>Indicate whether any changes are there to the list of material topics compared to the previous reporting period.</p> <p>Reporting period: </p> <p>Specific time period covered by the reported information.</p>",
        "ui:tooltipdisplay": "block",
        "ui:widget": "MaterialityRadioWidget",
        "ui:tag":"GRI-3-2-b",
        "ui:horizontal": true,
        "ui:options": {
          label: false,
        },
      },
      Q2: {
        "ui:title":
          "If yes, specify the changes to the list of material topics compared to the previous reporting period?",
          "ui:tooltip":
          "<p>Here organization can explain why a topic that it determined as material in the previous reporting period is no longer considered to be material or why a new topic has been determined as material for the current reporting period.</p> <p>Reporting period: </p> <p>Specific time period covered by the reported information.</p>",
        "ui:tooltipdisplay": "block",
        "ui:widget": "MaterialityInputWidget",
        "ui:tag":"GRI-3-2-b",
        "ui:horizontal": true,
        "ui:options": {
          label: false,
        },
      },
      "ui:options": {
        orderable: false, // Prevent reordering of items
        addable: false, // Prevent adding items from UI
        removable: false, // Prevent removing items from UI
        layout: "horizontal", // Set layout to horizontal
      },
    },
  };

const Step3 = ({handleTabClick,handlePrevious}) => {

  const [isModalOpen,setIsModalOpen]=useState(false)
    const [formData, setFormData] = useState([{}]);
    const [r_schema, setRemoteSchema] = useState({});
    const [r_ui_schema, setRemoteUiSchema] = useState({});
    const [loopen, setLoOpen] = useState(false);
    const [dataPresent,setDatapresent]=useState(false)
    const toastShown = useRef(false);
    const { open } = GlobalState();

    const LoaderOpen = () => {
        setLoOpen(true);
    };

    const LoaderClose = () => {
        setLoOpen(false);
    };

    const handleChange = (e) => {
      let newFormData = { ...e.formData[0] };
      if (newFormData.Q1 === "No") {
        newFormData.Q2 = "";
      }
      setFormData([newFormData]);
    };
  

    const assessment_id= typeof window !== 'undefined' ?localStorage.getItem("id"):''

    const fetchDetails = async()=>{
      const url = `${process.env.BACKEND_API_URL}/materiality_dashboard/materiality-change-confirmation/${assessment_id}/`;
      try {
        const response = await axiosInstance.get(url);
        if(response.status==200){
          setFormData(
            [
              {Q1:response.data.change_made==true?"Yes":"No",
                Q2:response.data.reason_for_change

              }
            ]
          )
          setDatapresent(true)
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

    useEffect(()=>{
      fetchDetails()
    },[])

    

   
    const handleSubmit = async(e) => {
        e.preventDefault();
       const data={
            "assessment":assessment_id,
            "change_made":formData[0].Q1=="Yes"?true:false,
            "reason_for_change":formData[0].Q2
        }
        const url = dataPresent?`${process.env.BACKEND_API_URL}/materiality_dashboard/materiality-change-confirmation/${assessment_id}/`:`${process.env.BACKEND_API_URL}/materiality_dashboard/materiality-change-confirmation/create/`;
      try {
        const response = dataPresent?await axiosInstance.put(url,data):await axiosInstance.post(url,data);
        if(response.status>=200&&response.status<300){
          setIsModalOpen(true)
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
            <div className="mt-10">
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
                {/* buttons */}
        <div className="flex justify-end w-full gap-4 mt-4">
        <button
                  className="w-auto h-full mr-2 py-2 px-3 text-[#727272]  cursor-pointer"
                  onClick={()=>{
                    handlePrevious()
                  }}
                >
                  {"<"} Previous
          </button>
          <button
                  className="w-[16%] h-full mr-4 py-2 px-2 bg-[#007EEF] text-white rounded-[8px] shadow cursor-pointer"
                  onClick={handleSubmit}
                >
                 Save and Proceed {">"}
                </button>
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

<TopicSelectedPopup isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}  handleTabClick={handleTabClick}/>
<ToastContainer/>
        </>
    );
};

export default Step3;
