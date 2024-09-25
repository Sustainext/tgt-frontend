import React, { useState, useEffect, useRef } from 'react';
import Form from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
import { MdInfoOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import GovernancetableWidget from '../../../../shared/widgets/Governance/governancetableWidget'
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Oval } from 'react-loader-spinner';
import { GlobalState } from '@/Context/page';
import axiosInstance from '@/app/utils/axiosMiddleware'
const widgets = {
    TableWidget: GovernancetableWidget,
};

const view_path = 'gri-governance-conflict_of_interest-2-15-b-report'
const client_id = 1
const user_id = 1

const schema = {
    type: 'array',
    items: {
        type: 'object',
        properties: {
            Criteria: { type: "string", title: "Conflict of interest relating to:" },
            Disclosed: { type: "string", enum: ['Yes', 'No', 'NA'], title: "Disclosed?" },


        },
    },
};

const uiSchema = {
    "ui:widget": "TableWidget",
    'ui:options': {
        titles: [
            { key: "Criteria", title: "Conflict of interest relating to:", type: "number", display: "none" },
            { key: "Disclosed", title: "Disclosed?", type: "number", display: "block", tooltip: "Indicate whether the given conflict of interest are disclosed to stakeholders." },


        ],
        rowLabels: [
            { title: "Cross-board membership", tooltip: "Mention the number of operations that include the use of social impact assessments, including gender impact assessments, based on participatory processes.", display: "none" },
            { title: "Cross-shareholding with suppliers and other stakeholders", tooltip: "Mention the number of operations that include the use of environmental impact assessments and ongoing monitoring.", display: "none" },
            { title: "Existence of controlling shareholders", tooltip: "Mention the number of operations that include the use of public disclosure of results of environmental and social impact assessments", display: "none" },
            { title: "Related parties, theri relationships, transactions, and outstanding balances", tooltip: "Mention the number of operations that include the use of local community development programs based on local communities’ needs.", display: "none" },
            { title: "Others", tooltip: "Mention the number of operations that include the use of local community development programs based on local communities’ needs.", display: "none" },

        ]
    },
};

const Screen2 = ({ selectedOrg, year, selectedCorp }) => {
    const { open } = GlobalState();
    const initialFormData = [
        { Disclosed: "" },
        { Disclosed: "" },
        { Disclosed: "" },
        { Disclosed: "" },
        { Disclosed: "" },
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
        setFormData(e.formData); // Ensure you are extracting formData from the event
    };


    const updateFormData = async () => {
        LoaderOpen();
        const data = {
            client_id: client_id,
            user_id: user_id,
            path: view_path,
            form_data: formData,
            corporate: selectedCorp,
            organisation: selectedOrg,
            year,
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
        const url = `${process.env.BACKEND_API_URL}/datametric/get-fieldgroups?path_slug=${view_path}&client_id=${client_id}&user_id=${user_id}&corporate=${selectedCorp}&organisation=${selectedOrg}&year=${year}`;
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
        e.preventDefault();
        console.log('Form data:', formData);
        updateFormData()
    };
    return (
        <>

            <div className="mx-2 p-3 mb-6 pb-4 rounded-md" style={{ boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px" }}>
                <div className='mb-4 flex'>
                    <div className='w-[80%] relative'>
                        <h2 className='flex mx-2 text-[15px] text-gray-500 font-semibold mb-2'>
                            Report whether conflicts of interest are disclosed to stakeholders, including, at a minimum,
                            conflicts of interest relating to:-

                        </h2>
                    </div>
                    <div className='w-[20%]'>
                        <div className="bg-sky-100 h-[25px] w-[70px] rounded-md mx-2 float-end">
                            <p className="text-[#395f81] text-[10px] inline-block align-middle px-2 font-semibold">
                                GRI 2-15-b
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

export default Screen2;
