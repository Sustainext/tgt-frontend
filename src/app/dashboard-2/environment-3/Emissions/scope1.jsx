'use client'
import React, { useState } from 'react';
import  Form  from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
import { MdOutlineFileUpload, MdAdd, MdOutlineDeleteOutline, MdFilePresent, MdArrowDropDown } from "react-icons/md";
import dateWidget from '../../../shared/widgets/dateWidget';
import selectWidget from '../../../shared/widgets/selectWidget';
import inputWidget from '../../../shared/widgets/inputWidget';

const widgets = {
  inputWidget: inputWidget,
  dateWidget: dateWidget,
  selectWidget: selectWidget
};

const schema = {
  title: 'Emissions',
  type: 'array',
  items: {
    type: 'object',
    properties: {
      Category: {
        type: "string",
        title: "Category",
        enum: ['Category', 'Heating', 'Cooling', 'Steam'],
      },
      Subcategory: {
        type: "string",
        title: "Subcategory",
        enum: ['Coal', 'Solar', 'LPG', 'Diesel', 'Wind', 'Hydro'],
      },
      Activity: {
        type: "string",
        title: "Activity",
        enum: ['Renewable', 'Non-renewable'],
      },
      Quantity: {
        type: "string",
        title: "Quantity"
      },
      Unit: {
        type: "string",
        title: "Unit",
        enum: ['Joules', 'KJ', 'Wh', 'KWh', 'GJ', 'MMBtu'],
      },
      Test: {
        type: "string",
        title: "Test",
        enum: ['Joules', 'KJ', 'Wh', 'KWh', 'GJ', 'MMBtu'],
      },
      FileUpload: { // New property for file upload
        type: "string",
        title: "Upload File",
        format: "data-url",
      },
      AssignTo: {
        type: "string",
        title: "Assign To",
        enum: ['user1@sustainext.ai', 'user2@sustainext.ai'],
      }
      // Define other properties as needed
    }
  }
};

const uiSchema = {
  classNames: 'px-4 mb-4 flex flex-wrap text-xs', // Add flex-wrap to wrap fields to the next line
  items: {
    "classNames": "flex",
    Category: {
      classNames: 'px-4 mb-4 inline-block w-[100px]',
      'ui:widget': 'selectWidget',
      'ui:horizontal': true,
      enum: [
        { value: 'Heating', label: 'Heating' },
        { value: 'Cooling', label: 'Cooling' },
        { value: 'Steam', label: 'Steam' },
      ],
    },
    // Define UI schema for other properties
    
    Subcategory:{
      classNames: 'px-4 mb-4 inline-block',
      'ui:widget': 'selectWidget',
      'ui:horizontal': true,
      enum: [
        { value: 'Heating', label: 'Heating' },
        { value: 'Cooling', label: 'Cooling' },
        { value: 'Steam', label: 'Steam' },
      ],
    },
    Activity:{
      classNames: 'px-4 mb-4 inline-block',
      'ui:widget': 'selectWidget',
      'ui:horizontal': true,
      enum: [
        { value: 'Heating', label: 'Heating' },
        { value: 'Cooling', label: 'Cooling' },
        { value: 'Steam', label: 'Steam' },
      ],
    },
    Quantity:{
      classNames: 'px-4 mb-4 inline-block',
      'ui:widget': 'inputWidget',
      'ui:horizontal': true,
    
    },
    Unit:{
      classNames: 'px-4 mb-4 inline-block',
      'ui:widget': 'selectWidget',
      'ui:horizontal': true,
      enum: [
        { value: 'Heating', label: 'Heating' },
        { value: 'Cooling', label: 'Cooling' },
        { value: 'Steam', label: 'Steam' },
      ],
      },
    Test:{
      classNames: 'px-4 mb-4 inline-block',
      'ui:widget': 'selectWidget',
      'ui:horizontal': true,
      enum: [
        { value: 'Heating', label: 'Heating' },
        { value: 'Cooling', label: 'Cooling' },
        { value: 'Steam', label: 'Steam' },
      ],
    },
    FileUpload: { // UI schema for file upload
      classNames: 'px-4 mb-4 inline-block',
      'ui:widget': 'file',
      'ui:horizontal': true,
    },
    AssignTo: {
      classNames: 'px-4 mb-4 inline-block',
      'ui:widget': 'selectWidget',
      'ui:horizontal': true,
      enum: [
        { value: 'user1@sustainext.ai', label: 'user1@sustainext.ai' },
        { value: 'user2@sustainext.ai', label: 'user2@sustainext.ai' },
      ],
    },
    'ui:options': {
      orderable: false, // Prevent reordering of items
      addable: false, // Prevent adding items from UI
      removable: false, // Prevent removing items from UI
      layout: 'horizontal', // Set layout to horizontal
    }
  }
};

const environment2 = () => {
  const [formData, setFormData] = useState([]);
  // const [formCount, setFormCount] = useState(1); // Initial form count

  const handleFormDataChange = (data) => {
    setFormData(data.formData);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission
    console.log('Form data:', formData);
  };

  // -------
  const handleAddNew = () => {
    const newData = [...formData, {}];
    setFormData(newData);
  };
  

  return (
    <form onSubmit={handleSubmit}>
    {/* Render each form field */}
    <div className="px-4 mb-4 flex flex-wrap text-xs">

    <Form
      schema={schema}
      uiSchema={uiSchema}
      formData={formData}
      onChange={handleFormDataChange}
      validator={validator}
      widgets={widgets}
    >
    <div className="flex justify-start mt-4 right-1">
        <button
          type="button"
          className="text-center py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline"
          onClick={handleAddNew}
        >
          Add New
        </button>
      </div>

      {/* Custom submit button */}
      <div className="flex justify-start mt-4 right-1">
        <button
          type="submit"
          className=" text-center py-1 text-sm w-[100px] bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </Form>
    </div>
    </form>

  );
};


export default environment2;

  // ---------

  // const handleAddForm = () => {
  //   setFormCount(formCount + 1);
  // };

  // =======================
  // const renderForms = () => {
  //   const forms = [];
  //   for (let i = 0; i < formCount; i++) {
  //     forms.push(
  //       <div key={i} className="flex items-center">
  //         <Form
  //           // key={i}
  //           schema={schema}
  //           uiSchema={uiSchema}
  //           formData={formData}
  //           onChange={handleFormDataChange}
  //           validator={validator}
  //           widgets={widgets}
  //         />
  //         <AddButton onClick={handleAddForm} />
  //     </div>
  //     );
  //   }
  //   return forms;
  // };


//   return (
//     <form onSubmit={handleSubmit}>
//       {/* Render each form field */}
//       <div className="px-4 mb-4 flex flex-wrap text-xs">
//         {renderForms()}
//       </div>
//       {/* Custom submit button */}
//       <div className="flex justify-start mt-4 right-1">
//         <button
//           type="submit"
//           className="text-center py-1 text-sm w-[100px] bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline"
//           onClick={handleSubmit}
//         >
//           Submit
//         </button>
//         {/* <AddButton onClick={handleAddForm} /> */}
//       </div>
//     </form>
//   );
// };

// const AddButton = ({ onClick }) => {
//   return (
//     <button
//       onClick={onClick}
//       className="text-center py-1 text-sm w-[100px] bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none focus:shadow-outline ml-4"
//     >
//       Add New
//     </button>
//   );
// };

// export default environment2;
// =============================
