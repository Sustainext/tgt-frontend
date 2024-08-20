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
                enum:["Investors","Customers","Shareholders","Community group","Owner","Suppliers","Board of Directors","Creditors","Managers","Government","Employees","Unions","Others please specify"]

            },
        },

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

const InputField = ({ selectedOrg, year, selectedCorp }) => {
    const [formData, setFormData] = useState([{}]);
    const [r_schema, setRemoteSchema] = useState({});
    const [r_ui_schema, setRemoteUiSchema] = useState({});
    const [loopen, setLoOpen] = useState(false);
    const toastShown = useRef(false);
    const { open } = GlobalState();

    const LoaderOpen = () => {
        setLoOpen(true);
    };

    const LoaderClose = () => {
        setLoOpen(false);
    };

    const handleChange = (e) => {
        setFormData(e.formData);
    };

    // const updateFormData = async () => {
    //     const data = {
    //         client_id: client_id,
    //         user_id: user_id,
    //         path: view_path,
    //         form_data: formData,
    //         corporate: selectedCorp,
    //         organisation: selectedOrg,
    //         year,
    //     };
    //     const url = `${process.env.BACKEND_API_URL}/datametric/update-fieldgroup`;
    //     try {
    //         const response = await axiosInstance.post(url, data);
    //         if (response.status === 200) {
    //             toast.success("Data added successfully", {
    //                 position: "top-right",
    //                 autoClose: 3000,
    //                 hideProgressBar: false,
    //                 closeOnClick: true,
    //                 pauseOnHover: true,
    //                 draggable: true,
    //                 progress: undefined,
    //                 theme: "light",
    //             });
    //             LoaderClose();
    //             loadFormData();
    //         } else {
    //             toast.error("Oops, something went wrong", {
    //                 position: "top-right",
    //                 autoClose: 1000,
    //                 hideProgressBar: false,
    //                 closeOnClick: true,
    //                 pauseOnHover: true,
    //                 draggable: true,
    //                 progress: undefined,
    //                 theme: "colored",
    //             });
    //             LoaderClose();
    //         }
    //     } catch (error) {
    //         toast.error("Oops, something went wrong", {
    //             position: "top-right",
    //             autoClose: 1000,
    //             hideProgressBar: false,
    //             closeOnClick: true,
    //             pauseOnHover: true,
    //             draggable: true,
    //             progress: undefined,
    //             theme: "colored",
    //         });
    //         LoaderClose();
    //     }
    // };

   
    const handleSubmit = (e) => {
        e.preventDefault();
        // updateFormData();
        console.log("test form data", formData);
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
        <button className="w-[15%] h-full mr-2 py-2 px-2 bg-[#007EEF] text-white rounded-[8px] shadow cursor-pointer"
        onClick={handleSubmit}
        >
          Save and Proceed {">"}
        </button>
      </div>
           
        </>
    );
};

export default InputField;
