import React, { useState, useEffect, useRef } from 'react';
import Form from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
import { MdInfoOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import CustomTableWidget3 from '../../../../shared/widgets/Table/tableWidget3';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Oval } from 'react-loader-spinner';
import { GlobalState } from '@/Context/page';
const widgets = {
    TableWidget: CustomTableWidget3,
};

const view_path = 'gri-social-parental_leave-401-3a-3b-3c-3d-parental_leave'
const client_id = 1
const user_id = 1

const schema = {
    type: 'array',
    items: {
        type: 'object',
        properties: {
            male: { type: "string", title: "male" },
            female: { type: "string", title: "female" },
            total: { type: "number", title: "Total" },

        },
    },
};

const uiSchema = {
    "ui:widget": "TableWidget",
    'ui:options': {
        titles: [
            { key: "male", title: "Male" },
            { key: "female", title: "Female" },

        ],
        rowLabels: [
            { title: "Parental Leave Entitlement", tooltip: "This section refers to the total number of employees who meet the eligibility criteria for parental leave within the organization, regardless of whether they actually took leave." },
            { title: "Taking parental leave", tooltip: "This section refers to the total number of employees who used their parental leave entitlement during the reporting period." },
            { title: "Returning to Work Post-Leave", tooltip: "This section refers to the total number of employees who returned to work after their parental leave ended within the reporting period." },
            { title: "Retained 12 Months After Leave", tooltip: "This section refers to the total number of employees who used their parental leave entitlement during the reporting period." },
        ]
    },
};

const Parentaleavescreen = ({ location, year, month }) => {
    const { open } = GlobalState();
    const initialFormData = [
        { male: "", female: "", total: 0 },
        { male: "", female: "", total: 0 },
        { male: "", female: "", total: 0 },
        { male: "", female: "", total: 0 },
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

    // The below code on updateFormData
    let axiosConfig = {
        headers: {
            Authorization: 'Bearer ' + token,
        },
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
            const response = await axios.post(url, data, axiosConfig);
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
            const response = await axios.get(url, axiosConfig);
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
    //Reloading the forms -- White Beard
    useEffect(() => {
        //console.long(r_schema, '- is the remote schema from django), r_ui_schema, '- is the remote ui schema from django')
    }, [r_schema, r_ui_schema])

    // console log the form data change
    useEffect(() => {
        console.log('Form data is changed -', formData)
    }, [formData])

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
            <ToastContainer style={{ fontSize: "12px" }} />
            <div className="mx-2 p-3 mb-6 pb-4 rounded-md" style={{ boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px" }}>
                <div className='mb-4 flex'>
                   <div className="w-[80%] relative">
                        <h2 className="flex mx-2 text-[15px]  font-bold mb-2">
                            Parental leave
                            <MdInfoOutline data-tooltip-id={`tooltip-employees`}
                                data-tooltip-content="This section documents data corresponding
                                to the number of employees entitled to, taking,
                               returning from, and remaining employed after
                               parental leave, broken down by gender." className="mt-1.5 ml-2 text-[14px]" />
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
                    <div className="flex">
                        <div className="bg-sky-100 h-[25px] w-[70px] rounded-md mx-2 float-end">
                            <p className="text-[#395f81] text-[10px] inline-block align-middle px-2 font-semibold">
                                GRI 401-3a
                            </p>
                        </div>
                        <div className="bg-sky-100 h-[25px] w-[70px] rounded-md mx-2 float-end">
                            <p className="text-[#395f81] text-[10px] inline-block align-middle px-2 font-semibold">
                                GRI 401-3b
                            </p>
                        </div>
                        <div className="bg-sky-100 h-[25px] w-[70px] rounded-md mx-2 float-end">
                            <p className="text-[#395f81] text-[10px] inline-block align-middle px-2 font-semibold">
                                GRI 401-3c
                            </p>
                        </div>
                        <div className="bg-sky-100 h-[25px] w-[70px] rounded-md mx-2 float-end">
                            <p className="text-[#395f81] text-[10px] inline-block align-middle px-2 font-semibold">
                                GRI 401-3d
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

export default Parentaleavescreen;
