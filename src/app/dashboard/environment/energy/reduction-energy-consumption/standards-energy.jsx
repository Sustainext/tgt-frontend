'use client'
import React, { useState, useEffect } from 'react';
import Form from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
import TextareaWidget from '../../../../shared/widgets/TextareaWidget';
import axios from 'axios';

const widgets = {
  TextareaWidgetnew: TextareaWidget,
};

const view_path = 'gri-environment-energy-302-4d-smac'
const client_id = 1
const user_id = 1


const schema = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      textareaQ1: {
        type: 'string',
        title: 'Please mention the standards used while compiling the information for 302-4 ?',
        format: 'textarea',
      },
      textareaQ2: {
        type: 'string',
        title: 'Please mention the methodologies used while compiling the information for 302-4 ?',
        format: 'textarea',
      },
      textareaQ3: {
        type: 'string',
        title: 'Please mention the assumptions used while compiling the information for 302-4 ?',
        format: 'textarea',
      },
      textareaQ4: {
        type: 'string',
        title: 'Please mention the calculation tools used while compiling the information for 302-4 ?',
        format: 'textarea',
      },
    }
  }
};
const uiSchema = {
  items: {
    textareaQ1: {
      "ui:title": "Please mention the standards used while compiling the information for 302-4 ?",
      "ui:Gri": "GRI 302-4d",
      'ui:widget': 'TextareaWidgetnew', // Use your custom widget for QuantityUnit
      'ui:options': {
        label: false // This disables the label for this field
      },
    },
    textareaQ2: {
        "ui:title": "Please mention the methodologies used while compiling the information for 302-4 ?",
        "ui:Gri": "GRI 302-4d",
        'ui:widget': 'TextareaWidgetnew', // Use your custom widget for QuantityUnit
        'ui:options': {
          label: false // This disables the label for this field
        },
      },
      textareaQ3: {
        "ui:title": "Please mention the assumptions used while compiling the information for 302-4 ?",
        "ui:Gri": "GRI 302-4d",
        'ui:widget': 'TextareaWidgetnew', // Use your custom widget for QuantityUnit
        'ui:options': {
          label: false // This disables the label for this field
        },
      },
      textareaQ4: {
        "ui:title": "Please mention the calculation tools used while compiling the information for 302-4 ?",
        "ui:Gri": "GRI 302-4d",
        'ui:widget': 'TextareaWidgetnew', // Use your custom widget for QuantityUnit
        'ui:options': {
          label: false // This disables the label for this field
        },
      },
    'ui:options': {
      orderable: false, // Prevent reordering of items
      addable: false, // Prevent adding items from UI
      removable: false, // Prevent removing items from UI
      layout: 'horizontal', // Set layout to horizontal
    }
  }
};

const Standardsenergy = () => {
  const [formData, setFormData] = useState([{}]);
  const [r_schema, setRemoteSchema] = useState({})
  const [r_ui_schema, setRemoteUiSchema] = useState({})

  // The below code on updateFormData 
  const updateFormData = async () => {
    const data = {
      client_id : client_id,
      user_id : user_id,
      path: view_path,
      form_data: formData
    }

    const url = 'http://localhost:8000/datametric/update-fieldgroup'
    try{
      const response = await axios.post(url,
        {
          ...data
        }
      );

      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const loadFormData = async () => {
    const base_url = 'http://localhost:8000/datametric/get-fieldgroups?path=';
    const url = `${base_url}${view_path}&&client_id=${client_id}&&user_id=${user_id}`
    console.log(url, 'is the url to be fired')

    //making the GET request
    axios.get(url)
    .then(response => {
      //handling the successful response
      console.log(response.data, 'is the response data')
      setRemoteSchema(response.data.form[0].schema)
      setRemoteUiSchema(response.data.form[0].ui_schema)
      const form_parent = response.data.form_data
      const f_data = form_parent[0].data
      setFormData(f_data)
      // setting the setFormData(response.data.form[0].form_data)
    })
    .catch(error =>{
      //handling the error response
      console.log('Error:', error);
    });
  }
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
    console.log('From loaded , ready for trigger')
    loadFormData()
  },[])

  const handleChange = (e) => {
    setFormData(e.formData);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data:', formData);
    updateFormData()
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
      </div>
      <div className='mb-4'>
      <button type="button"  className=" text-center py-1 text-sm w-[100px] bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline float-end" onClick={handleSubmit}>Submit</button>
      </div>
    </>
  );
};


export default Standardsenergy;
