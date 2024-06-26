import React, { useState, useEffect, useRef } from 'react';
import Form from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
import { MdAdd, MdOutlineDeleteOutline, MdInfoOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import CustomTableWidget4 from '../../../../shared/widgets/Table/tableWidget4';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Oval } from 'react-loader-spinner';

const widgets = {
    TableWidget: CustomTableWidget4,
};

const view_path = 'gri-social-benefits-401-2a-benefits_provided'
const client_id = 1
const user_id = 1

const schema = {
    type: 'array',
    items: {
        type: 'object',
        properties: {
            benefits: { type: "string", title: "Benefits" },
            fulltime: { type: "boolean", title: "Full-Time Employees" },
            parttime: { type: "boolean", title: "Part-Time Employees" },
            temporary: { type: "boolean", title: "Temporary Employees" },
            significantlocation: { type: "string", title: "Significant location of operations" }
        },
    },
};

const uiSchema = {
    "ui:widget": "TableWidget",
    'ui:options': {
        types: {
            benefits: "string",
            fulltime: "boolean",
            parttime: "boolean",
            temporary: "boolean",
            significantlocation: "string"
        },
        titles: [
            { title: "Benefits", tooltip: "benefit definition: direct benefit provided in the form of financial contributions, care paid for by the organization, or the reimbursement of expenses borne by the employee. Example: Life Insurance, Health Care, Coverage, Parental Leave, Retirement Provision, Stock Ownership etc. " },
            { title: "Full-Time Employees", tooltip: "Please select if this benefit is standard for all full-time employees. Unselect if it's not offered." },
            { title: "Part-Time Employees", tooltip: "Please select if this benefit is standard for all Part-time employees. Unselect if it's not offered." },
            { title: "Temporary Employees", tooltip: "Please select if this benefit is standard for all Temporary employees. Unselect if it's not offered." },
            { title: "Significant location of operations", tooltip: "This section allows you to enter the organization's significant locations of operation where the listed benefit is offered to full-time or part-time employees." },
        ],
    },
};
const initialBenefits = [
    { benefits: "Life Insurance", fulltime: false, parttime: false, temporary: false, significantlocation: "" },
    { benefits: "Disability & Invalidity Coverage", fulltime: false, parttime: false, temporary: false, significantlocation: "" },
    { benefits: "Parental Leave", fulltime: false, parttime: false, temporary: false, significantlocation: "" },
    { benefits: "Retirement Provision", fulltime: false, parttime: false, temporary: false, significantlocation: "" },
    { benefits: "Stock Ownership", fulltime: false, parttime: false, temporary: false, significantlocation: "" },
    { benefits: "Others", fulltime: false, parttime: false, temporary: false, significantlocation: "" }
];
const Benefitsscreen = ({ location, year, month }) => {
    const [formData, setFormData] = useState(initialBenefits);
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
        const url = `${process.env.BACKEND_API_URL}/datametric/get-fieldgroups?path_slug=${view_path}&client_id=${client_id}&user_id=${user_id}&location=${location}&year=${year}&month=${month}`;
        try {
            const response = await axios.get(url, axiosConfig);
            console.log('API called successfully:', response.data);
            setRemoteSchema(response.data.form[0].schema);
            setRemoteUiSchema(response.data.form[0].ui_schema);


            if (response.data.form_data.length > 0) {

                setFormData(response.data.form_data[0].data);


                // Assumes form_data is wrapped in an object under 'data'
            } else {
                // Handle empty response by either keeping the default state or resetting to default
                setFormData(initialBenefits);
            }


        } catch (error) {
            setFormData(initialBenefits);
        } finally {
            LoaderClose();
        }
    };


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
                toast.warn("Please select location, year, and month first", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                toastShown.current = true; // Set the flag to true after showing the toast
            }
        }
    }, [location, year, month]); // Dependencies // React only triggers this effect if these dependencies change



    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form data:', formData);
        updateFormData()
    };

    const handleAddCommittee = () => {
        const newEntry = { benefits: "", fulltime: false, parttime: false, temporary: false, significantlocation: "" };
        setFormData(formData => [...formData, newEntry]); // Use a functional update to ensure the latest state
    };

    const handleRemoveCommittee = (index) => setFormData(formData.filter((_, i) => i !== index));

    return (
        <>
        <ToastContainer style={{ fontSize: "12px" }} />
            <div className="mx-2 p-3 mb-6 rounded-md" style={{ boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px" }}>
                <div className='mb-4 flex'>
                    <div className='w-[80%]'>
                        <h2 className='flex mx-2 text-[17px] text-gray-500 font-semibold mb-2'>
                            Benefits provided to full-time employees that are not provided to temporary or part-time employees
                            <MdInfoOutline data-tooltip-id={`tooltip-$e1`}
                                data-tooltip-content="This table documents data corresponding to the standard benefits offered to full-time employees
                                of the organization, which are generally not available to temporary or part-time employees." className="mt-1.5 ml-2 text-[14px]" />
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
                        {/* <h2 className='flex mx-2 text-[11px] text-gray-500 font-semibold mb-2'>
                        For all employees, please report the following

                        </h2> */}
                    </div>

                    <div className='w-[20%]'>
                        <div className="bg-sky-100 h-[25px] w-[75px] rounded-md mx-2 float-end">
                            <p className="text-[#395f81] text-[10px] inline-block align-middle px-2 font-semibold">
                                GRI 401-2a
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
                    formContext={{ onRemove: handleRemoveCommittee }}
                />
                <div className="flex right-1 mx-2">
                    <button type="button" className="text-[#007EEF] text-[13px] flex cursor-pointer mt-5 mb-5" onClick={handleAddCommittee}>
                        Add more  <MdAdd className='text-lg' />
                    </button>
                </div>

                <div className='mb-6'>
                    <button type="button" className="text-center py-1 text-sm w-[100px] bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline float-end" onClick={handleSubmit}>Submit</button>
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

export default Benefitsscreen;
