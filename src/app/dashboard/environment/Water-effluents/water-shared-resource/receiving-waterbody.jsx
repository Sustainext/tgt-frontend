'use client'
import React, { useState, useEffect } from 'react';
import Form from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
import TextareaWidget from '../../../../shared/widgets/TextareaWidget';
import { GlobalState } from '../../../../../Context/page';
import { MdKeyboardArrowDown, MdInfoOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import selectWidget2 from "../../../../shared/widgets/selectWidget2"
import axios from 'axios';

const widgets = {
    TextareaWidgetnew: TextareaWidget,
    selectWidget: selectWidget2,
};

const view_path = 'gri-environment-water-303-2a-profile_receiving_waterbody'
const client_id = 1
const user_id = 1

const schema = {
    type: 'object',
    properties: {
        Q1: {
            type: "string",
            enum: ['Yes', 'No'],
            title: "option"
        }
    }
};



const uiSchema = {
    Q1: {

        "ui:widget": "selectWidget",
        'ui:options': {
            label: false // This disables the label for this field
        },
    }
};

const Receivingwaterbody = () => {
    const { open } = GlobalState();
    const [formData, setFormData] = useState([{ Q1: '', details: '' }]); // Initial form data
    const [r_schema, setRemoteSchema] = useState({})
    const [r_ui_schema, setRemoteUiSchema] = useState({})

    const handleChange = ({ formData }) => {
        setFormData(formData);
    };

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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form data:', formData);
        updateFormData()
    };

    return (
        <>
            <div>
                <div className='flex mb-2'>
                    <div className='w-[80%]'>
                        <h2 className="text-sm font-medium text-[#344054]">Profile of Receiving Waterbody</h2>
                        <p className='text-sm text-[#727272] w-[560px] flex'>Have you considered the profile of the receiving waterbody?
                            <MdInfoOutline data-tooltip-id={`tooltip-$e1`}
                                data-tooltip-content="Do you consider the profile of the receiving waterbody? if yes then please specify" className="mt-1 ml-2 text-[14px]" />
                            <ReactTooltip id={`tooltip-$e1`} place="top" effect="solid" style={{
                                width: "290px", backgroundColor: "#000",
                                color: "white",
                                fontSize: "12px",
                                boxShadow: 3,
                                borderRadius: "8px",
                                textAlign: 'left',
                            }}>

                            </ReactTooltip>
                        </p>

                    </div>
                    <div>
                        <div className={`${open ? "w-[20%]" : "w-[20%]"}`}  >
                            <div className="bg-sky-100 h-[25px] w-[70px] rounded-md mx-2">
                                <p className="text-[#395f81] text-[10px] inline-block align-middle px-2 font-semibold">
                                    GRI 303-2a
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <Form
                    schema={r_schema}
                    formData={formData}
                    onChange={handleChange}
                    uiSchema={r_ui_schema}
                    validator={validator}
                    widgets={widgets} // Make sure this is passed to the Form
                >
                    {formData.Q1 === 'Yes' && (
                        <>
                            <h2 className='mb-2 text-sm'>If yes please specify</h2>
                            <textarea
                                placeholder="Enter a description..."
                                className={`backdrop:before:w-[48rem] border appearance-none text-xs border-gray-400 text-neutral-600 pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer ${open
                                    ? "sm:w-[48rem] md:w-[89%] lg:w-[87%] xl:w-[90.5%] 2xl:w-[85%]"
                                    : "sm:w-[85%] md:w-[92%] lg:w-[88%] xl:w-[88.5%] 2xl:sm:w-[86%]"
                                    }`}
                                id="details"
                                value={formData.details}
                                onChange={e => setFormData({ ...formData, details: e.target.value })}
                                rows={7}
                            />
                        </>
                    )}

                </Form>
                <div className='mb-4'>
                    <button type="button" className=" text-center py-1 text-sm w-[100px] bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline float-end" onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        </>
    );
};

export default Receivingwaterbody;
