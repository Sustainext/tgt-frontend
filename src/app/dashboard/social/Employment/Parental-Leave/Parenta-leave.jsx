import React, { useState } from 'react';
import Form from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
import { MdInfoOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import CustomTableWidget3 from '../../../../shared/widgets/Table/tableWidget3';
const widgets = {
    TableWidget: CustomTableWidget3,
};

const schema = {
    type: 'array',
    items: {
        type: 'object',
        properties: {
            male: { type: "string", title: "male" },
            female: { type: "string", title: "female" },
            total: { type: "number", title: "Total" },

        },
    },
};

const uiSchema = {
    "ui:widget": "TableWidget",
    'ui:options': {
        titles: [
            { key: "male", title: "Male"},
            { key: "female", title: "Female"},

        ],
        rowLabels: [
            {title:"Parental Leave Entitlement",tooltip:"This section refers to the total number of employees who meet the eligibility criteria for parental leave within the organization, regardless of whether they actually took leave."},
            {title:"Taking parental leave",tooltip:"This section refers to the total number of employees who used their parental leave entitlement during the reporting period."},
            {title:"Returning to Work Post-Leave",tooltip:"This section refers to the total number of employees who returned to work after their parental leave ended within the reporting period."},
            {title:"Retained 12 Months After Leave",tooltip:"This section refers to the total number of employees who used their parental leave entitlement during the reporting period."},
        ]
    },
};

const Parentaleavescreen = () => {
    const [formData, setFormData] = useState([
        { male: "", female: "", total: 0 },
        { male: "", female: "", total: 0 },
        { male: "", female: "", total: 0 },
        { male: "", female: "", total: 0 },
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
            <div className="mx-2 p-3 mb-6 rounded-md" style={{ boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px" }}>
                <div className='mb-4 flex'>
                    <div className='w-[80%]'>
                        <h2 className='flex mx-2 text-[17px] text-gray-500 font-semibold mb-2'>
                        Parental leave
                            <MdInfoOutline data-tooltip-id={`tooltip-employees`}
                                data-tooltip-content="This section documents data corresponding
                                to the number of employees entitled to, taking,
                               returning from, and remaining employed after
                               parental leave, broken down by gender." className="mt-1.5 ml-2 text-[14px]" />
                            <ReactTooltip id={`tooltip-employees`} place="top" effect="solid" style={{
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
                    <div className='w-[40%] flex'>
                        <div className="bg-sky-100 h-[25px] w-[70px] rounded-md mx-2 float-end">
                            <p className="text-[#395f81] text-[10px] inline-block align-middle px-2 font-semibold">
                                GRI 401-3a
                            </p>
                        </div>
                        <div className="bg-sky-100 h-[25px] w-[70px] rounded-md mx-2 float-end">
                            <p className="text-[#395f81] text-[10px] inline-block align-middle px-2 font-semibold">
                                GRI 401-3b
                            </p>
                        </div>
                        <div className="bg-sky-100 h-[25px] w-[70px] rounded-md mx-2 float-end">
                            <p className="text-[#395f81] text-[10px] inline-block align-middle px-2 font-semibold">
                                GRI 401-3c
                            </p>
                        </div>
                        <div className="bg-sky-100 h-[25px] w-[70px] rounded-md mx-2 float-end">
                            <p className="text-[#395f81] text-[10px] inline-block align-middle px-2 font-semibold">
                                GRI 401-3d
                            </p>
                        </div>
                    </div>
                </div>
                <Form
                    schema={schema}
                    uiSchema={uiSchema}
                    formData={formData}
                    onChange={handleChange}
                    validator={validator}
                    widgets={widgets}
                />
                <div className='mb-8'>
                    <button type="button" className="text-center py-1 text-sm w-[100px] bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline float-end" onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        </>
    );
};

export default Parentaleavescreen;
