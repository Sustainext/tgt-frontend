import React, { useState, useEffect } from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { MdInfoOutline, MdOutlineDeleteOutline, MdAdd } from "react-icons/md";

const AddMultiInputNew = (props) => {
  const { onChange, value = [], label, uiSchema = {} } = props;

  useEffect(() => {
    if (!Array.isArray(value)) {
      onChange([{}]);
    } else if (value.length === 0) {
      onChange([{}]);
    }
  }, [value, onChange]);

  const handleAddRow = () => {
    const updatedValue = [...value, { country: '', paymentCode: '' }];
    onChange(updatedValue);
  };

  const handleRemoveRow = (index) => {
    const updatedValue = value.filter((_, i) => i !== index);
    onChange(updatedValue);
  };

  const handleInputChange = (index, key, event) => {
    const updatedValue = [...value];
    updatedValue[index] = {
      ...updatedValue[index],
      [key]: event.target.value,
    };
    onChange(updatedValue);
  };

  const valuesToRender = Array.isArray(value) && value.length > 0 ? value : [];

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
      <div className="flex flex-col w-full">
  {/* Headings */}
  <div className="flex items-center justify-between mb-2">
    <p className="text-[13px] text-[#344054] w-[95%] flex mb-2">{uiSchema["ui:topHeading1"]}
    <MdInfoOutline
          data-tooltip-id={`tooltip-${uiSchema["ui:title"]?.replace(/\s+/g, "-")}`}
          data-tooltip-content={uiSchema["ui:tooltip1"]}
          className="mt-1 ml-2 w-[30px] text-[14px]"
          style={{ display: uiSchema["ui:tooltipdisplay1"] }}
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
    <p className="text-[13px] text-[#344054] w-full flex mb-2">{uiSchema["ui:topHeading2"]}
    <MdInfoOutline
          data-tooltip-id={`tooltip-${uiSchema["ui:title"]?.replace(/\s+/g, "-")}`}
          data-tooltip-content={uiSchema["ui:tooltip2"]}
          className="mt-1 ml-2 w-[30px] text-[14px]"
          style={{ display: uiSchema["ui:tooltipdisplay2"] }}
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
  </div>

  {/* Input Fields and Add Button */}
  {valuesToRender.map((val, index) => (
    <div key={index} className="mb-2">
      <div className="flex items-center gap-5">
        {/* First Input (Country) */}
        <div className="w-full">
          <input
            className={`${uiSchema["ui:widgtclass"]}`}
            placeholder={uiSchema["ui:widgetplaceholder"] || "Country"}
            type={uiSchema["ui:inputtype1"] || "text"}
            value={val.country || ''}
            onChange={(e) => handleInputChange(index, 'country', e)}
          />
        </div>

        {/* Second Input (Payment Code) and Add Button */}
        <div className="w-full flex items-center gap-5">
          <input
            className={`${uiSchema["ui:widgtclass2"]}`}
            placeholder={uiSchema["ui:widgetplaceholder2"] || "Payment Code"}
            type={uiSchema["ui:inputtype2"] || "text"}
            value={val.paymentCode || ''}
            onChange={(e) => handleInputChange(index, 'paymentCode', e)}
          />
        </div>

        {/* Remove Button */}
        <button
          type="button"
          className="ml-2 text-red-500"
          onClick={() => handleRemoveRow(index)}
        >
          <MdOutlineDeleteOutline size={25} />
        </button>
      </div>
    </div>
  ))}

  {/* Add Country Button */}
  <div className="w-full flex items-center">
      <button
        type="button"
        className="text-blue-500 font-semibold text-[15px] flex items-center cursor-pointer"
        onClick={handleAddRow}
      >
        Add country <MdAdd className="text-lg ml-1" />
      </button>
    </div>
</div>
    </div>
  );
};

export default AddMultiInputNew;