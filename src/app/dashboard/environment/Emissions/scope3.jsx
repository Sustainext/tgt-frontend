'use client'
import React, { useState } from 'react';
import Form from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
import { MdAdd, MdOutlineDeleteOutline } from "react-icons/md";
import CustomFileUploadWidget from '../../../shared/widgets/CustomFileUploadWidget';
import AssignToWidget from '../../../shared/widgets/assignToWidget';
import CombinedWidget from '../../../shared/widgets/emissioncombinedWidget';
import { GlobalState } from '../../../../Context/page';
import RemoveWidget from '../../../shared/widgets/RemoveWidget';
const widgets = {
  EmissonCombinedWidget: CombinedWidget,
  FileUploadWidget: CustomFileUploadWidget,
  AssignTobutton: AssignToWidget,
  RemoveWidget: RemoveWidget, // Update widgets to include CombinedWidget
};

const schema = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      Emission: {
        type: "string",
        title: "Emission",
      },
      FileUpload: {
        type: "string",
        format: "data-url",
      },
      AssignTo: {
        type: "string",
        title: "Assign To",
      },
      Remove: {
        type: "string",

      },
    }
  }
};

const uiSchema = {
  className: 'flex flex-wrap',
  items: {
    classNames: 'flex flex-col md:flex-row w-full md:w-auto',
    Emission: {
      'ui:widget': 'EmissonCombinedWidget', // Use CombinedWidget for Emission field
      'ui:horizontal': true,
      'ui:options': {
        label: false
      },
    },
    FileUpload: {
      'ui:widget': 'FileUploadWidget',
      'ui:horizontal': true,
      'ui:options': {
        label: false
      },
    },
    AssignTo: {
      "ui:widget": "AssignTobutton",
      'ui:horizontal': true,
      'ui:options': {
        label: false
      },
    },
    Remove: {
      "ui:widget": "RemoveWidget",
      'ui:horizontal': true,
      'ui:options': {
        label: false // This disables the label for this field
      },
    },
    'ui:options': {
      orderable: false,
      addable: false,
      removable: false,
      label: false,
      layout: 'horizontal',
    }
  }
};

const Scope3 = ({ handleScope3Change, handleScope3Remove }) => {
  const { open } = GlobalState();
  const [formData, setFormData] = useState([{}]);

  const handleChange = (e) => {
    setFormData(e.formData);
    handleScope3Change(e.formData);
  };

  const handleAddNew = () => {
    const newData = [...formData, {}];
    setFormData(newData);
    handleScope3Change(newData);
  };


  const updateFormData = (newData) => {
    setFormData(newData);
    handleScope3Change(newData);
    handleScope3Remove(newData); // Ensure the parent state is updated
  };
  return (
    <>
        <div className={`overflow-auto custom-scrollbar flex justify-around ${open ? "xl:w-[768px] 2xl:w-[1100px]" : "xl:w-[940px] 2xl:w-[1348px]"}`}>
      <Form
        className='flex'
        schema={schema}
        uiSchema={uiSchema}
        formData={formData}
        onChange={handleChange}
        validator={validator}
        widgets={{
          ...widgets,
          RemoveWidget: () => (
            <RemoveWidget
              formData={formData}
              setFormData={updateFormData} // Pass the update function instead
            />

          ),

        }}
      />
      </div>
      <div className="flex justify-start mt-4 right-1">
        <button type="button" className="text-[#007EEF] text-[12px] flex cursor-pointer mt-5 mb-5" onClick={handleAddNew}>
          <MdAdd className='text-lg' /> Add Row
        </button>
      </div>

    </>
  );
};

export default Scope3;