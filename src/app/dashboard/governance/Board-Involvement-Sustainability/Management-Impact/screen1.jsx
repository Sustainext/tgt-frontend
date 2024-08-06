'use client'
import React, { useState, useEffect, useRef } from 'react';
import Form from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
import CustomTableWidget from "../../../../shared/widgets/Table/tableWidget"
import { MdAdd, MdOutlineDeleteOutline, MdInfoOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Oval } from 'react-loader-spinner';
import axiosInstance from "@/app/utils/axiosMiddleware";

// Simple Custom Table Widget
const widgets = {
    TableWidget: CustomTableWidget,

};

const view_path = 'gri-social-impacts_and_actions-414-2b-number_of_suppliers'
const client_id = 1
const user_id = 1

const schema = {
    type: 'array',
    items: {
        type: 'object',
        properties: {
            Theorganizationpurpose: { type: "string", title: "The organizations purpose" },
            Valueormissionstatements: { type: "string", title: "Value or mission statements" },
            Strategies: { type: "string", title: "Strategies" },
            Policies: { type: "string", title: "Policies" },
            Goalsrelatedtosustainabledevelopment: { type: "string", title: "Goals related to sustainable development" },

        },
    },
};

const uiSchema = {
    "ui:widget": "TableWidget",
    'ui:options': {
        titles:
            [
                { title: "The organization's purpose", tooltip: "Describe the role of the highest governance body and of senior executives in developing, approving, and updating the following:" },
                { title: "Value or mission statements", tooltip: "What is the role of the highest governance body and of senior executives in developing, approving,and updating the value or mission statements?" },
                { title: "Strategies", tooltip: "Describe the role of the highest governance body and of senior executives in developing, approving, and updating the following" },
                { title: "Policies", tooltip: "What is the role of the highest governance body and of senior executives in developing, approving, and updating policies?" },
                { title: "Goals related to sustainable development", tooltip: "What is the role of the highest governance body and of senior executives in developing, approving, and updating goals related to sustainable development?" },

            ],

    },
};
const Screen1 = ({ selectedOrg, selectedCorp, year }) => {
    const initialFormData = [
        {
            Theorganizationpurpose: "",
            Valueormissionstatements: "",
            Strategies: "",
            Policies: "",
            Goalsrelatedtosustainabledevelopment: "",

        }
    ];
    const [formData, setFormData] = useState(initialFormData);
    const [r_schema, setRemoteSchema] = useState({})
    const [r_ui_schema, setRemoteUiSchema] = useState({})
    const [loopen, setLoOpen] = useState(false);
    const toastShown = useRef(false);


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
        // console.log('Response:', response.data);
        // } catch (error) {
        // console.error('Error:', error);
        // }
    };

    const loadFormData = async () => {
        console.log("loadFormData screen 2");
        LoaderOpen();
        setFormData(initialFormData);
        const url = `${process.env.BACKEND_API_URL}/datametric/get-fieldgroups?path_slug=${view_path}&client_id=${client_id}&user_id=${user_id}&corporate=${selectedCorp}&organisation=${selectedOrg}&year=${year}`;
        try {
            const response = await axiosInstance.get(url);
            console.log("API called successfully:", response.data);
            setRemoteSchema(response.data.form[0].schema);
            setRemoteUiSchema(response.data.form[0].ui_schema);
            setFormData(response.data.form_data[0].data);
        } catch (error) {
            setFormData(initialFormData);
        } finally {
            LoaderClose();
        }
    };

    useEffect(() => {
        if (selectedOrg && year) {
            loadFormData();
            toastShown.current = false;
        } else {
            if (!toastShown.current) {
                toastShown.current = true;
            }
        }
    }, [selectedOrg, year, selectedCorp]);

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission
        console.log("Form data:", formData);
        updateFormData();
    };
    const handleRemoveCommittee = (index) => {
        const newFormData = formData.filter((_, i) => i !== index);
        setFormData(newFormData);
    };


    return (
        <>
            <div className="mx-2 p-3 mb-6 pb-6 rounded-md" style={{ boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px" }}>
                <div className='mb-4 flex'>
                    <div className='w-[80%]'>
                        <h2 className='flex mx-2 text-[17px] text-gray-500 font-semibold mb-2'>
                            Role of the highest governance body and of senior executives
                            <MdInfoOutline data-tooltip-id={`tooltip-$e1`}
                                data-tooltip-content="This section documents the data corresponding to  the role of the highest governance body and of senior executives in
developing, approving, and updating the organization’s purpose, value or mission
statements, strategies, policies, and goals related to sustainable development." className="mt-1.5 ml-2 text-[14px]" />
                            <ReactTooltip id={`tooltip-$e1`} place="top" effect="solid" style={{
                                width: "290px", backgroundColor: "#000",
                                color: "white",
                                fontSize: "12px",
                                boxShadow: 3,
                                borderRadius: "8px",
                                textAlign: 'left',
                            }}>
                            </ReactTooltip>
                        </h2>

                        <h2 className='flex mx-2 text-[17px] text-gray-500 font-semibold mb-2'>Describe the role of the highest governance body and of senior executives in developing, approving, and updating the following: </h2>

                    </div>

                    <div className='w-[20%]'>
                        <div className="bg-sky-100 h-[25px] w-[70px] rounded-md mx-2 float-end">
                            <p className="text-[#395f81] text-[10px] inline-block align-middle px-2 font-semibold">
                                GRI 2-12-a
                            </p>
                        </div>
                    </div>
                </div>
                <div className='mx-2 mb-3'>
                    <Form
                        schema={schema}
                        uiSchema={uiSchema}
                        formData={formData}
                        onChange={handleChange}
                        validator={validator}
                        widgets={widgets}
                        formContext={{
                            onRemove: handleRemoveCommittee,
                            view:"0",
                        }}
                    />
                </div>

                <div className='mb-6'>
                    <button type="button"
                        className={`text-center py-1 text-sm w-[100px] bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline float-end ${!selectedOrg || !year ? "cursor-not-allowed" : ""
                            }`}
                        onClick={handleSubmit}
                        disabled={!selectedOrg || !year}
                    >
                        Submit
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
        </>
    );
};

export default Screen1;
