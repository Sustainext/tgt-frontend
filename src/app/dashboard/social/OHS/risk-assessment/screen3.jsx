'use client'
import React, { useState } from 'react';
import Form from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
import inputWidget2 from '../../../../shared/widgets/Input/inputWidget2';
import { MdAdd, MdOutlineDeleteOutline, MdInfoOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import RadioWidget from '../../../../shared/widgets/Input/radioWidget';
import RadioWidget2 from '../../../../shared/widgets/Input/radioWidget2';
const widgets = {
    inputWidget: inputWidget2,
    RadioWidget: RadioWidget,
    RadioWidget2:RadioWidget2,
};

const schema = {
    type: 'array',
    items: {
        type: 'object',
        properties: {

            Q1: {
                type: "string",
                title: "Right to refuse unsafe work",
                enum: [
                    'Yes',
                    'No',
                ],
            },
            Q2: {
                type: "string",
                title: "Policy and Process",

            },
            Q3: {
                type: "string",
                title: "Protection from Reprisals",
                enum: [
                    'Regular training',
                    'Safety incentives',
                    'Open communication culture',
                    'Positive feedback for reporting',
                    'Anonymous reporting options',

                ],
            },




        },
    },
};

const uiSchema = {
    items: {
        'ui:order': ['Q1', 'Q2', 'Q3'],

        Q1: {
            "ui:title": "Right to refuse unsafe work",
            "ui:tooltip": "Do workers have the right to refuse work they believe could cause injury or ill health?",
            "ui:tooltipdisplay": "block",
            'ui:widget': 'RadioWidget2',
            'ui:horizontal': true,
            'ui:options': {
                label: false // This disables the label for this field
            },
        },


        Q2: {
            "ui:title": "Policy and Process",
            "ui:tooltip": "Briefly describe the policy and process for workers to exercise their right to refuse unsafe work.For example: how workers notify supervisors, what triggers investigation, and how concerns are addressed.",
            "ui:tooltipdisplay": "block",
            'ui:widget': 'inputWidget',
            'ui:horizontal': true,
            'ui:options': {
                label: false // This disables the label for this field
            },
        },

        Q3: {
            "ui:title": "Protection from Reprisals",
            "ui:tooltip": "How are workers protected from reprisals for refusing unsafe work?",
            "ui:tooltipdisplay": "block",
            'ui:widget': 'RadioWidget',
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

const Screen3 = () => {
    const [formData, setFormData] = useState([{}]);

    const handleChange = (e) => {
        setFormData(e.formData);
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission
        console.log('Form data:', formData);
    };

    return (
        <>
            <div className="mx-2  p-3 mb-6 rounded-md" style={{boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px"}}>
                <div className='mb-4 flex'>
                    <div className='w-[80%]'>
                    <h2 className='flex mx-2 text-[17px] text-gray-500 font-semibold'>
                    Worker Right to Refuse Unsafe Work
                        <MdInfoOutline data-tooltip-id={`tooltip-$e1`}
                            data-tooltip-content="This section documents data corresponding to the organization's
                            processes for workers to report work-related hazards and hazardous
                            situations, along with the measures in place to protect workers
                            from reprisals for reporting." className="mt-1.5 ml-2 text-[14px]" />
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
              GRI 403-2c
              </p>
            </div>
          </div>
                </div>
                <div className='mx-2'>
                    <Form
                        schema={schema}
                        uiSchema={uiSchema}
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

export default Screen3;
