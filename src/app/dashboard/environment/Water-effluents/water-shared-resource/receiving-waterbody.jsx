'use client'
import React, { useState, useEffect } from 'react';
import Form from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
import TextareaWidget from '../../../../shared/widgets/TextareaWidget';
import { GlobalState } from '../../../../../Context/page';
import { MdKeyboardArrowDown, MdInfoOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import selectWidget2 from "../../../../shared/widgets/selectWidget2"
const widgets = {
    TextareaWidgetnew: TextareaWidget,
    selectWidget:selectWidget2,
};
const schema = {
    type: 'object',
    properties: {
        Q1: {
            type: "string",
            enum: ['Yes', 'No'],
        }
    }
};



const uiSchema = {
    Q1: {

        "ui:widget": "selectWidget",
        'ui:options': {
            label: false // This disables the label for this field
        },
    }
};

const Receivingwaterbody = () => {
    const { open } = GlobalState();
    const [formData, setFormData] = useState([{ Q1: '', details: '' }]); // Initial form data

    const handleChange = ({ formData }) => {
        setFormData(formData);
    };

        const handleSubmit = (e) => {
            e.preventDefault();
            console.log('Form data:', formData);
        };

        return (
            <>
                <div>
                    <div className='flex mb-2'>
                    <div className='w-[80%]'>
                    <h2 className="text-sm font-medium text-[#344054]">Profile of Receiving Waterbody</h2>
                    <p className='text-sm text-[#727272] w-[560px] flex'>Have you considered the profile of the receiving waterbody?
                    <MdInfoOutline data-tooltip-id={`tooltip-$e1`}
                            data-tooltip-content="Do you consider the profile of the receiving waterbody? if yes then please specify" className="mt-1.5 ml-2 text-[14px]" />
                        <ReactTooltip id={`tooltip-$e1`} place="top" effect="solid" style={{
                            width: "290px", backgroundColor: "#000",
                            color: "white",
                            fontSize: "12px",
                            boxShadow: 3,
                            borderRadius: "8px",
                            textAlign: 'left',
                        }}>

                        </ReactTooltip>
                    </p>

                    </div>
                    <div>
                    <div className={`${open ? "w-[20%]" : "w-[20%]"}`}  >
            <div className="bg-sky-100 h-[25px] w-[70px] rounded-md mx-2">
              <p className="text-[#395f81] text-[10px] inline-block align-middle px-2 font-semibold">
              GRI 303-2a
              </p>
            </div>
          </div>
                    </div>
                    </div>
                    <Form
    schema={schema}
    formData={formData}
    onChange={handleChange}
    uiSchema={uiSchema}
    validator={validator}
    widgets={widgets} // Make sure this is passed to the Form
>
    {formData.Q1 === 'Yes' && (
        <>
<h2 className='mb-2 text-sm'>If yes please specify</h2>
      <textarea
      placeholder="Enter a description..."
      className={`backdrop:before:w-[48rem] border appearance-none text-xs border-gray-400 text-neutral-600 pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer ${
        open
          ? "sm:w-[48rem] md:w-[89%] lg:w-[87%] xl:w-[90.5%] 2xl:w-[85%]"
          : "sm:w-[85%] md:w-[92%] lg:w-[88%] xl:w-[88.5%] 2xl:sm:w-[86%]"
      }`}
      id="details"
      value={formData.details}
      onChange={value => setFormData({ ...formData, details: value })}
      rows={7}
    />
</>
    )}

</Form>
<div className='mb-4'>
<button type="button"  className=" text-center py-1 text-sm w-[100px] bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline float-end" onClick={handleSubmit}>Submit</button>
                </div>
                </div>
            </>
        );
    };

export default Receivingwaterbody;
