import React, { useEffect } from 'react';
import { MdInfoOutline, MdOutlineDeleteOutline, MdAdd } from 'react-icons/md';
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const AddMultiSingleInput = (props) => {
  const { onChange, label, value = [], uiSchema = {} } = props;

  useEffect(() => {
    console.log("test", value);
  }, [value]);

  // Handle adding a new row
  const handleAddRow = () => {
    const updatedValue = [...value, '']; // Add a new empty row
    onChange(updatedValue);
  };

  // Handle removing a row
  const handleRemoveRow = (index) => {
    const updatedValue = value.filter((_, i) => i !== index);
    onChange(updatedValue);
  };

  // Handle changing input value
  const handleInputChange = (index, event) => {
    const updatedValue = [...value];
    updatedValue[index] = event.target.value;
    onChange(updatedValue);
  };

  // If the value array is empty, make sure we have at least one input field
  const valuesToRender = value.length === 0 ? [''] : value;

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
        {valuesToRender.map((val, index) => (
          <div key={index} className="mb-2">
            <div className="flex">
              <div className="w-[98%]">
                <input
                  className={uiSchema["ui:widgtclass2"]}
                  placeholder={uiSchema["ui:widgetplaceholder2"]}
                  type={uiSchema["ui:inputtype2"]}
                  value={val}
                  onChange={(event) => handleInputChange(index, event)}
                />
              </div>
              <div className="flex items-center">
                <button
                  type="button"
                  className="ml-2 text-red-500"
                  onClick={() => handleRemoveRow(index)}
                  disabled={valuesToRender.length === 1} // Disable if there's only one input field
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
            Add row <MdAdd className="text-lg ml-1" />
          </button>
        </div>
      </div>
    </>
  );
};

export default AddMultiSingleInput;
