
'use client'
import React, { useState,useEffect  } from 'react';
import Form from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
import { MdInfoOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import CustomTableWidget5 from '../../../../../shared/widgets/Table/tableWidget5';
const widgets = {
    TableWidget: CustomTableWidget5,
};

const schema = {
    type: 'array',
    items: {
        type: 'object',
        properties: {
            yearsold30: { type: "number", title: "< 30 years old" },
            yearsold30to50: { type: "number", title: "30 - 50 years old" },
            yearsold50: { type: "number", title: "> 50 years old" },
            total: { type: "number", title: "Total" },

        },
    },
};

const uiSchema = {
    "ui:widget": "TableWidget",
    'ui:options': {
        titles: [
            { key: "yearsold30", title: "< 30 years old"},
            { key: "yearsold30to50", title: "30 - 50 years old"},
            { key: "yearsold50", title: "> 50 years old"},

        ],
        rowLabels: [
            {title:"Male"},
            {title:"Female"},
            {title:"Others"},

        ]
    },
};

const Tab2 = ({fullName}) => {

    const [formData, setFormData] = useState([
        { yearsold30: "", yearsold30to50: "", yearsold50: "", total: 0 },
        { yearsold30: "", yearsold30to50: "", yearsold50: "", total: 0 },
        { yearsold30: "", yearsold30to50: "", yearsold50: "", total: 0 },
    ]);


    const handleChange = (e) => {
        setFormData(e.formData); // Ensure you are extracting formData from the event
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form data:', formData);

    };

    return (
        <>
            <div className="mx-2 p-3 mb-6 rounded-md">

                <Form
                    schema={schema}
                    uiSchema={uiSchema}
                    formData={formData}
                    onChange={handleChange}
                    validator={validator}
                    formContext={{ newMonth: fullName }}
                    widgets={widgets}
                />
                <div className='mb-8'>
                    <button type="button" className="text-center py-1 text-sm w-[100px] bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline float-end" onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        </>
    );
};

export default Tab2;
