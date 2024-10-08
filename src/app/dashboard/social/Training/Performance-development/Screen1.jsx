'use client'
import React, { useState, useEffect, useRef } from 'react';
import Form from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
import CustomTableWidget10 from "../../../../shared/widgets/Table/tableWidget10"
import { MdAdd, MdOutlineDeleteOutline, MdInfoOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Oval } from 'react-loader-spinner';
import axiosInstance from '@/app/utils/axiosMiddleware'
const widgets = {
  TableWidget: CustomTableWidget10,

};

const view_path = 'gri-social-performance_and_career-414-2b-number_of_suppliers'
const client_id = 1
const user_id = 1

const schema = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      category: { type: "string", title: "Category" },
      male: { type: "string", title: "Male" },
      female: { type: "string", title: "Female" },
      others: { type: "string", title: "Others" },
      male1: { type: "string", title: "Male" },
      female1: { type: "string", title: "Female" },
      others2: { type: "string", title: "Others" },
      totalEmployees: { type: "string", title: "Total number of Employee" },
      totalTrainingHours: { type: "string", title: "Total number of Employee" },
    },

  }
};

const uiSchema = {
  "ui:widget": "TableWidget",
  'ui:options': {
    titles: [
      { title: "Employee Category", tooltip: "Please specify the employee category. Employee category:breakdown of employees by level (such as senior management, middle management) and function (such as technical, administrative, production).", colSpan: 1 },
      { title: "Number of employees who received regular performance review", tooltip: "Regular performance and career development review: Review based on criteria known to the employee and his or her superior..", colSpan: 4 },
      { title: "Number of employees who received regular career development review", tooltip: "Regular performance and career development review: Review based on criteria known to the employee and his or her superior. ", colSpan: 4 },
    ],
    tbtilte: [

      { title: "Gender", tooltip: "Please specify the training hours.", colSpan: 4 },
      { title: "Gender", tooltip: "Please specify the number of employees.", colSpan: 4 },
    ],
    subTitles: [
      { title: "", title2:"Category", tooltip: "Please specify the category.", colSpan: 1, type: "text" },
      { title: "Male",title2:"Male", tooltip: "Please specify the number of male individuals.", colSpan: 1, type: "number" },
      { title: "Female",title2:"Female", tooltip: "Please specify the number of female individuals.", colSpan: 1, type: "number" },
      { title: "Others",title2:"Others", tooltip: "Please specify the number of others individuals.", colSpan: 1, type: "number" },
      { title: "Total  Number of Training Hours",title2:"totalTrainingHours", tooltip: "Please specify the total number of employees.", colSpan: 1, type: "number" },
      { title: "Male", title2:"Male1", tooltip: "Please specify the number of male individuals.", colSpan: 1, type: "number" },
      { title: "Female", title2:"Female1", tooltip: "Please specify the number of female individuals.", colSpan: 1, type: "number" },
      { title: "Others", title2:"Others1", tooltip: "Please specify the number of others individuals.", colSpan: 1, type: "number" },
      { title: "Total  number of Employee", title2:"totalEmployees", tooltip: "Please specify the total number of employees.", colSpan: 1, type: "number" },
    ]
  }
};
const Screen1 = ({ selectedOrg, selectedCorp, year, month }) => {
  const initialFormData = [
    {
      category: "",
      male: "",
      female: "",
      others: "",
      totalTrainingHours: "",
      male1: "",
      female1: "",
      others1: "",
      totalEmployees: "",
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



  const loadFormData = async () => {
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

  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data:', formData);
    updateFormData();
  };
  useEffect(() => {
    if (selectedOrg && year && month) {
      loadFormData();
      toastShown.current = false; // Reset the flag when valid data is present
    } else {
      // Only show the toast if it has not been shown already
      if (!toastShown.current) {
        toastShown.current = true; // Set the flag to true after showing the toast
      }
    }
  }, [selectedOrg, year, month,selectedCorp]);
  return (
    <>
      <div className="mx-2 p-3 mb-6 pb-6 rounded-md" style={{ boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px" }}>
        <div className='mb-4 flex'>
         <div className="w-[80%] relative">
           <h2 className="flex mx-2 text-[15px] font-[500] mb-2">
              Number of suppliers identified having significant actual and potential negative social impacts.
              <MdInfoOutline data-tooltip-id={`tooltip-$e1`}
                data-tooltip-content="This section documents the data corresponding to the number of
suppliers identified as having significant actual and potential
negative social impacts." className="mt-1.5 ml-2 text-[15px]" />
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

          <div className='w-[20%]'>
            <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                  <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                GRI 404-3a
              </div>
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
            className={`text-center py-1 text-sm w-[100px] bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline float-end ${!selectedOrg || !year || !month ? "cursor-not-allowed" : ""}`}
            onClick={handleSubmit}
            disabled={!selectedOrg || !year || !month}
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
