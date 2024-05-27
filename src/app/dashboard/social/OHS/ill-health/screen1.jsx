'use client'
import React, { useState } from 'react';
import Form from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
import CustomTableWidget from "../../../../shared/widgets/tableWidget"
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
            employeeCategory: { type: "string", title: "employeeCategory" },
            fatalities: { type: "string", title: "fatalities" },
            highconsequence: { type: "string", title: "highconsequence" },
            recordable: { type: "string", title: "recordable" },

        },
    },
};

const uiSchema = {
    "ui:widget": "TableWidget",
    'ui:options': {
        titles:
            [
                { title: "Employee Category", tooltip: "Please specify the employee category here." },
                { title: "Number of fatalities as a result of work-Ill health", tooltip: "Please specify the number of fatalities as a result of work-related ill health. Work-related ill health: negative impacts on health arising from exposure to hazards at work." },
                { title: "Number of cases of recordable work-related ill health", tooltip: "Please specify the number of recordable work-related ill health. Recordable work-related ill health: work-related injury or ill health that results in any of the following: death, days away from work,restricted work or transfer to another job, medical treatment beyond first aid, or loss of consciousness" },
                { title: "Main types of work-related ill health.", tooltip: "Please specify the main types of work-related ill health." },



            ],

    },
};
const Screen1 = () => {
    const [formData, setFormData] = useState([{
        employeeCategory: "",
        fatalities: "",
        highconsequence: "",
        recordable: "",

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
            employeeCategory: "",
            fatalities: "",
            highconsequence: "",
            recordable: "",

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
                        <h2 className='flex mx-2 text-[15px] text-gray-500 font-semibold mb-2'>
                        Ill health
                            <MdInfoOutline data-tooltip-id={`tooltip-$e1`}
                                data-tooltip-content="This section documents
                                data corresponding to
                                the number of fatalities
                                as a result of a
                                work-related ill health,
                                recordable work-related
                                ill health and type of
                                work-related ill health
                                for all employees. " className="mt-1.5 ml-2 text-[14px]" />
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
                        <h2 className='flex mx-2 text-[11px] text-gray-500 font-semibold mb-2'>
                        For all employees, please report the following

                        </h2>
                    </div>

                    <div className='w-[20%]'>
                        <div className="bg-sky-100 h-[25px] w-[75px] rounded-md mx-2 float-end">
                            <p className="text-[#395f81] text-[10px] inline-block align-middle px-2 font-semibold">
                                GRI 403-10a
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
