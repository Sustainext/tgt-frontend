import React, { useState, useEffect } from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { MdInfoOutline, MdOutlineDeleteOutline, MdAdd } from "react-icons/md";

const AddmultiInput = (props) => {
  const { onChange, value = [], label, uiSchema = {} } = props;

  useEffect(() => {
    // Ensure value is an array and initialize if it isn't
    if (!Array.isArray(value)) {
      onChange([{}]);
    } else if (value.length === 0) {
      // Add an empty object if array is empty
      onChange([{}]);
    }
  }, [value, onChange]);

  // Handle adding a new row
  const handleAddRow = () => {
    const updatedValue = [...value, { country: '', paymentCode: '' }];
    onChange(updatedValue);
  };

  // Handle removing a row
  const handleRemoveRow = (index) => {
    const updatedValue = value.filter((_, i) => i !== index);
    onChange(updatedValue);
  };

  // Handle changing input value
  const handleInputChange = (index, key, event) => {
    const updatedValue = [...value];
    updatedValue[index] = {
      ...updatedValue[index], // Copy existing object values
      [key]: event.target.value, // Update specific field
    };
    onChange(updatedValue); // Call the parent onChange with the updated array
  };

  // Ensure valuesToRender is always an array
  const valuesToRender = Array.isArray(value) && value.length > 0 ? value : [{}];

  return (
    <div className="mb-3 relative">
      <p className="text-[15px] text-gray-500 font-semibold flex mb-2" style={{ display: uiSchema["ui:titledisplay"] }}>
        {label}
        <MdInfoOutline
          data-tooltip-id={`tooltip-${uiSchema["ui:title"]?.replace(/\s+/g, "-")}`}
          data-tooltip-content={uiSchema["ui:tooltip"]}
          className="mt-1 ml-2 w-[30px] text-[14px]"
          style={{ display: uiSchema["ui:tooltipdisplay"] }}
        />
        <ReactTooltip
          id={`tooltip-${uiSchema["ui:title"]?.replace(/\s+/g, "-")}`}
          place="top"
          effect="solid"
          style={{
            width: "300px",
            backgroundColor: "#000",
            color: "white",
            fontSize: "12px",
            boxShadow: 3,
            borderRadius: "8px",
          }}
        />
      </p>

      {valuesToRender.map((val, index) => (
        <div key={index} className="mb-2">
          <div className="flex">
            <div className="w-[98%]">
              <input
                className={uiSchema["ui:widgtclass"]}
                placeholder={uiSchema["ui:widgetplaceholder"] || "Country"}
                type={uiSchema["ui:inputtype1"] || "text"}
                value={val.country || ''}
                onChange={(e) => handleInputChange(index, 'country', e)}
              />
              <input
                className={uiSchema["ui:widgtclass2"]}
                placeholder={uiSchema["ui:widgetplaceholder2"] || "Payment Code"}
                type={uiSchema["ui:inputtype2"] || "text"}
                value={val.paymentCode || ''}
                onChange={(e) => handleInputChange(index, 'paymentCode', e)}
              />
            </div>
            <div className="flex items-center">
              <button
                type="button"
                className="ml-2 text-red-500 mt-8"
                onClick={() => handleRemoveRow(index)}
              >
                <MdOutlineDeleteOutline size={25} />
              </button>
            </div>
          </div>
        </div>
      ))}

      <div className="flex right-1 mx-2">
        <button
          type="button"
          className="text-blue-500 font-semibold text-[15px] flex items-center cursor-pointer"
          onClick={handleAddRow}
        >
           Add country <MdAdd className="text-lg ml-1" />
        </button>
      </div>
    </div>
  );
};

export default AddmultiInput;
