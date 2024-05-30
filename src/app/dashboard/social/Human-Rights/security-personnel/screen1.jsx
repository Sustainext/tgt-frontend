'use client'
import React, { useState } from 'react';
import Form from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
import CustomTableWidget from "../../../../shared/widgets/Table/tableWidget"
import { MdAdd, MdOutlineDeleteOutline, MdInfoOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
// Simple Custom Table Widget
const widgets = {
    TableWidget: CustomTableWidget,

};
const schema = {
    type: 'array',
    items: {
        type: 'object',
        properties: {
            category: { type: "string", title: "category" },
            securitypersonnel: { type: "string", title: "securitypersonnel" },
            organization: { type: "string", title: "organization" },
            thirdpartyorganizations: { type: "string", title: "thirdpartyorganizations" },


        },
    },
};

const uiSchema = {
    "ui:widget": "TableWidget",
    'ui:options': {
        titles:
            [
                { title: "", tooltip: "Please specify the name and type of operations considered to have significant risk for incidents of forced or compulsory labor.",display:"none" },
                { title: "Number of Security Personnel", tooltip: "Please specify the total number of security personnel whether they have received training or not." },
                { title: "Employees of the Organization", tooltip: "Indicate the number of security personnel which are employees of the organization and who have received formal training." },
                { title: "Employees of third-party organizations", tooltip: "Indicate the number of security personnel  which are employees of third-party organizations and who have received formal training." },



            ],

    },
};
const Screen1 = () => {
    const [formData, setFormData] = useState([{
        category: "",
        securitypersonnel: "",
        organization: "",
        thirdpartyorganizations: "",

    }]);

    const handleChange = (e) => {
        setFormData(e.formData);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form data:', formData);
    };

    const handleAddCommittee = () => {
        const newCommittee = {
            category: "",
            securitypersonnel: "",
            organization: "",
            thirdpartyorganizations: "",


        };
        setFormData([...formData, newCommittee]);
    };

    const handleRemoveCommittee = (index) => {
        const newFormData = formData.filter((_, i) => i !== index);
        setFormData(newFormData);
    };

    return (
        <>
            <div className="mx-2 p-3 mb-6 rounded-md min-w-[700px] max-w-[1010px]" style={{ boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px" }}>
                <div className='mb-4 flex'>
                    <div className='w-[80%]'>
                        <h2 className='flex mx-2 text-[17px] text-gray-500 font-semibold mb-2'>
                        Security personnel who have received formal training
                            <MdInfoOutline data-tooltip-id={`tooltip-$e1`}
                                data-tooltip-content="This section documents the data corresponding to the operations
                                considered to have significant risk for incidents of forced or
                                compulsory labor." className="mt-1.5 ml-2 text-[14px]" />
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
                                GRI 410-1a
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
                        formContext={{
                            onRemove: handleRemoveCommittee
                        }}
                    />
                </div>
                <div className="flex right-1 mx-2">
                    <button type="button" className="text-[#007EEF] text-[13px] flex cursor-pointer mt-5 mb-5" onClick={handleAddCommittee}>
                    Add category  <MdAdd className='text-lg' />
                    </button>
                </div>

                <div className='mb-6'>
                    <button type="button" className="text-center py-1 text-sm w-[100px] bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline float-end" onClick={handleSubmit}>Submit</button>
                </div>
            </div>

        </>
    );
};

export default Screen1;
