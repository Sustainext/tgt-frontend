'use client'
import React, { useState, useEffect ,useRef } from 'react';
import Form from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
import inputWidget2 from '../../../../shared/widgets/Input/inputWidget2';
import { MdAdd, MdOutlineDeleteOutline, MdInfoOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import RadioWidget from '../../../../shared/widgets/Input/radioWidget';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Oval } from 'react-loader-spinner';

const widgets = {
    inputWidget: inputWidget2,
    RadioWidget: RadioWidget,
};

const view_path = 'gri-social-ohs-403-1a-ohs_management_system'
const client_id = 1
const user_id = 1

const schema = {
    type: 'array',
    items: {
        type: 'object',
        properties: {
            Q1: {
                type: "string",
                title: "Has an Occupational Health & Safety Management System been implemented?",
                format: 'textarea',
            },
            Q2: {
                type: "string",
                title: "Reason for implementation",
                enum: [
                    'Compliance with legal requirements',
                    'Adherence to industry standards',
                    'Risk management and accident prevention',
                    'Improvement of worker safety and well-being',
                    'Enhancing corporate social responsibility',
                ],
            },
            Q3: {
                type: "string",
                title: "List of legal requirements (if applicable)",
                format: 'textarea',
            },
            Q4: {
                type: "string",
                title: "Standards/Guidelines",
                format: 'textarea',
            },
            Q5: {
                type: "string",
                title: "List of Standards/Guidelines (if applicable)",
                format: 'textarea',
            },
        },
    },
};

const uiSchema = {
    items: {
        'ui:order': ['Q1', 'Q2', 'Q3', 'Q4', 'Q5'],
        Q1: {
            "ui:title": "Has an Occupational Health & Safety Management System been implemented?",
            "ui:tooltip": "Please indicate whether you have a formal Occupational Health & Safety Management System implemented.",
            "ui:tooltipdisplay": "block",
            'ui:widget': 'inputWidget',
            'ui:horizontal': true,
            'ui:options': {
                label: false
            },
        },
        Q2: {
            "ui:title": "Reason for implementation",
            "ui:tooltip": "Please explain the primary reason for implementing the system. For example: Compliance with legal requirements, adherence to industry standards, risk management and accident prevention, improvement of worker safety and well-being, enhancing corporate social responsibility, etc.",
            "ui:tooltipdisplay": "block",
            'ui:widget': 'RadioWidget',
            'ui:horizontal': true,
            'ui:options': {
                label: false
            },
        },
        Q3: {
            "ui:title": "List of legal requirements (if applicable)",
            "ui:tooltip": "List any specific legal regulations or laws that influenced the decision to implement the Occupational Health and Safety Management system. Include applicable national, regional, or industry-specific laws related to occupational health and safety.",
            "ui:tooltipdisplay": "block",
            'ui:widget': 'inputWidget',
            'ui:horizontal': true,
            'ui:options': {
                label: false
            },
        },
        Q4: {
            "ui:title": "Standards/Guidelines",
            "ui:tooltip": "Indicate whether any recognized risk management or management system standards/guidelines were adopted in developing the system. Example: ISO 45001 (Occupational Health and Safety Management Systems)OHSAS 18001 (Occupational Health and Safety Assessment Series) National or industry-specific standards",
            "ui:tooltipdisplay": "block",
            'ui:widget': 'inputWidget',
            'ui:horizontal': true,
            'ui:options': {
                label: false
            },
        },
        Q5: {
            "ui:title": "List of Standards/Guidelines (if applicable)",
            "ui:tooltip": "Provide a detailed list of the specific standards/guidelines that are used.Example: ISO 45001: Occupational Health and Safety Management Systems OHSAS 18001: Occupational Health and Safety Assessment Series Canada Labour Code: Part II - Occupational Health and Safety EU Directives on Occupational Safety and Health: Framework Directive (89/391/EEC) ASEAN-OSHNET Guidelines: Good Practices Guidance on various OSH topics",
            "ui:tooltipdisplay": "block",
            'ui:widget': 'inputWidget',
            'ui:horizontal': true,
            'ui:options': {
                label: false
            },
        },
        'ui:options': {
            orderable: false, // Prevent reordering of items
            addable: false, // Prevent adding items from UI
            removable: false, // Prevent removing items from UI
            layout: 'horizontal', // Set layout to horizontal
        },
    },
};

const Screen1 = ({location, year, month}) => {
    const [formData, setFormData] = useState([{}]);
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
        setFormData(e.formData);
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
        client_id : client_id,
        user_id : user_id,
        path: view_path,
        form_data: formData,
        location,
        year,
        month
        }

        const url = `${process.env.BACKEND_API_URL}/datametric/update-fieldgroup`
        try{
        const response = await axios.post(url,data, axiosConfig);
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

          }else {
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
        LoaderOpen();
        setFormData([{}]);
        const url = `${process.env.BACKEND_API_URL}/datametric/get-fieldgroups?path_slug=${view_path}&client_id=${client_id}&user_id=${user_id}&location=${location}&year=${year}&month=${month}`;
        try {
            const response = await axios.get(url, axiosConfig);
            console.log('API called successfully:', response.data);
            setRemoteSchema(response.data.form[0].schema);
            setRemoteUiSchema(response.data.form[0].ui_schema);
            setFormData(response.data.form_data[0].data);
        } catch (error) {
            setFormData([{}]);
        } finally {
            LoaderClose();
        }
    };
    //Reloading the forms -- White Beard
    useEffect(() => {
        //console.long(r_schema, '- is the remote schema from django), r_ui_schema, '- is the remote ui schema from django')
    },[r_schema, r_ui_schema])

    // console log the form data change
    useEffect(() => {
        console.log('Form data is changed -', formData)
    },[formData])

    // fetch backend and replace initialized forms
    useEffect (()=> {
        if (location && year && month) {
            loadFormData();
            toastShown.current = false; // Reset the flag when valid data is present
        } else {
            // Only show the toast if it has not been shown already
            if (!toastShown.current) {

                toastShown.current = true; // Set the flag to true after showing the toast
            }
        }
    },[location, year, month])


    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission
        console.log('Form data:', formData);
        updateFormData()
    };

    return (
        <>
            <div className="mx-2  p-3 mb-6 pb-6 rounded-md" style={{boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px"}}>
                <div className='mb-4 flex'>
                    <div className='w-[80%]'>
                    <h2 className='flex mx-2 text-[17px] text-gray-500 font-semibold'>
                        Occupational Health and Safety Management System
                        <MdInfoOutline data-tooltip-id={`tooltip-$e1`}
                            data-tooltip-content="This section documents data corresponding to the implementation of the
                            organization's formal system for managing occupational
                            health and safety risks. This includes information on whether
                            a system exists, the reasons for its implementation, and any
                            legal requirements or recognized standards/guidelines that
                            influenced its development." className="mt-1.5 ml-2 text-[14px]" />
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
                    </div>

                    <div   className='w-[20%]'>
            <div className="bg-sky-100 h-[25px] w-[70px] rounded-md mx-2 float-end">
              <p className="text-[#395f81] text-[10px] inline-block align-middle px-2 font-semibold">
              GRI 403-1a
              </p>
            </div>
          </div>
                </div>
                <div className='mx-2'>
                    <Form
                        schema={r_schema}
                        uiSchema={r_ui_schema}
                        formData={formData}
                        onChange={handleChange}
                        validator={validator}
                        widgets={widgets}
                    />
                </div>
               <div className='mb-6'>
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
