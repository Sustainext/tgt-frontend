'use client'
import React, { useState, useEffect, useRef } from 'react';
import Form from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
import CustomTableWidget10 from "../../../../shared/widgets/Table/tableWidget10"
import PerformanceTable from "../../../../shared/widgets/Table/PerformanceTableWidget"
import { MdAdd, MdOutlineDeleteOutline, MdInfoOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Oval } from 'react-loader-spinner';
import axiosInstance from '@/app/utils/axiosMiddleware'
const widgets = {
  TableWidget: PerformanceTable,

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
      performance: { type: "string", title: "Number of employees who received regular performance review" },
      careerDevelopment: { type: "string", title: "Number of employees who received regular career development review" },
    },

  }
};

const uiSchema = {
  "ui:widget": "TableWidget",
  'ui:options': {
    titles: [
      { title: "Employee Category", tooltip: "Regular performance and career development review: Review based on criteria known to the employee and his or her superior.",tooltipdispla:"block" },
      { title: "Gender", tooltip: "Please specify the employee category. Employee category:breakdown of employees by level (such as senior management, middle management) and function (such as technical, administrative, production).",tooltipdispla:"none" },
      { title: "Number of employees who received regular performance review", tooltip: "Regular performance and career development review: Review based on criteria known to the employee and his or her superior.",tooltipdispla:"block" },
      { title: "Number of employees who received regular career development review", tooltip: "Regular performance and career development review: Review based on criteria known to the employee and his or her superior.",tooltipdispla:"block"},
    ],

    subTitles: [
      { title: "", title2:"Category", tooltip: "Please specify the category.",},
      { title: "Male",title2:"Male", tooltip: "Please specify the number of male individuals.", type: "number" },
      { title: "Female",title2:"Female", tooltip: "Please specify the number of female individuals.",  type: "number" },
      { title: "Others",title2:"Others", tooltip: "Please specify the number of others individuals.",  type: "number" },
    
    ]
  }
};
const Screen1 = ({  location, year,month }) => {
 
  const [formData, setFormData] = useState([
    {
      employeeCategories: [
    
      ],
      genders: [
        { gender: "Male", performance: "", careerDevelopment: "" },
        { gender: "Female", performance: "", careerDevelopment: "" },
        { gender: "Non-Binary", performance: "", careerDevelopment: "" },
      ],
      totalPerformance: 82,
      totalCareerDevelopment: 78,
    },
  ]);
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
    setFormData([
      {
        employeeCategories: [
      
        ],
        genders: [
          { gender: "Male", performance: "", careerDevelopment: "" },
          { gender: "Female", performance: "", careerDevelopment: "" },
          { gender: "Non-Binary", performance: "", careerDevelopment: "" },
        ],
        totalPerformance: 0,
        totalCareerDevelopment: 0,
      },
    ]);
    const url = `${process.env.BACKEND_API_URL}/datametric/get-fieldgroups?path_slug=${view_path}&client_id=${client_id}&user_id=${user_id}&location=${location}&year=${year}&month=${month}`;
    try {
      const response = await axiosInstance.get(url);
      console.log("API called successfully:", response.data);
      setRemoteSchema(response.data.form[0].schema);
      setRemoteUiSchema(response.data.form[0].ui_schema);
      setFormData(response.data.form_data[0].data[0]);
      console.log("test data new test", response.data.form_data);
    } catch (error) {
      setFormData([
        {
          employeeCategories: [
        
          ],
          genders: [
            { gender: "Male", performance: "", careerDevelopment: "" },
            { gender: "Female", performance: "", careerDevelopment: "" },
            { gender: "Non-Binary", performance: "", careerDevelopment: "" },
          ],
          totalPerformance: 0,
          totalCareerDevelopment: 0,
        },
      ]);
      LoaderClose();
    } finally {
      LoaderClose();
    }
  };

  const updateFormData = async () => {
    const data = {
      client_id: client_id,
      user_id: user_id,
      path: view_path,
      form_data: [formData],
      location: location,
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
    if (location && year && month) {
      loadFormData();
      toastShown.current = false;
    } else {
      if (!toastShown.current) {
        toastShown.current = true;
      }
    }
  }, [location, year,month]);
  return (
    <>
     <div className="mx-2 pb-11 pt-3 px-3 mb-6 rounded-md " style={{ boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px" }}>
        <div className='mb-4 flex'>
         <div className="w-[80%] relative">
          <h2 className="flex mx-2 text-[15px] text-neutral-950 font-[500]">
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
            <div className='float-end'>
            <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                  <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                GRI 404-3a
              </div>
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
        <div className='mt-4'>
          <button type="button"
            className={`text-center py-1 text-sm w-[100px] bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline float-end `}
            onClick={handleSubmit}
            // disabled={!location || !year}
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
