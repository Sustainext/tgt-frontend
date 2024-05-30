
'use client'
import React, { useState,useEffect  } from 'react';
import Form from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
import { MdInfoOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import CustomTableWidget6 from '../../../../../shared/widgets/Table/tableWidget6';
const widgets = {
    TableWidget: CustomTableWidget6,
};

const schema = {
    type: 'array',
    items: {
        type: 'object',
        properties: {
            yearsold30: { type: "number", title: "< 30 years old" },
            yearsold30to50: { type: "number", title: "30 - 50 years old" },
            yearsold50: { type: "number", title: "> 50 years old" },
            beginning: { type: "number", title: "Total1" },
            end: { type: "number", title: "Total2" },
        },
    },
};

const uiSchema = {
    "ui:widget": "TableWidget",
    'ui:options': {
        titles: [
            { key: "yearsold30", title: "< 30 years old", tooltip:"Please mention the total  employees <30 years old who has left the organisation. Employee Turnover definition: employees who leave the organization voluntarily or due to dismissal, retirement, or death in service."},
            { key: "yearsold30to50", title: "30 - 50 years old", tooltip:"Please mention the total  employees 30-50 years old who has left the organisation. Employee Turnover definition: employees who leave the organization voluntarily or due to dismissal, retirement, or death in service."},
            { key: "yearsold50", title: "> 50 years old", tooltip:"Please mention the total  employees >50 years old who has left the organisation. Employee Turnover definition: employees who leave the organization voluntarily or due to dismissal, retirement, or death in service."},

        ],
        rowLabels: [
            {title:"Male", tooltip:"Please mention the total male employee who has left the organisation. Employees Turnover definition: employees who leave the organization voluntarily or due to dismissal, retirement, or death in service."},
            {title:"Female",tooltip:"Please mention the total female employees who left the organization. Employee Turnover definition: employees who leave the organization voluntarily or due to dismissal, retirement, or death in service."},
            {title:"Others",tooltip:"Please mention the total non-binary employees who has left the organisation. Employee Turnover definition: employees who leave the organization voluntarily or due to dismissal, retirement, or death in service."},

        ]
    },
};

const Tab4 = ({fullName}) => {

    const [formData, setFormData] = useState([
        { yearsold30: "", yearsold30to50: "", yearsold50: "", beginning:"", end:"" },
        { yearsold30: "", yearsold30to50: "", yearsold50: "", beginning:"", end:"" },
        { yearsold30: "", yearsold30to50: "", yearsold50: "", beginning:"", end:'' },
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

export default Tab4;
