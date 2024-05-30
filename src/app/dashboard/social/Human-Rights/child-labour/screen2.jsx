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
            hazardouswork: { type: "string", title: "hazardouswork" },
            TypeofOperation: { type: "string", title: "TypeofOperation" },
            geographicareas: { type: "string", title: "geographicareas" },


        },
    },
};

const uiSchema = {
    "ui:widget": "TableWidget",
    'ui:options': {
        titles:
            [
                { title: "Operations considered to have significant risk of young workers exposed to hazardous work", tooltip: "Please indicate the operations considered to have significant risk for incidents of young workers exposed to hazardous work. " },
                { title: "Type of Operation", tooltip: "This section allows you to enter the type of operation in which workers’ rights to exercise freedom of association or collective bargaining may be violated or at significant risk. " },
                { title: "Countries or Geographic Areas", tooltip: "This section allows you to enter the countries or geographic area with operations considered at risk young workers exposed to hazardous work" },

            ],

    },
};
const Screen2 = () => {
    const [formData, setFormData] = useState([{
        hazardouswork: "",
        TypeofOperation: "",
        geographicareas: "",

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
            hazardouswork: "",
            TypeofOperation: "",
            geographicareas: "",


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
                        Operations at significant risk for incidents of young workers exposed to hazardous work
                            <MdInfoOutline data-tooltip-id={`tooltip-$e1`}
                                data-tooltip-content="This section documents the data corresponding to the operations considered to
                                have significant risk for incidents of young workers exposed to hazardous work.  section .documents the data corresponding to the
                                operations considered to have significant risk for incidents of child labor" className="mt-1.5 ml-2 text-[14px]" />
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

                    <div className='w-[25%] flex'>
                        <div className="bg-sky-100 h-[25px] w-[75px] rounded-md mx-2 float-end">
                            <p className="text-[#395f81] text-[10px] inline-block align-middle px-2 font-semibold">
                                GRI 408-1a
                            </p>
                        </div>
                        <div className="bg-sky-100 h-[25px] w-[75px] rounded-md mx-2 float-end">
                            <p className="text-[#395f81] text-[10px] inline-block align-middle px-2 font-semibold">
                                GRI 408-1b
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

export default Screen2;
