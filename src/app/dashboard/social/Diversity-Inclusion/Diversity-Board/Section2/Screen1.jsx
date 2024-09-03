'use client'
import React, { useState, useEffect, useRef } from 'react';
import Form from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
import CustomTableWidget7 from "../../../../../shared/widgets/Table/tableWidget7"
import { MdAdd, MdOutlineDeleteOutline, MdInfoOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Oval } from 'react-loader-spinner';
import axiosInstance from "@/app/utils/axiosMiddleware"

// Simple Custom Table Widget
const widgets = {
  TableWidget: CustomTableWidget7,

};

const view_path = 'gri-social-diversity_of_board-405-1b-number_of_employee'
const client_id = 1
const user_id = 1

const schema = {

  type: 'array',
  items: {
    type: 'object',
    properties: {
      category: { type: "string", title: "Category" },
      male: { type: "integer", title: "Male" },
      female: { type: "integer", title: "Female" },
      nonBinary: { type: "integer", title: "Non-Binary" },
      totalGender: { type: "integer", title: "Total number of individuals within the organisation's governance bodies" },
      lessThan30: { type: "integer", title: "< 30 years" },
      between30and50: { type: "integer", title: "30-50 years" },
      moreThan50: { type: "integer", title: "> 50 years" },
      totalAge: { type: "integer", title: "Total number of individuals within the organisation's governance bodies" },
      minorityGroup: { type: "integer", title: "Minority group" },
      vulnerableCommunities: { type: "integer", title: "Vulnerable Communities" },
    },
    required: ["category", "male", "female", "nonBinary", "totalGender", "lessThan30", "between30and50", "moreThan50", "totalAge", "minorityGroup", "vulnerableCommunities"]
  }
};

const uiSchema = {
  "ui:widget": "TableWidget",
  'ui:options': {
    titles: [
      { title: "Number of employees per employee category", tooltip: "Please specify the category.", colSpan: 1 },
      { title: "Gender", tooltip: "Please specify the gender of individuals.", colSpan: 4 },
      { title: "Age Group", tooltip: "Please specify the age group of individuals.", colSpan: 4 },
      { title: "Diversity groups", tooltip: "Please specify the diversity groups of individuals.", colSpan: 2 },
    ],
    subTitles: [
      { title: "", title2: "category",tooltip: "Please specify the category.", colSpan: 1, type: "text" },
      { title: "Male", title2: "Male",tooltip: "Please specify the number of male individuals.", colSpan: 1, type: "number" },
      { title: "Female", title2: "Female",tooltip: "Please specify the number of female individuals.", colSpan: 1, type: "number" },
      { title: "Non-Binary",title2: "NonBinary", tooltip: "Please specify the number of non-binary individuals.", colSpan: 1, type: "number" },
      { title: "Total number of employee",title2: "totalGender", tooltip: "Please specify the total number of individuals.", colSpan: 1, type: "number" },
      { title: "< 30 years", title2: "LessThan30", tooltip: "Please specify the number of individuals under 30 years old.", colSpan: 1, type: "number" },
      { title: "30-50 years", title2: "Between30and50", tooltip: "Please specify the number of individuals between 30 and 50 years old.", colSpan: 1, type: "number" },
      { title: "> 50 years", title2: "MoreThan50", tooltip: "Please specify the number of individuals over 50 years old.", colSpan: 1, type: "number" },
      { title: "Total number of employee", title2: "totalAge", tooltip: "Please specify the total number of individuals.", colSpan: 1, type: "number" },
      { title: "Minority group", title2: "Minoritygroup",tooltip: "Please specify the number of minority group individuals.", colSpan: 1, type: "number" },
      { title: "Vulnerable Communities", title2: "vulnerableCommunities", tooltip: "Please specify the number of vulnerable community individuals.", colSpan: 1, type: "number" },

    ]
  }
};

const Screen1 = ({ location, year }) => {
  const initialFormData = [
    {
      category: "",
      male: "",
      female: "",
      nonBinary: "",
      totalGender: "",
      lessThan30: "",
      between30and50: "",
      moreThan50: "",
      totalAge: "",
      minorityGroup: "",
      vulnerableCommunities: "",
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
      location: location,
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
    LoaderOpen();
    setFormData(initialFormData);
    const url = `${process.env.BACKEND_API_URL}/datametric/get-fieldgroups?path_slug=${view_path}&client_id=${client_id}&user_id=${user_id}&location=${location}&year=${year}`;
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
    if (location && year) {
      loadFormData();
      toastShown.current = false;
    } else {
      if (!toastShown.current) {
        toastShown.current = true;
      }
    }
  }, [location, year]);

  const handleSubmit = (e) => {
    e.preventDefault();
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
         <div className="w-[80%] relative">
            <h2 className='flex mx-2 text-[15px] text-gray-500 font-semibold mb-2'>
              Number of employee per employee category
              <MdInfoOutline data-tooltip-id={`tooltip-$e1`}
                data-tooltip-content="This section documents the data corresponding to the number of individuals
within the organization’s governance bodies by gender, age group and diversity group." className="mt-1.5 ml-2 text-[14px]" />
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
                GRI 405-1b
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
            formContext={{
              onRemove: handleRemoveCommittee
            }}
          />
        </div>


        <div className='mb-6'>
          <button type="button"
            className={`text-center py-1 text-sm w-[100px] bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline float-end ${!location || !year ? "cursor-not-allowed" : ""}`}
            onClick={handleSubmit}
            disabled={!location || !year}
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
