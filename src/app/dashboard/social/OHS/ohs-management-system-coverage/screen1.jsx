import React, { useState } from 'react';
import Form from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
import CustomTableWidget2 from '../../../../shared/widgets/tableWidget2';
import { MdInfoOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

const widgets = {
    TableWidget: CustomTableWidget2,
};

const schema = {
    type: 'array',
    items: {
        type: 'object',
        properties: {
            coveredbythesystem: { type: "string", title: "coveredbythesystem" },
            internallyaudited: { type: "string", title: "internallyaudited" },
            externalparty: { type: "string", title: "externalparty" },

        },
    },
};

const uiSchema = {
    "ui:widget": "TableWidget",
    'ui:options': {
        titles: [
            { key: "coveredbythesystem", title: "Number of employees", tooltip: "Please specify the number of all employees." },
            { key: "internallyaudited", title: "Number of workers who are not employees but whose work and/or workplace is controlled by the organization", tooltip: "Specify the number of workers who are not employees but whose work and/or workplace is controlled by the organization" },
            { key: "externalparty", title: "Total number of employees", tooltip: "Specify the total number of employees." },

        ],
        rowLabels: ["Covered by the system", "Internally audited", "Audited or certified by an external party."]
    },
};

const Screen1 = () => {
    const [formData, setFormData] = useState([
        { coveredbythesystem: "", internallyaudited: "", externalparty: "" },
        { coveredbythesystem: "", internallyaudited: "", externalparty: "" },
        { coveredbythesystem: "", internallyaudited: "", externalparty: "" }
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
                        <h2 className='flex mx-2 text-[15px] text-gray-500 font-semibold mb-2'>
                            Number of employees/workers who are not employees
                            <MdInfoOutline data-tooltip-id={`tooltip-employees`}
                                data-tooltip-content="This section documents data corresponding to the number of all employees and workers who are not employees but whose work and/or workplace is controlled by the organization." className="mt-1.5 ml-2 text-[14px]" />
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
                    <div className='w-[20%]'>
                        <div className="bg-sky-100 h-[25px] w-[70px] rounded-md mx-2 float-end">
                            <p className="text-[#395f81] text-[10px] inline-block align-middle px-2 font-semibold">
                                GRI 403-8a
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
                <div className='mb-6'>
                    <button type="button" className="text-center py-1 text-sm w-[100px] bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline float-end" onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        </>
    );
};

export default Screen1;
