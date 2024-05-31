'use client'
import React, { useState, useEffect } from 'react';
import Form from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
import inputWidget2 from '../../../../shared/widgets/Input/inputWidget2';
import { MdAdd, MdOutlineDeleteOutline, MdInfoOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import RadioWidget2 from '../../../../shared/widgets/Input/radioWidget2';
import axios from 'axios';

const widgets = {
    inputWidget: inputWidget2,
    RadioWidget2:RadioWidget2,
};

const view_path = 'gri-social-ohs-403-2b-quality_of_services'
const client_id = 1
const user_id = 1

const schema = {
    type: 'array',
    items: {
        type: 'object',
        properties: {
            Q1: {
                type: "string",
                title: "Does the organization ensure the quality of these services and facilitate workers access",
                enum: [
                    'Yes',
                    'No',

                ],
            },
            Q2: {
                type: "string",
                title: "How the organization ensure the quality of these services and facilitate workers access",

            },


        },
    },
};

const uiSchema = {
    items: {
        'ui:order': ['Q1', 'Q2'],
        Q1: {
            "ui:title": "Does the organization ensure the quality of these services and facilitate workers access",
            "ui:tooltip": "Indicate whether the organization ensures the quality of the services and facilitates worker access.",
            "ui:tooltipdisplay": "block",
            'ui:widget': 'RadioWidget2',
            'ui:horizontal': true,
            'ui:options': {
                label: false // This disables the label for this field
            },
        },
        Q2: {
            "ui:title": "How the organization ensure the quality of these services and facilitate workers access",
            "ui:tooltip": "Describe how the organization ensures the quality of the services and facilitates worker access.Include:  1) How the organization maintains the confidentiality of workers’ personal health related information. 2)How the organization ensures that workers’ personal health-related information and their participation in any occupational health services is not used for any favorable or unfavorable treatment of workers",
            "ui:tooltipdisplay": "block",
            'ui:widget': 'inputWidget',
            'ui:horizontal': true,
            'ui:options': {
                label: false // This disables the label for this field
            },
        },


        'ui:options': {
            orderable: false, // Prevent reordering of items
            addable: false, // Prevent adding items from UI
            removable: false, // Prevent removing items from UI
            layout: 'horizontal', // Set layout to horizontal
        },
    },
};

const Screen2 = () => {
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
        e.preventDefault(); // Prevent the default form submission
        console.log('Form data:', formData);
        updateFormData();
    };

    return (
        <>
             <div className="mx-2 p-3 mb-6 rounded-md" style={{boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px"}}>
                <div className='mb-4 flex'>
                    <div className='w-[80%]'>
                    <h2 className='flex mx-2 text-[17px] text-gray-500 font-semibold'>
                    Quality of services and facilitation of workers access
                        <MdInfoOutline data-tooltip-id={`tooltip-$e1`}
                            data-tooltip-content="This section documents data corresponding to the
                            quality of the services and facilitation of workers access.
                            " className="mt-1.5 ml-2 text-[14px]" />
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

                    <div   className='w-[20%]'>
            <div className="bg-sky-100 h-[25px] w-[70px] rounded-md mx-2 float-end">
              <p className="text-[#395f81] text-[10px] inline-block align-middle px-2 font-semibold">
              GRI 403-2b
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
                    />
                </div>
                <div className='mb-6'>
                    <button type="button" className="text-center py-1 text-sm w-[100px] bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline float-end" onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        </>
    );
};

export default Screen2;
