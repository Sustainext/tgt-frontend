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
import CheckboxWidget2 from "../../../../shared/widgets/Input/checkboxWidget2"

const widgets = {
  MaterialityInputWidget: MaterialityInputWidget,
  MaterialityRadioWidget: MaterialityRadioWidget,
  CheckboxWidget2:CheckboxWidget2
};

const view_path = "gri-governance-critical_concerns-2-16-a-critical_concerns";
const client_id = 1;
const user_id = 1;



const InputField = ({ handleTabClick }) => {

    const [formData, setFormData] = useState([{}]);
    const [r_schema, setRemoteSchema] = useState({});
    const [r_ui_schema, setRemoteUiSchema] = useState({});
    const [loopen, setLoOpen] = useState(true);
    const [stakeholderOption,setStakeHolderOption]=useState([])
    const [dataPresent,setDatapresent]=useState(false)
    const [textboxValue, setTextboxValue] = useState('');
    const toastShown = useRef(false);
    const { open } = GlobalState();

    const LoaderOpen = () => {
        setLoOpen(true);
    };

    const LoaderClose = () => {
        setLoOpen(false);
    };

    const assessment_id=typeof window !== 'undefined' ?localStorage.getItem("id"):''

    const fetchData = async()=>{
        const url = `${process.env.BACKEND_API_URL}/materiality_dashboard/materiality-assessment-process/${assessment_id}/`;
        try {
          const response = await axiosInstance.get(url);
          if(response.status==200){
            if(response.data){
              setFormData(
                [
                  {Q1:response.data.process_description,
                    Q2:response.data.impact_assessment_process,
                    Q3:response.data.selected_stakeholders.map(String)
    
                  }
                ]
              )
              setTextboxValue(response.data.stakeholder_others)
              setDatapresent(true)
            }
           
          }
          
          }
         
        catch (error) {
          console.log(error)
        }
      }

    const fetchDetails = async()=>{
        const url = `${process.env.BACKEND_API_URL}/materiality_dashboard/stakeholder-engagements/`;
        try {
          const response = await axiosInstance.get(url);
          if(response.status==200){
            const options = response.data.map((val) => ({
                label: val.id.toString(),
                value: val.name,
            }));
            setStakeHolderOption(options);
            LoaderClose()
          }
          
          }
         
        catch (error) {
            LoaderClose()
          toast.error("Oops, something went wrong check1", {
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
      },[])

    
    

    const schema = {
        type: "array",
        items: {
            type: "object",
            properties: {
                Q1: {
                    type: "string",
                    title: "Describe the process organisation has followed to determine its material topics including",
    
                },
                Q2: {
                    type: "string",
                    title: "How the organisation has identified actual and potential, negative and positive impacts on the economy, environment and people including impacts on their human rights, across its activities and business relationships?",
    
                },
                Q3: {
                    type: "string",
                    title: "Specify the stakeholders and experts whose views have informed the process of determining organisation's material topics.",
                    enum: stakeholderOption,
    
                },
            },
            // dependencies: {
            //     Q3: {
            //       oneOf: [
            //         {
            //           properties: {
            //             Q3: {
            //               enum: [{label:[Object,Object],value:{label:"13",value:"Others please specify"}}],
            //             },
            //             Q4: {
            //               type: "string",
            //             },
          
            //           },
            //         },
            //       ],
            //     },
            //   },
    
        },
    };
    
    const uiSchema = {
        items: {
            "ui:order": ["Q1", "Q2","Q3"],
            Q1: {
                "ui:title": "Describe the process organisation has followed to determine its material topics including",
                "ui:tooltip":
                    "<p>This section documents the data corresponding to the process to determine material topics. </p>",
                "ui:tooltipdisplay": "block",
                "ui:widget": "MaterialityInputWidget",
                "ui:tag":"GRI-3-1-a",
                "ui:horizontal": true,
                "ui:options": {
                    label: false,
                },
            },
            Q2: {
                "ui:title": "How the organisation has identified actual and potential, negative and positive impacts on the economy, environment and people including impacts on their human rights, across its activities and business relationships?",
                "ui:tooltip":
                    "<p>Describe the methods used to identify organisations impacts on the economy, environment and people. E.g. economic, environment and social impact assessment, grievance mechanisms etc.</p> <p>Impact: </p> <p>Effect the organization has or could have on the economy, environment and people including on their human rights, which in turn can indicate its contribution (negative or positive) to sustainable development.</p> <p>Human rights: </p> <p>Rights inherent to all human beings, which include, at a minimum, the rights set out in the United Nations (UN) International Bill of Human Rights and the principles concerning fundamental rights set out in the International Labour Organization (ILO) Declaration on Fundamental Principles and Rights at Work.</p> <p>Business relationships: </p> <p>Relationships that the organization has with business partners, with \entities in its value chain including those beyond the first tier, and with any other entities directly linked to its operations, products, or service.</p>",
                "ui:tooltipdisplay": "block",
                "ui:widget": "MaterialityInputWidget",
                "ui:tag":"GRI-3-1-a",
                "ui:horizontal": true,
                "ui:options": {
                    label: false,
                },
            },
            Q3: {
                "ui:title": "Specify the stakeholders and experts whose views have informed the process of determining organisation's material topics.",
                "ui:tooltip":
                    "<p>Explain, How does the organisation engage stakeholders in the identification of material topics? The organization can report whether and how it has prioritized stakeholders for engagement and the methods used to engage with them.</p> <p>Stakeholder: </p> <p>Individual or group that has an interest that is affected or could be affected by the organization’s activities.</p>",
                "ui:tooltipdisplay": "block",
                "ui:widget": "CheckboxWidget2",
                "ui:tag":"GRI-3-1-b",
                "ui:section":"grid grid-cols-2",
                "ui:horizontal": true,
                "ui:options": {
                    label: false,
                    enumOptions: stakeholderOption, 
                    setTextboxValue:setTextboxValue,
                    textboxValue:textboxValue
                },
            },
            // Q4: {
            //     "ui:widget": "MaterialityInputWidget",
            //     "ui:section":"grid grid-cols-2",
            //     "ui:horizontal": true,
            //     "ui:options": {
            //         label: false,
            //     },
            // },
    
              "ui:options": {
                orderable: false,
                addable: false,
                removable: false,
                layout: "horizontal",
            },
        },
    };

   
    const handleChange = (e) => {
        setFormData(e.formData);
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        const data={
            "assessment":assessment_id,
            "process_description":formData[0].Q1,
            "impact_assessment_process":formData[0].Q2,
            "selected_stakeholders":formData[0].Q3,
            "stakeholder_others":textboxValue

        }
        const url =dataPresent?`${process.env.BACKEND_API_URL}/materiality_dashboard/materiality-assessment-process/${assessment_id}/`:`${process.env.BACKEND_API_URL}/materiality_dashboard/materiality-assessment-process/create/`
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
              setTimeout(()=>{
                handleTabClick('managementApproach')
              },1500)
             
        }

        else{
          toast.error("Oops, something went wrong check2", {
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
        toast.error("Oops, something went wrong check3", {
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
                        setTextboxValue={setTextboxValue}

                    />
                </div>
            </div>
            <div className="flex justify-end w-full gap-4 mt-4 ">
        <button className="w-[15%] h-full mr-2 py-2 px-2 bg-[#007EEF] text-white rounded-[8px] shadow cursor-pointer"
        onClick={handleSubmit}
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

            <ToastContainer/>
        </>
    );
};

export default InputField;
