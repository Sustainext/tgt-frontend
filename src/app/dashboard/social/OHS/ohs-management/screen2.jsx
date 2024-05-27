'use client'
import React, { useState } from 'react';
import Form from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
import inputWidget2 from '../../../../shared/widgets/inputWidget2';
import { MdAdd, MdOutlineDeleteOutline, MdInfoOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import RadioWidget from '../../../../shared/widgets/radioWidget';

const widgets = {
    inputWidget: inputWidget2,
    RadioWidget: RadioWidget,
};

const schema = {
    type: 'array',
    items: {
        type: 'object',
        properties: {
            Q1: {
                type: "string",
                title: "Workers covered",
            },
            Q2: {
                type: "string",
                title: "Activities covered",

            },
            Q3: {
                type: "string",
                title: "Workplaces Covered",
            },
            Q4: {
                type: "string",
                title: "Exclusions (if any)",
            },
            Q5: {
                type: "string",
                title: "Reason for exclusion (if applicable)",
            },
        },
    },
};

const uiSchema = {
    items: {
        'ui:order': ['Q1', 'Q2', 'Q3', 'Q4', 'Q5'],
        Q1: {
            "ui:title": "Workers covered",
            "ui:tooltip": "Please mention the types of workers that are included in the scope of occupational health and safety management system.For example: Contractors, Temporary workers, Part-time employees, Interns, Volunteers, etc.",
            "ui:tooltipdisplay": "block",
            'ui:widget': 'inputWidget',
            'ui:horizontal': true,
            'ui:options': {
                label: false // This disables the label for this field
            },
        },
        Q2: {
            "ui:title": "Activities covered",
            "ui:tooltip": "Please mention the types of work activities that are covered in the scope of occupational health and safety management system. For example: Office work, Manual labor, Fieldwork, Manufacturing, Construction, Transportation, Research and development Maintenance, Customer service, Sales, etc.",
            "ui:tooltipdisplay": "block",
            'ui:widget': 'inputWidget',
            'ui:horizontal': true,
            'ui:options': {
                label: false // This disables the label for this field
            },
        },
        Q3: {
            "ui:title": "Workplaces Covered",
            "ui:tooltip": "Please mention the types of work activities that are covered in the scope of occupational health and safety management system. For example: Office work, Manual labor, Fieldwork, Manufacturing, Construction, Transportation, Research and development Maintenance, Customer service, Sales, etc.",
            "ui:tooltipdisplay": "block",
            'ui:widget': 'inputWidget',
            'ui:horizontal': true,
            'ui:options': {
                label: false // This disables the label for this field
            },
        },
        Q4: {
            "ui:title": "Exclusions (if any)",
            "ui:tooltip": "Please mention the locations or work environments where the scope of occupational health and safety management system apply. For example: Specific departments, Remote work locations, Client sites, Vehicles, Public spaces, etc.",
            "ui:tooltipdisplay": "block",
            'ui:widget': 'inputWidget',
            'ui:horizontal': true,
            'ui:options': {
                label: false // This disables the label for this field
            },
        },
        Q5: {
            "ui:title": "Reason for exclusion (if applicable)",
            "ui:tooltip": "Please provide the reason for exclusion, if applicable.",
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
                    Scope of workers, activities, and workplaces covered
                        <MdInfoOutline data-tooltip-id={`tooltip-$e1`}
                            data-tooltip-content="This section documents data regarding the specific workers, activities, and
                            workplaces encompassed by the occupational health and safety
                            management system. It highlights which groups of employees,
                            types of activities, and workplaces fall within the scope of the system,
                            and explains any exclusions that may exist." className="mt-1.5 ml-2 text-[14px]" />
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
              GRI 403-1b
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
