'use client'
import React, { useState } from 'react';
import Form from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
import inputWidget2 from '../../../../shared/widgets/inputWidget2';
import { MdAdd, MdOutlineDeleteOutline, MdInfoOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import RadioWidget2 from '../../../../shared/widgets/radioWidget2';

const widgets = {
    inputWidget: inputWidget2,
    RadioWidget2:RadioWidget2,
};

const schema = {
    type: 'array',
    items: {
        type: 'object',
        properties: {
            Q1: {
                type: "string",
                title: "Are there any workers have been excluded from this disclosure?",
                enum: [
                    'Yes',
                    'No',

                ],
            },
            Q2: {
                type: "string",
                title: "Why the workers are excluded",

            },
            Q3: {
                type: "string",
                title: "The types of workers excluded",

            },


        },
    },
};

const uiSchema = {
    items: {
        'ui:order': ['Q1', 'Q2','Q3'],
        Q1: {
            "ui:title": "Are there any workers have been excluded from this disclosure?",
            "ui:tooltip": "Indicate whether any workers have been excluded by the occupational health and safety management system. ",
            "ui:tooltipdisplay": "block",
            'ui:widget': 'RadioWidget2',
            'ui:horizontal': true,
            'ui:options': {
                label: false // This disables the label for this field
            },
        },
        Q2: {
            "ui:title": "Why the workers are excluded",
            "ui:tooltip": "Mention the reason for exclusion of the workers (if any)",
            "ui:tooltipdisplay": "block",
            'ui:widget': 'inputWidget',
            'ui:horizontal': true,
            'ui:options': {
                label: false // This disables the label for this field
            },
        },
        Q3: {
            "ui:title": "The types of workers excluded",
            "ui:tooltip": "Specify the types of workers that have been excluded.E.g. full-time, part-time, non-guaranteed hours, permanent or temporary basis, type or degree of control (e.g., control of work or workplace, sole or shared control), location etc.",
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

    const handleChange = (e) => {
        setFormData(e.formData);
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission
        console.log('Form data:', formData);
    };

    return (
        <>
             <div className="mx-2 p-3 mb-6 rounded-md" style={{boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px"}}>
                <div className='mb-4 flex'>
                    <div className='w-[80%]'>
                    <h2 className='flex mx-2 text-[14px] text-gray-500 font-semibold'>
                    Workers excluded & type of workers excluded
                        <MdInfoOutline data-tooltip-id={`tooltip-$e1`}
                            data-tooltip-content="This section documents data corresponding
                            to the workers that have been excluded from this disclosure.
                            Include: The types of worker excluded " className="mt-1.5 ml-2 text-[14px]" />
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
              GRI 403-8b
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

export default Screen2;
