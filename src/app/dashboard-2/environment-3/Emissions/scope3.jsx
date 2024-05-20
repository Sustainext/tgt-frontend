'use client'
import React, { useState, useEffect } from 'react';
import Form from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
import { MdAdd, MdOutlineDeleteOutline } from "react-icons/md";
import CustomFileUploadWidget from '../../../shared/widgets/CustomFileUploadWidget';
import AssignToWidget from '../../../shared/widgets/assignToWidget';
import CombinedWidget from '../../../shared/widgets/emissioncombinedWidget';
import { GlobalState } from '../../../../Context/page';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';


// setting view-path as initializer

const view_path = 'gri-environment-emissions-301-a-scope-3'
const client_id = 1
const user_id = 1

const widgets = {
  FileUploadWidget: CustomFileUploadWidget,
  AssignTobutton: AssignToWidget,
  EmissonCombinedWidget: CombinedWidget, // Update widgets to include CombinedWidget
};

const notify = (text) => toast(text);

const schema = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      Emission: {
        type: "string",
        title: "Emission",
      },
      FileUpload: {
        type: "string",
        format: "data-url",
      },
      AssignTo: {
        type: "string",
        title: "Assign To",
      },
    }
  }
};

const uiSchema = {
  items: {
    Emission: {
      'ui:widget': 'EmissonCombinedWidget', // Use CombinedWidget for Emission field
      'ui:horizontal': true,
      'ui:options': {
        label: false
      },
    },
    FileUpload: {
      'ui:widget': 'FileUploadWidget',
      'ui:horizontal': true,
      'ui:options': {
        label: false
      },
    },
    AssignTo: {
      "ui:widget": "AssignTobutton",
      'ui:options': {
        label: false
      },
    },
    'ui:options': {
      orderable: false,
      addable: false,
      removable: false,
      label: false,
      layout: 'horizontal',
    }
  }
};

const Scope1 = () => {
  const { open } = GlobalState();
  const [formData, setFormData] = useState([{}]);
  const [r_schema, setRemoteSchema] = useState({})
  const [r_ui_schema, setRemoteUiSchema] = useState({})

  const handleChange = (formData) => setFormData(formData);

  const handleAddNew = () => {
    const newData = [...formData, {}];
    setFormData(newData);
  };

 

  const handleRemove = (indexToRemove) => {
    const updatedFormData = formData.filter((_, index) => index !== indexToRemove);
    setFormData(updatedFormData);
  };

  const updateFormData = async () => {

    const data = {
      client_id: client_id,
      user_id : user_id,
      path: view_path,
      form_data : formData
    }
    
    const url = 'http://localhost:8000/datametric/update-fieldgroup'
    try {
      const response = await axios.post(url, 
        {
          ...data
        }
      );
  
      console.log('Response:', response.data);
      // toast(response.message)
      // Handle the response data here
    } catch (error) {
      console.error('Error:', error);
      // toast(error)
      // Handle errors here
    }
  };

  const loadFormData = async () =>{
    
    const base_url = 'http://localhost:8000/datametric/get-fieldgroups?path=';
    const url = `${base_url}${view_path}&&client_id=${client_id}&&user_id=${user_id}`
    console.log(url, 'is the url to be fired')

// Make the GET request
    axios.get(url)
      .then(response => {
        // Handle successful response
        console.log(response.data, ' is the response data')
        setRemoteSchema(response.data.form[0].schema)
        setRemoteUiSchema(response.data.form[0].ui_schema)
        const form_parent = response.data.form_data
        const f_data = form_parent[0].data
        setFormData(f_data)
        // setFormData(response.data.form[0].form_data)
      })
      .catch(error => {
        // Handle error
        console.error('Error:', error);
      });

  }
  // reload the forms
  useEffect(()=>{
    // console.log(r_schema, ' - is the remote schema from django', r_ui_schema, ' - is the remote ui schema from django')
  },[r_schema, r_ui_schema])

  // console log the formdata changes

  useEffect(()=>{
    console.log('formdata is changed - ', formData)


  },[formData])

  // fetch backend and replace initialized forms
  useEffect(()=>{
    console.log('Form loaded , ready for trigger')
    loadFormData()
  },[])

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data:', formData);
    updateFormData()

  };

  return (
    <>
     <div className={`overflow-auto custom-scrollbar flex   ${open ? "xl:w-[680px] 2xl:w-[1100px]" : "xl:w-[940px] 2xl:w-[1348px] 3xl:w-full"}`}>
        <div>
          <Form
            schema={r_schema}
            uiSchema={r_ui_schema}
            formData={formData}
            onChange={(e) => handleChange(e.formData)}
            validator={validator}
            widgets={widgets}
          />
        </div>

        <div className="mt-2">
          {formData.map((_, index) => (
            <button
              key={index}
              className="text-[#007EEF] text-[12px] flex justify-center items-center cursor-pointer ml-3"
              onClick={() => handleRemove(index)}
            >
              <MdOutlineDeleteOutline className="text-red-600 cursor-pointer text-2xl" />
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-start mt-4 right-1">
        <button type="button" className="text-[#007EEF] text-[12px] flex cursor-pointer mt-5 mb-5" onClick={handleAddNew}>
          <MdAdd className='text-lg' /> Add Row
        </button>
      </div>
      <Toaster />
      <button type="button" onClick={handleSubmit}>Submit</button>
    </>
  );
};

export default Scope1;
