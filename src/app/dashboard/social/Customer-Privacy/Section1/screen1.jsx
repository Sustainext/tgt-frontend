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

const view_path = 'gri-social-customer_privacy-418-1a-total_number'
const client_id = 1
const user_id = 1

const schema = {
    type: 'array',
    items: {
        type: 'object',
        properties: {
            customerprivacy: { type: "string", title: "customerprivacy" },
            substantiatedorganization: { type: "string", title: "substantiatedorganization" },
            regulatorybodies: { type: "string", title: "regulatorybodies" },

        },
    },
};

const uiSchema = {
    "ui:widget": "TableWidget",
    'ui:options': {
        titles:
            [
                { title: "Number of substantiated complaints received concerning breaches of customer privacy", tooltip: "How many substantiated complaints received concerning breaches of customer privacy?",type:"number" },
                { title: "Complaints received from outside parties and substantiated by the organization", tooltip: "What is the total number of complaints received from outside parties and substantiated by the organization?",type:"number" },
                { title: "Complaints from regulatory bodies", tooltip: "What is the total number of complaints from regulatory bodies?",type:"number" },

            ],

    },
};
const Screen1 = ({ selectedOrg, selectedCorp,location, year, month }) => {
    const initialFormData = [
        {
            customerprivacy: "",
            substantiatedorganization: "",
            regulatorybodies: "",

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
          month,
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
        const url = `${process.env.BACKEND_API_URL}/datametric/get-fieldgroups?path_slug=${view_path}&client_id=${client_id}&user_id=${user_id}&corporate=${selectedCorp}&organisation=${selectedOrg}&year=${year}&month=${month}`;
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
        if (selectedOrg && year && month) {
          loadFormData();
          toastShown.current = false;
        } else {
          if (!toastShown.current) {
            toastShown.current = true;
          }
        }
      }, [selectedOrg, year,selectedCorp,month]);

      const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission
        console.log("Form data:", formData);
        updateFormData();
      };

    const handleAddCommittee = () => {
        const newCommittee = {
            customerprivacy: "",
            substantiatedorganization: "",
            regulatorybodies: "",
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
                    <div className='w-[80%] relative'>
                        <h2 className='flex mx-2 text-[15px] text-gray-500 font-semibold mb-2'>
                        Total number of substantiated complaints received concerning breaches of customer privacy
                            <MdInfoOutline data-tooltip-id={`tooltip-$e18`}
                                data-tooltip-content="definition of substantiated complaint  - written statement by regulatory
                        or similar official body addressed to the organization that identifies breaches
                        of customer privacy, or a complaint lodged with the organization that has been
                        recognized as legitimate by the organization"
                        className="mt-1.5 ml-2 text-[14px]" />
                            <ReactTooltip id={`tooltip-$e18`} place="top" effect="solid" style={{
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
                                GRI 418-1a
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
                    {selectedOrg  && year && (
                        <button type="button" className="text-[#007EEF] text-[13px] flex cursor-pointer mt-5 mb-5" onClick={handleAddCommittee}>
                            Add category  <MdAdd className='text-lg' />
                        </button>
                    )}

                </div>


                <div className='mb-6'>
                    <button type="button"
   className={`text-center py-1 text-sm w-[100px] bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline float-end ${
    !selectedOrg || !year ? "cursor-not-allowed" : ""
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
