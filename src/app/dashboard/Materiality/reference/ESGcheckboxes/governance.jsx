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

const widgets = {
    CheckboxWidget2: CheckboxWidget2,
};

const view_path = "gri-governance-critical_concerns-2-16-a-critical_concerns";
const client_id = 1;
const user_id = 1;

const schema = {
    type: "array",
    items: {
        type: "object",
        properties: {
            Governance: {
                type: "string",
                title: "Governance",
                enum: ["Governance", "Policy","Economic impacts","Economic performance","Corruption","Tax Transparency"],

            },
        },

    },
};

const uiSchema = {
    items: {
        "ui:order": ["Governance"],
        Governance: {
            "ui:widget": "CheckboxWidget2",
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

const Governance = () => {
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
