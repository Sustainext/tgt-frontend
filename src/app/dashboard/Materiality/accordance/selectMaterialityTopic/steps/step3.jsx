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
      Q3: {
          "ui:title":
            "Provide the total number of instances for which fines were incurred",
          "ui:tooltip":
            " Please specify what has been assured and on what basis it has been assured.",
          "ui:tooltipdisplay": "none",
          "ui:widget": "inputWidget",
          "ui:horizontal": true,
          "ui:options": {
            label: false,
          },
        },
        Q4: {
          "ui:title":
            "Provide the total number of instances for which non-monetary sanctions were incurred",
          "ui:tooltip":
            "Please specify the standard used for assurance. ",
          "ui:tooltipdisplay": "none",
          "ui:widget": "inputWidget",
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

const Step3 = ({ selectedOrg, year, selectedCorp }) => {
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

    const updateFormData = async () => {
        const data = {
            client_id: client_id,
            user_id: user_id,
            path: view_path,
            form_data: formData,
            corporate: selectedCorp,
            organisation: selectedOrg,
            year,
        };
        const url = `${process.env.BACKEND_API_URL}/datametric/update-fieldgroup`;
        try {
            const response = await axiosInstance.post(url, data);
            if (response.status === 200) {
                toast.success("Data added successfully", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                LoaderClose();
                loadFormData();
            } else {
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
                LoaderClose();
            }
        } catch (error) {
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
            LoaderClose();
        }
    };

   
    const handleSubmit = (e) => {
        e.preventDefault();
        // updateFormData();
        console.log("test form data", formData);
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
            </div>
            {/* {loopen && (
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
            )} */}
        </>
    );
};

export default Step3;
