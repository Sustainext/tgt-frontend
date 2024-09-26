'use client'
import React, { useState, useEffect, useRef } from 'react';
import Form from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
import CustomTableWidget10 from "../../../../shared/widgets/Table/tableWidget10";
import { MdInfoOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import { Oval } from 'react-loader-spinner';

// Simple Custom Table Widget
const widgets = {
    TableWidget: CustomTableWidget10,
};

const schema = {
  type: "object",
  properties: {
    categories: {
      type: "array",
      items: {
        type: "object",
        properties: {
          category: { type: "string", title: "Category" },
          numberperformancereview: { type: "number", title: "Number Performance Review" },
          numberdevelopmentreview: { type: "number", title: "Number Development Review" },
        }
      }
    },
    genderData: {
      type: "object",
      properties: {
        male: { type: "number", title: "Male 1" },
        male2: { type: "number", title: "Male 2" },
        female: { type: "number", title: "Female 1" },
        female2: { type: "number", title: "Female 2" },
        nonBinary: { type: "number", title: "Others 1" },
        nonBinary2: { type: "number", title: "Others 2" },
        totalTrainingHours: { type: "number", title: "Total Training Hours" },
        totalTrainingHours2: { type: "number", title: "Total Training Hours2" },
      }
    }
  }
};

const uiSchema = {
  categories: {
    "ui:widget": "TableWidget",
    "ui:options": {
      titles: [
        { title: "Employee Details", tooltip: "Please specify the category." },
        { title: "Performance Reviews", tooltip: "Details on performance reviews." },
        { title: "Development Reviews", tooltip: "Details on development reviews." },
      ],
      tbtilte: [
        { title: "Employee Category", tooltip: "Please specify the category.", rowSpan: 2 },
      ],
    }
  },
  genderData: {
    "ui:widget": "TableWidget",
    "ui:options": {
      titles: [
        { title: "Gender-Specific Data", tooltip: "Please provide detailed gender data." }
      ],
      tbtilte: [
        { title: "Gender Details", tooltip: "Please specify detailed data for genders.", rowSpan: 2 }
      ],
      subTitles: [
        { title: "Male", tooltip: "Number of male employees.", colSpan: 1, type: "number" },
        { title: "Male 2", tooltip: "Number of male employees.", colSpan: 1, type: "number" },
        { title: "Female", tooltip: "Number of female employees.", colSpan: 1, type: "number" },
        { title: "Female 2", tooltip: "Number of female employees.", colSpan: 1, type: "number" },
        { title: "nonBinary", tooltip: "Number of other gender employees.", colSpan: 1, type: "number" },
        { title: "nonBinary 2", tooltip: "Number of other gender employees.", colSpan: 1, type: "number" },
        { title: "Total number of Employee", tooltip: "Please specify the total number of employees.", colSpan: 1, type: "number" }
      ],
    }
  }
};

const ScreenTemp = ({ location, year, month }) => {
    const initialFormData = {
      categories: [
        {
          category: "",
          numberperformancereview: "",
          numberdevelopmentreview: "",
        }
      ],
      genderData: {
        male: "",
        male2: "",
        female: "",
        female2: "",
        nonBinary: "",
        nonBinary2: "",
        totalTrainingHours: "",
        totalTrainingHours2: "",
      }
    };

    const [formData, setFormData] = useState(initialFormData);
    const [loopen, setLoOpen] = useState(false);
    const toastShown = useRef(false);

    const LoaderOpen = () => {
        setLoOpen(true);
    };
    const LoaderClose = () => {
        setLoOpen(false);
    };

    const handleChange = (e) => {
        setFormData(e.formData);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form data:', formData);
    };

    const handleRemoveCategory = (index) => {
      setFormData(prevData => ({
        ...prevData,
        categories: prevData.categories.filter((_, i) => i !== index)
      }));
    };

    return (
        <>
            <div className="mx-2 p-3 mb-6 rounded-md" style={{ boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px" }}>
                <div className='mb-4 flex'>
                   <div className="w-[80%] relative">
                        <h2 className="flex mx-2 text-[15px]  font-bold mb-2">
                            Number of suppliers identified having significant actual and potential negative social impacts.
                            <MdInfoOutline data-tooltip-id="tooltip-e1"
                                data-tooltip-content="This section documents the data corresponding to the number of
suppliers identified as having significant actual and potential
negative social impacts." className="mt-1.5 ml-2 text-[14px]" />
                            <ReactTooltip id="tooltip-e1" place="top" effect="solid" style={{
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
                                GRI 414-2b
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
                            onRemove: handleRemoveCategory,
                        }}
                    />
                </div>

                <div className='mb-6'>
                    <button type="button"
                        className="text-center py-1 text-sm w-[100px] bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline float-end"
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                </div>
            </div>
            {loopen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <Oval
                        height={50}
                        width={50}
                        color="#00BFFF"
                        secondaryColor="#f3f3f3"
                        strokeWidth={2}
                        strokeWidthSecondary={2}
                    />
                </div>
            )}
        </>
    );
};

export default ScreenTemp;
