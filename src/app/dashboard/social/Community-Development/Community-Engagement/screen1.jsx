import React, { useState, useEffect, useRef } from 'react';
import Form from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
import { MdInfoOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import CustomTableWidget13 from '../../../../shared/widgets/Table/tableWidget13';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Oval } from 'react-loader-spinner';
import { GlobalState } from '@/Context/page';
import axiosInstance from '@/app/utils/axiosMiddleware'
const widgets = {
    TableWidget: CustomTableWidget13,
};

const view_path = 'gri-social-community_engagement-413-1a-number_of_operations'
const client_id = 1
const user_id = 1

const schema = {
    type: 'array',
    items: {
        type: 'object',
        properties: {
            operations: { type: "string", title: "No. of operations implemented by engaging local communities" },
            totaloperations: { type: "string", title: "Total no. of operations" },

        },
    },
};

const uiSchema = {
    "ui:widget": "TableWidget",
    'ui:options': {
        titles: [
            { key: "operations", title: "No. of operations implemented by engaging local communities", type:"number" },
            { key: "totaloperations", title: "Total no. of operations",type:"number" },

        ],
        rowLabels: [
            { title: "Social impact assessments", tooltip: "Mention the number of operations that include the use of social impact assessments, including gender impact assessments, based on participatory processes." },
            { title: "Environmental impact assessments", tooltip: "Mention the number of operations that include the use of environmental impact assessments and ongoing monitoring." },
            { title: "Public disclosure", tooltip: "Mention the number of operations that include the use of public disclosure of results of environmental and social impact assessments" },
            { title: "Community development programs", tooltip: "Mention the number of operations that include the use of local community development programs based on local communities’ needs." },
            { title: "Stakeholder engagement plans", tooltip: "Mention the number of operations that include the use of stakeholder engagement plans based on stakeholder mapping." },
            { title: "Local community consultation committes", tooltip: "Mention the number of operations that include the use of  broad based local community consultation committees and processes that includevulnerable groups." },
            { title: "Works councils, occupational health and safety committees", tooltip: "Mention the number of operations that include the use of works councils, occupational health and safety committees and other worker representation bodies to deal with impacts." },
            { title: "Community grievance processes", tooltip: "Mention the number of operations that include the use of formal local community grievance processes." },
        ]
    },
};

const Screen1 = ({ location, year, month }) => {
    const { open } = GlobalState();
    const initialFormData = [
        { operations: "", totaloperations: "" },
        { operations: "", totaloperations: "" },
        { operations: "", totaloperations: "" },
        { operations: "", totaloperations: "" },
        { operations: "", totaloperations: "" },
        { operations: "", totaloperations: "" },
        { operations: "", totaloperations: "" },
        { operations: "", totaloperations: "" },
    ];
    const [formData, setFormData] = useState(initialFormData);
    const [r_schema, setRemoteSchema] = useState({})
    const [r_ui_schema, setRemoteUiSchema] = useState({})
    const [loopen, setLoOpen] = useState(false);
    const toastShown = useRef(false);
    const getAuthToken = () => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('token')?.replace(/"/g, "");
        }
        return '';
    };
    const token = getAuthToken();
    const LoaderOpen = () => {
        setLoOpen(true);
    };
    const LoaderClose = () => {
        setLoOpen(false);
    };

    const handleChange = (e) => {
        setFormData(e.formData); // Ensure you are extracting formData from the event
    };


    const updateFormData = async () => {
        LoaderOpen();
        const data = {
            client_id: client_id,
            user_id: user_id,
            path: view_path,
            form_data: formData,
            location,
            year,
            month
        }

        const url = `${process.env.BACKEND_API_URL}/datametric/update-fieldgroup`
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


    const loadFormData = async () => {
        LoaderOpen();
        setFormData(initialFormData);
        const url = `${process.env.BACKEND_API_URL}/datametric/get-fieldgroups?path_slug=${view_path}&client_id=${client_id}&user_id=${user_id}&location=${location}&year=${year}&month=${month}`;
        try {
            const response = await axiosInstance.get(url);
            console.log('API called successfully:', response.data);
            setRemoteSchema(response.data.form[0].schema);
            setRemoteUiSchema(response.data.form[0].ui_schema);
            setFormData(response.data.form_data[0].data);
        } catch (error) {
            setFormData(initialFormData);
        } finally {
            LoaderClose();
        }
    };


    // fetch backend and replace initialized forms
    useEffect(() => {
        if (location && year && month) {
            loadFormData();
            toastShown.current = false; // Reset the flag when valid data is present
        } else {
            // Only show the toast if it has not been shown already
            if (!toastShown.current) {

                toastShown.current = true; // Set the flag to true after showing the toast
            }
        }
    }, [location, year, month]); // Dependencies // React only triggers this effect if these dependencies change



    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form data:', formData);
        updateFormData()
    };
    return (
        <>

            <div className="mx-2 p-3 mb-6 pb-4 rounded-md" style={{ boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px" }}>
                <div className='mb-4 flex'>
                    <div className='w-[80%] relative'>
                        <h2 className='flex mx-2 text-[17px] text-gray-500 font-semibold mb-2'>
                        Number of operations
                            <MdInfoOutline data-tooltip-id={`tooltip-employees`}
                                data-tooltip-content="This section documents the data
corresponding to the number operations with
implemented local community engagement,
impact assessments, and/or development programs. " className="mt-1.5 ml-2 text-[14px]" />
                            <ReactTooltip id={`tooltip-employees`} place="top" effect="solid" style={{
                                width: "290px", backgroundColor: "#000",
                                color: "white",
                                fontSize: "12px",
                                boxShadow: 3,
                                borderRadius: "8px",
                                textAlign: 'left',
                            }}>
                            </ReactTooltip>
                        </h2>
                    </div>
                    <div className='w-[20%]'>
                        <div className="bg-sky-100 h-[25px] w-[70px] rounded-md mx-2 float-end">
                            <p className="text-[#395f81] text-[10px] inline-block align-middle px-2 font-semibold">
                                GRI 413-1a
                            </p>
                        </div>

                    </div>
                </div>
                <Form
                    schema={r_schema}
                    uiSchema={r_ui_schema}
                    formData={formData}
                    onChange={handleChange}
                    validator={validator}
                    widgets={widgets}
                />
                <div className='mb-8'>
                <button type="button"
                        className={`text-center py-1 text-sm w-[100px] bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline float-end ${!location || !year ? 'cursor-not-allowed' : ''}`}
                        onClick={handleSubmit}
                        disabled={!location || !year}>
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
