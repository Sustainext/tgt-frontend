'use client'
import React, { useState, useEffect,useRef } from 'react';
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
// Simple Custom Table Widget
const widgets = {
    TableWidget: CustomTableWidget,

};

const view_path = 'gri-social-human_rights-410-1a-security_personnel'
const client_id = 1
const user_id = 1

const schema = {
    type: 'array',
    items: {
        type: 'object',
        properties: {
            category: { type: "string", title: "category" },
            securitypersonnel: { type: "string", title: "securitypersonnel" },
            organization: { type: "string", title: "organization" },
            thirdpartyorganizations: { type: "string", title: "thirdpartyorganizations" },


        },
    },
};

const uiSchema = {
    "ui:widget": "TableWidget",
    'ui:options': {
        titles:
            [
                { title: "", tooltip: "Please specify the name and type of operations considered to have significant risk for incidents of forced or compulsory labor.",display:"none" },
                { title: "Number of Security Personnel", tooltip: "Please specify the total number of security personnel whether they have received training or not." },
                { title: "Employees of the Organization", tooltip: "Indicate the number of security personnel which are employees of the organization and who have received formal training." },
                { title: "Employees of third-party organizations", tooltip: "Indicate the number of security personnel  which are employees of third-party organizations and who have received formal training." },



            ],

    },
};
const Screen1 = ({location, year, month}) => {
    const [formData, setFormData] = useState([{
        category: "",
        securitypersonnel: "",
        organization: "",
        thirdpartyorganizations: "",

    }]);
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
        const url = `${process.env.BACKEND_API_URL}/datametric/get-fieldgroups?path_slug=${view_path}&client_id=${client_id}&user_id=${user_id}&location=${location}&year=${year}&month=${month}`;
        
        try {
            const response = await axios.get(url, axiosConfig);
            console.log('API called successfully:', response.data);
            setRemoteSchema(response.data.form[0].schema);
            setRemoteUiSchema(response.data.form[0].ui_schema);
            const form_parent = response.data.form_data;
            setFormData(form_parent[0].data);
            // const f_data = form_parent[0].data
            // setFormData(f_data)
        } catch (error) {
            console.error('API call failed:', error);
        } finally {
            LoaderClose();
        }
    }
    //Reloading the forms
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
    },[location, year, month])

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form data:', formData);
        updateFormData();
    };

    const handleAddCommittee = () => {
        const newCommittee = {
            category: "",
            securitypersonnel: "",
            organization: "",
            thirdpartyorganizations: "",


        };
        setFormData([...formData, newCommittee]);
    };

    const handleRemoveCommittee = (index) => {
        const newFormData = formData.filter((_, i) => i !== index);
        setFormData(newFormData);
    };

    return (
        <>
            <div className="mx-2 p-3 mb-6 rounded-md" style={{ boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px" }}>
                <div className='mb-4 flex'>
                    <div className='w-[80%]'>
                        <h2 className='flex mx-2 text-[17px] text-gray-500 font-semibold mb-2'>
                        Security personnel who have received formal training
                            <MdInfoOutline data-tooltip-id={`tooltip-$e1`}
                                data-tooltip-content="This section documents the data corresponding to the operations
                                considered to have significant risk for incidents of forced or
                                compulsory labor." className="mt-1.5 ml-2 text-[14px]" />
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
                                GRI 410-1a
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
                        formContext={{
                            onRemove: handleRemoveCommittee
                        }}
                    />
                </div>
                <div className="flex right-1 mx-2">
                    <button type="button" className="text-[#007EEF] text-[13px] flex cursor-pointer mt-5 mb-5" onClick={handleAddCommittee}>
                    Add category  <MdAdd className='text-lg' />
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

export default Screen1;
