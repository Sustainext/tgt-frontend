'use client'
import React, { useState, useEffect } from 'react';
import Form from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
import { MdAdd, MdOutlineDeleteOutline, MdInfoOutline } from "react-icons/md";
import { GlobalState } from '../../../../../Context/page';
import dateWidget from '../../../../shared/widgets/dateWidget';
import selectWidget from '../../../../shared/widgets/selectWidget';
import inputWidget from '../../../../shared/widgets/inputWidget';
import CustomFileUploadWidget from '../../../../shared/widgets/CustomFileUploadWidget';
import AssignToWidget from '../../../../shared/widgets/assignToWidget';
import CustomSelectInputWidget from '../../../../shared/widgets/CustomSelectInputWidget';
import RemoveWidget from '../../../../shared/widgets/RemoveWidget';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

const widgets = {
  inputWidget: inputWidget,
  dateWidget: dateWidget,
  selectWidget: selectWidget,
  FileUploadWidget: CustomFileUploadWidget,
  AssignTobutton: AssignToWidget,
  CustomSelectInputWidget: CustomSelectInputWidget,
  RemoveWidget: RemoveWidget,
};

const schema = {
  type: 'array',
  items: {
    type: 'object',
    properties: {

      ProductServices: {
        type: "string",
        title: "Product / Services",
        tooltiptext: "Indicate the product or service for which Energy Requirements have been reduced."
      },

      Quantity: {
        type: "string",
        title: "Quantity",
        tooltiptext: "Indicate the quantity of reduced energy requirement"
      },
      Unit: {
        type: "string",
        title: "Unit",
        enum: ['Joules', 'KJ', 'Wh', 'KWh', 'GJ', 'MMBtu'],
        tooltiptext: "Select the correct unit corresponding to the quantity"
      },
      Baseyear: {
        type: "string",
        title: "Base year",
        tooltiptext: "Indicate the base year used for comparing energy saved before the intervention"
      },

      AssignTo: {
        type: "string",
        title: "Assign To",
      },
      FileUpload: {
        type: "string",
        format: "data-url",
        title: "File Upload",
      },
      Remove: {
        type: "string",
        title: "Remove",
      },
      // Define other properties as needed
    }
  }
};

const uiSchema = {
  className: 'flex flex-wrap', // Add flex-wrap to wrap fields to the next line
  items: {
    classNames: 'flex flex-col md:flex-row w-full md:w-auto',

    ProductServices: {
      'ui:widget': 'inputWidget',
      'ui:options': {
        label: false
      },
    },
    Quantity: {
      'ui:widget': 'inputWidget',
      'ui:options': {
        label: false
      },
    },
    Unit: {
      'ui:widget': 'selectWidget',
      'ui:horizontal': true,
      'ui:options': {
        label: false
      },
    },
    Baseyear: {
      'ui:widget': 'inputWidget',
      'ui:options': {
        label: false
      },
    },

    AssignTo: {
      "ui:widget": "AssignTobutton",
      'ui:horizontal': true,
      'ui:options': {
        label: false // This disables the label for this field
      },
    },
    FileUpload: {
      'ui:widget': 'FileUploadWidget',
      'ui:horizontal': true,
      'ui:options': {
        label: false // This disables the label for this field
      },
    },
    Remove: {
      "ui:widget": "RemoveWidget",
      'ui:options': {
        label: false // This disables the label for this field
      },
    },
    'ui:options': {
      orderable: false, // Prevent reordering of items
      addable: false, // Prevent adding items from UI
      removable: false, // Prevent removing items from UI
      layout: 'horizontal', // Set layout to horizontal
    }
  }
};

const generateTooltip = (field, title, tooltipText) => {
  if (field === "FileUpload" || field === "AssignTo" || field === "Remove") {
    return null; // Return null to skip rendering tooltip for these fields
  }

  return (
    <div className='mx-2 flex w-[230px]'>
      <label className="text-sm leading-5 text-gray-700 flex">{title}</label>
      <MdInfoOutline
        data-tooltip-id={field}
        data-tooltip-content={tooltipText}
        className="mt-1 ml-2 text-[12px]"
      />
      <ReactTooltip
        id={field}
        place="top"
        effect="solid"
        style={{
          width: "290px",
          backgroundColor: "#000",
          color: "white",
          fontSize: "12px",
          boxShadow: 3,
          borderRadius: "8px",
          textAlign: 'center',
        }}
      />
    </div>
  );
};

const Productsservices = () => {
  const { open } = GlobalState();
  const [formData, setFormData] = useState([{}]);

  const handleAddNew = () => {
    setFormData([...formData, {}]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data:', formData);
  };

  const renderFields = () => {
    const fields = Object.keys(schema.items.properties);
    return fields.map((field, index) => (
      <div key={index}>
        {generateTooltip(field, schema.items.properties[field].title, schema.items.properties[field].tooltiptext)}
      </div>
    ));
  };

  return (
    <>
      <div className={`overflow-auto custom-scrollbar flex justify-around ${open ? "xl:w-[768px] 2xl:w-[1100px]" : "xl:w-[940px] 2xl:w-[1348px]"}`}>
        <div>
          <div>
            <div className='flex'>
              {renderFields()} {/* Render dynamic fields with tooltips */}
            </div>
          </div>

          <Form
            className='flex'
            schema={schema}
            uiSchema={uiSchema}
            formData={formData}
            onChange={(e) => setFormData(e.formData)}
            validator={validator}
            widgets={{
              ...widgets,
              RemoveWidget: () => <RemoveWidget formData={formData} setFormData={setFormData} />
            }}
          />
        </div>
      </div>

      <div className="flex justify-start mt-4 right-1">
        <button type="button" className="text-[#007EEF] text-[12px] flex cursor-pointer mt-5 mb-5" onClick={handleAddNew}>
          <MdAdd className='text-lg' /> Add Row
        </button>
      </div>

      <button type="button" onClick={handleSubmit}>Submit</button> {/* Add a submit button */}
    </>
  );
};

export default Productsservices;
