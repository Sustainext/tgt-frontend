import React, { useState } from 'react';
import Form from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
import { MdAdd, MdOutlineDeleteOutline, MdInfoOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import CustomTableWidget4 from '../../../../shared/widgets/Table/tableWidget4';
const widgets = {
    TableWidget: CustomTableWidget4,
};

const schema = {
    type: 'array',
    items: {
        type: 'object',
        properties: {
            benefits: { type: "string", title: "Benefits" },
            fulltime: { type: "boolean", title: "Full-Time Employees" },
            parttime: { type: "boolean", title: "Part-Time Employees" },
            temporary: { type: "boolean", title: "Temporary Employees" },
            location: { type: "string", title: "Significant location of operations" }
        },
    },
};

const uiSchema = {
    "ui:widget": "TableWidget",
    'ui:options': {
        types: {
            benefits: "string",
            fulltime: "boolean",
            parttime: "boolean",
            temporary: "boolean",
            location: "string"
        },
        titles: [
            { title: "Benefits", tooltip: "benefit definition: direct benefit provided in the form of financial contributions, care paid for by the organization, or the reimbursement of expenses borne by the employee. Example: Life Insurance, Health Care, Coverage, Parental Leave, Retirement Provision, Stock Ownership etc. " },
            { title: "Full-Time Employees", tooltip: "Please select if this benefit is standard for all full-time employees. Unselect if it's not offered." },
            { title: "Part-Time Employees", tooltip: "Please select if this benefit is standard for all Part-time employees. Unselect if it's not offered." },
            { title: "Temporary Employees", tooltip: "Please select if this benefit is standard for all Temporary employees. Unselect if it's not offered." },
            { title: "Significant location of operations", tooltip: "This section allows you to enter the organization's significant locations of operation where the listed benefit is offered to full-time or part-time employees." },
        ],
    },
};
const initialBenefits = [
    { benefits: "Life Insurance", fulltime: false, parttime: false, temporary: false, location: "" },
    { benefits: "Disability & Invalidity Coverage", fulltime: false, parttime: false, temporary: false, location: "" },
    { benefits: "Parental Leave", fulltime: false, parttime: false, temporary: false, location: "" },
    { benefits: "Retirement Provision", fulltime: false, parttime: false, temporary: false, location: "" },
    { benefits: "Stock Ownership", fulltime: false, parttime: false, temporary: false, location: "" },
    { benefits: "Others", fulltime: false, parttime: false, temporary: false, location: "" }
];
const Benefitsscreen = () => {
    const [formData, setFormData] = useState(initialBenefits);

    const handleChange = (e) => setFormData(e.formData);
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form data:', formData);
    };
    const handleAddCommittee = () => {
        const newEntry = { benefits: "", fulltime: false, parttime: false, temporary: false, location: "" };
        setFormData(formData => [...formData, newEntry]); // Use a functional update to ensure the latest state
    };

    const handleRemoveCommittee = (index) => setFormData(formData.filter((_, i) => i !== index));

    return (
        <>
            <div className="mx-2 p-3 mb-6 rounded-md" style={{ boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px" }}>
            <div className='mb-4 flex'>
                    <div className='w-[80%]'>
                        <h2 className='flex mx-2 text-[17px] text-gray-500 font-semibold mb-2'>
                        Benefits provided to full-time employees that are not provided to temporary or part-time employees
                            <MdInfoOutline data-tooltip-id={`tooltip-$e1`}
                                data-tooltip-content="This table documents data corresponding to the standard benefits offered to full-time employees
                                of the organization, which are generally not available to temporary or part-time employees." className="mt-1.5 ml-2 text-[14px]" />
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
                        {/* <h2 className='flex mx-2 text-[11px] text-gray-500 font-semibold mb-2'>
                        For all employees, please report the following

                        </h2> */}
                    </div>

                    <div className='w-[20%]'>
                        <div className="bg-sky-100 h-[25px] w-[75px] rounded-md mx-2 float-end">
                            <p className="text-[#395f81] text-[10px] inline-block align-middle px-2 font-semibold">
                                GRI 401-2a
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
                    formContext={{ onRemove: handleRemoveCommittee }}
                />
                        <div className="flex right-1 mx-2">
                    <button type="button" className="text-[#007EEF] text-[13px] flex cursor-pointer mt-5 mb-5" onClick={handleAddCommittee}>
                    Add more  <MdAdd className='text-lg' />
                    </button>
                </div>

                <div className='mb-6'>
                    <button type="button" className="text-center py-1 text-sm w-[100px] bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline float-end" onClick={handleSubmit}>Submit</button>
                </div>

            </div>
        </>
    );
};

export default Benefitsscreen;
