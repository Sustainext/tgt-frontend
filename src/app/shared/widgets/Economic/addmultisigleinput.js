import React, { useState, useEffect } from 'react';
import { MdInfoOutline, MdOutlineDeleteOutline, MdAdd } from 'react-icons/md';
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const AddMultiSingleInput = (props) => {
  const { onChange, label, value = [], uiSchema = {} } = props;

  // Initialize state for values, defaulting to [""] if value is empty
  const [values, setValues] = useState(value.length > 0 ? value : [""]);

  // Update state when value prop changes
  useEffect(() => {
    if (value.length > 0 && JSON.stringify(value) !== JSON.stringify(values)) {
      setValues(value);
    } else if (value.length === 0 && values.length === 0) {
      setValues([""]); // Ensure at least one input is shown when both are empty
    }
  }, [value]); // Run only when `value` prop changes

  const handleChange = (index, event) => {
    const updatedValues = [...values];
    updatedValues[index] = event.target.value;
    setValues(updatedValues);
    onChange(updatedValues);  // Pass the updated values back to the parent component
  };

  const addRow = () => {
    setValues([...values, ""]);
  };

  const removeRow = (index) => {
    if (values.length > 1) {
      const updatedValues = values.filter((_, i) => i !== index);
      setValues(updatedValues);
      onChange(updatedValues);  // Update the parent component
    }
  };

  return (
    <>
      <div className="mb-2 relative flex">
        <div>
          <p
            className="text-[15px] text-gray-500 font-semibold flex mb-2"
            style={{ display: uiSchema["ui:titledisplay"] }}
          >
            {label}
          </p>
        </div>
        <div>
          {uiSchema["ui:tooltip"] && (
            <>
              <MdInfoOutline
                data-tooltip-id={`tooltip-${uiSchema["ui:title"].replace(/\s+/g, "-")}`}
                data-tooltip-content={uiSchema["ui:tooltip"]}
                className="mt-1 ml-2 w-[30px] text-[14px]"
                style={{ display: uiSchema["ui:tooltipdisplay"] }}
              />
              <ReactTooltip
                id={`tooltip-${uiSchema["ui:title"].replace(/\s+/g, "-")}`}
                place="top"
                effect="solid"
                style={{
                  width: "300px",
                  backgroundColor: "#000",
                  color: "white",
                  fontSize: "12px",
                  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
                  borderRadius: "8px",
                }}
              />
            </>
          )}
        </div>
      </div>

      <div>
        {values.map((val, index) => (
          <div key={index} className="mb-2">
            <div className="flex">
              <div className="w-[98%]">
                <input
                  className={uiSchema["ui:widgtclass2"]}
                  placeholder={uiSchema["ui:widgetplaceholder2"]}
                  type={uiSchema["ui:inputtype2"]}
                  value={val}
                  onChange={(event) => handleChange(index, event)}
                />
              </div>
              <div className="flex items-center">
                <button
                  type="button"
                  className="ml-2 text-red-500 mt-2"
                  onClick={() => removeRow(index)}
                  style={{ display: values.length > 1 ? "inline" : "none" }}
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
            onClick={addRow}
          >
            Add row <MdAdd className="text-lg ml-1" />
          </button>
        </div>
      </div>
    </>
  );
};

export default AddMultiSingleInput;
