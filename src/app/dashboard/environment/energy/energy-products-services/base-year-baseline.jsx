'use client'
import React, { useState, useEffect, useRef } from 'react';
import Form from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
import TextareaWidget from '../../../../shared/widgets/Textarea/TextareaWidget';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Oval } from 'react-loader-spinner';
import { GlobalState } from '../../../../../Context/page';
const widgets = {
  TextareaWidgetnew: TextareaWidget,
};

const view_path = 'gri-environment-energy-302-5b-base_year_or_baseline'
const client_id = 1
const user_id = 1

const schema = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      textareaQ1: {
        type: 'string',
        title: 'What is the basis for calculating reductions in energy consumptions such as base year',
        format: 'textarea',
      },

    }
  }
};
const uiSchema = {
  items: {
    textareaQ1: {
      "ui:title": "What is the basis for calculating reductions in energy consumptions such as base year",
      "ui:Gri": "GRI 302-5b",
      'ui:widget': 'TextareaWidgetnew', // Use your custom widget for QuantityUnit
      'ui:options': {
        label: false
      },
    },
      'ui:options': {
      orderable: false,
      addable: false,
      removable: false,
      layout: 'horizontal',
    }
  }
};

const Baseyearenergybaseline = ({location, year, month}) => {

  const { open } = GlobalState();
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
  // The below code on updateFormData
  let axiosConfig = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
  const updateFormData = async () => {
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
  };

    const loadFormData = async () => {
      LoaderOpen();
      setFormData([{}])
      const url = `${process.env.BACKEND_API_URL}/datametric/get-fieldgroups?path_slug=${view_path}&client_id=${client_id}&user_id=${user_id}&location=${location}&year=${year}&month=${month}`;
      try {
          const response = await axios.get(url, axiosConfig);
          console.log('API called successfully:', response.data);
          setRemoteSchema(response.data.form[0].schema);
          setRemoteUiSchema(response.data.form[0].ui_schema);
          const form_parent = response.data.form_data;
          setFormData(form_parent[0].data);
      } catch (error) {
          console.error('API call failed:', error);
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
    e.preventDefault();
    console.log('Form data:', formData);
    updateFormData()
  };

  const handleChange = (e) => {
    setFormData(e.formData);
  };
  return (
    <>
      <div >
        <div>
        <Form
          schema={r_schema}
          uiSchema={r_ui_schema}
          formData={formData}
          onChange={handleChange}
          validator={validator}
          widgets={widgets}
        />
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
      </div>

      <div className='mb-4'>
      <button type="button"  className=" text-center py-1 text-sm w-[100px] bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline float-end" onClick={handleSubmit}>Submit</button>
      </div>
    </>
  );
};


export default Baseyearenergybaseline;
