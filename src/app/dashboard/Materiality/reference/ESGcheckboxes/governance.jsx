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
import CheckboxWidget2 from "../../../../shared/widgets/Input/checkboxWidget2";
import CheckboxWidget from "@/app/shared/widgets/Input/checkboxWidget";

const widgets = {
    CheckboxWidget: CheckboxWidget,
};

const view_path = "gri-governance-critical_concerns-2-16-a-critical_concerns";
const client_id = 1;
const user_id = 1;



const Governance = ({govChecked,formData,setFormData}) => {

    // const [formData, setFormData] = useState([{}]);
    const [r_schema, setRemoteSchema] = useState({});
    const [r_ui_schema, setRemoteUiSchema] = useState({});
    const [loopen, setLoOpen] = useState(false);
    const toastShown = useRef(false);
    const { open } = GlobalState();
    const [govTopics,setGovTopics]=useState([])

    const LoaderOpen = () => {
        setLoOpen(true);
    };

    const LoaderClose = () => {
        setLoOpen(false);
    };

    const fetchGovTopics = async()=>{
        LoaderOpen()
        const url = `${process.env.BACKEND_API_URL}/materiality_dashboard/list-esg-topics/?framework_id=1&esg_category=governance`;
        try {
          const response = await axiosInstance.get(url);
            if(response.status==200){
                const options = response.data.map((val) => ({
                    label: val.id.toString(),
                    value: val.name,
                }));
                setGovTopics(options);
                LoaderClose()
            }
          }
         
        catch (error) {
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
        fetchGovTopics()
      },[])

    const schema = {
        type: "array",
        items: {
            type: "object",
            properties: {
                Governance: {
                    type: "string",
                    title: "Governance",
                    enum: govTopics
    
                },
            },
    
        },
    };
    
    const uiSchema = {
        items: {
            "ui:order": ["Governance"],
            Governance: {
                "ui:widget": "CheckboxWidget",
                "ui:horizontal": true,
                "ui:options": {
                    label: false,
                    govChecked:govChecked,
                    enumOptions:govTopics
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
    
    // formData=[
    //     {
    //     "Governance": formData[0].Governance
    //     }
    // ]


    const handleChange = (e) => {
        setFormData(e.formData);
    };

    

   
    
    const handleSubmit = (e) => {
        e.preventDefault();
        // updateFormData();
        console.log("test form data", formData);
    };

    return (
        <>
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

export default Governance;
