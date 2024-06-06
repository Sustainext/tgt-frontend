'use client'
import React, { useState, useEffect } from 'react';
import Form from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
import { MdAdd, MdOutlineDeleteOutline } from "react-icons/md";
import CustomFileUploadWidget from '../../../shared/widgets/CustomFileUploadWidget';
import AssignToWidget from '../../../shared/widgets/assignToWidget';
import CombinedWidget from '../../../shared/widgets/emissioncombinedWidget';
import { GlobalState } from '../../../../Context/page';
import RemoveWidget from '../../../shared/widgets/RemoveWidget';
import axios from 'axios';

const widgets = {
  EmissonCombinedWidget: (props) => <CombinedWidget {...props} scope="scope2" />,
  FileUploadWidget: CustomFileUploadWidget,
  AssignTobutton: AssignToWidget,
  RemoveWidget: RemoveWidget,
};

const view_path = 'gri-environment-emissions-301-a-scope-2'
const client_id = 1
const user_id = 1
// const notify = (text) => toast(text);

const Scope2 = () => {

  const { open } = GlobalState();
  const [formData, setFormData] = useState([{}]);
  const [r_schema, setRemoteSchema] = useState({})
  const [r_ui_schema, setRemoteUiSchema] = useState({})

  const handleChange = (e) => {
    setFormData(e.formData);

  };

  const handleAddNew = () => {
    const newData = [...formData, {}];
    setFormData(newData);
  };
  const updateFormData = async () => {

    const data = {
      client_id: client_id,
      user_id : user_id,
      path: view_path,
      form_data : formData
    }

    const url = `${process.env.BACKEND_API_URL}/datametric/update-fieldgroup`
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
    const base_url = `${process.env.BACKEND_API_URL}/datametric/get-fieldgroups?path=`;
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
  }
  const updateFormDatanew = (updatedData) => {
    setFormData(updatedData);

  };
  const handleRemove = (index) => {
    const updatedData = [...formData];
    updatedData.splice(index, 1);
    setFormData(updatedData);
  };

  return (
    <>

<div className={`overflow-auto custom-scrollbar flex justify-around  ${open ? "xl:w-[768px] 2xl:w-[1100px]" : "xl:w-[940px] 2xl:w-[1348px]"}`}>
        <div>
          <Form
          className='flex'
            schema={r_schema}
            uiSchema={r_ui_schema}
            formData={formData}
            onChange={handleChange}
            validator={validator}
            widgets={{
              ...widgets,
              RemoveWidget: (props) => (
                <RemoveWidget
                  {...props}
                  index={props.id.split('_')[1]}
                  onRemove={handleRemove}
                />
              ),
              FileUploadWidget: (props) => (
                <CustomFileUploadWidget
                  {...props}
                  scopes="scope2"
                  setFormData={updateFormDatanew}
                />
              )

            }}

          />
        </div>

      </div>

      <div className="flex justify-start mt-4 right-1">
        <button type="button" className="text-[#007EEF] text-[12px] flex cursor-pointer mt-5 mb-5" onClick={handleAddNew}>
          <MdAdd className='text-lg' /> Add Row
        </button>
      </div>
      <div className='mb-4'>
      <button type="button"  className=" text-center py-1 text-sm w-[100px] bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline float-end" onClick={handleSubmit}>Submit</button>
      </div>

    </>
  );
};

export default Scope2;