'use client'
import React, { useState, useEffect } from 'react';
import Form from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
import TextareaWidget2 from "../../../../shared/widgets/Textarea/TextareaWidget2";
import axios from 'axios';

const widgets = {
    TextareaWidgetnew: TextareaWidget2,
};

const view_path = 'gri-environment-waste-306-1-significant_waste'
const client_id = 1
const user_id = 1

const schema = {
    type: 'array',
    items: {
        type: 'object',
        properties: {
            Q1: {
                type: "string",
                format: 'textarea',
            },
            Q2: {
                type: "string",
                format: 'textarea',
            },

            // Define other properties as needed
        }
    }
};


const uiSchema = { // Add flex-wrap to wrap fields to the next line
    items: {
        Q1: {
            "ui:hadding": "Impact Analysis: Inputs, Activities, Outputs",
            "ui:title": "Describe the inputs, activities, and outputs that lead or could lead to these impacts",
            "ui:tooltipshadding": "Please specify the inputs, activities, and outputs that lead or could lead to actual and potential waste related impacts.Include: The types of inputs and outputs can include raw materials, process and manufacturing materials, leaks and losses, waste, by-products, products, or packaging.",
            "ui:haddingdisplay": "block",
            "ui:titlediplay": "block",
            "ui:haddingtooltipdisplay": "block",
            "ui:titletooltipdisplay": "none",
            "ui:Gri": "GRI 306-1a",
            'ui:widget': 'TextareaWidgetnew', // Use your custom widget for QuantityUnit
            'ui:options': {
                label: false // This disables the label for this field
            },
        },
        Q2: {
            "ui:hadding": "Activities resulting into waste",
            "ui:title": "Describe whether these impacts relate to waste generated in the organization’s own activities or to waste generated upstream or downstream in its value chain.",
            "ui:tooltipshadding": "Please provide the description of the impacts relate to waste generated in the organization’s own activities or to waste generated upstream or downstream in its value chain. Impacts: effect the organization has or could have on the economy,environment, and people, including on their human rights, which in turn can indicate its contribution (negative or positive) to sustainable development.",
            "ui:haddingdisplay": "block",
            "ui:titlediplay": "block",
            "ui:haddingtooltipdisplay": "block",
            "ui:titletooltipdisplay": "none",
            "ui:Gri": "GRI 306-1b",
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
const Significantwasteimpact = () => {
    const [formData, setFormData] = useState([{}]);  
    const [r_schema, setRemoteSchema] = useState({})
    const [r_ui_schema, setRemoteUiSchema] = useState({})

  const handleChange = (e) => {
    setFormData(e.formData);
  };

  // The below code on updateFormData 
  const updateFormData = async () => {
    const data = {
      client_id : client_id,
      user_id : user_id,
      path: view_path,
      form_data: formData
    }

    const url = `${process.env.BACKEND_API_URL}/datametric/update-fieldgroup`
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
    const base_url = `${process.env.BACKEND_API_URL}/datametric/get-fieldgroups?path=`;
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

export default Significantwasteimpact;
