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
            occupational: { type: "string", title: "Occupational" },
            generictraining: { type: "string", title: "Generic Training" },
            specificworkre: { type: "string", title: "Specific work-related hazards Meeting Frequency" },
            hazardousactivities: { type: "string", title: "Hazardous Activities" },
            hazardoussituations: { type: "string", title: "Hazardous Situations" }
        },
    },
};

const uiSchema = {
    "ui:widget": "TableWidget",
    'ui:options': {
        titles:
            [
                { title: "Occupational health and safety training provided to workers", tooltip: "Please specify the occupational health and safety training provided to workers by the organization." },
                { title: "Generic Training", tooltip: "Please describe any generic training provided to workers" },
                { title: "Specific work-related hazards", tooltip: "Please specify the meeting frequency" },
                { title: "Hazardous Activities", tooltip: "Provide a description of any  training related to hazardous activities is provided to workers." },
                { title: "Hazardous Situations", tooltip: "Provide a description of whether and, if so, why any workers are not represented by these committees.Exclude:  Information on which workers are or are not members of such committees" },


            ],

    },
};
const Ohstrainingscreen = () => {
    const [formData, setFormData] = useState([{
        occupational: "",
        generictraining: "",
        specificworkre: "",
        hazardousactivities: "",
        hazardoussituations: ""
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
            occupational: "",
            generictraining: "",
            specificworkre: "",
            hazardousactivities: "",
            hazardoussituations: ""
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
                        Occupational health and safety training
                            <MdInfoOutline data-tooltip-id={`tooltip-$e1`}
                                data-tooltip-content="This section documents data corresponding to the
                                occupational health and safety training provided to workers.
                                Include: Generic training as well as training on specific
                                work-related hazards, hazardous activities, or hazardous situations" className="mt-1.5 ml-2 text-[14px]" />
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

                    <div className='w-[20%]'>
                        <div className="bg-sky-100 h-[25px] w-[70px] rounded-md mx-2 float-end">
                            <p className="text-[#395f81] text-[10px] inline-block align-middle px-2 font-semibold">
                                GRI 403-5a
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

export default Ohstrainingscreen;
