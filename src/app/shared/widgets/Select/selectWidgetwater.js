import React, { useState } from "react";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { MdInfoOutline } from "react-icons/md";

const SelectWidgetwater = ({
  onChange,
  value = {},
  placeholder,
  label,
  uiSchema = {},
  id,
}) => {
  const [otherValue, setOtherValue] = useState(value.other || ""); // Value for "Other" input
  const [selectValue, setSelectValue] = useState(value.select || ""); // Value for the main select input
  const [volumeValue, setVolumeValue] = useState(value.volume || ""); // Value for the volume input
  const [unitValue, setUnitValue] = useState(value.unit || ""); // Value for the unit select
  const [showOtherInput, setShowOtherInput] = useState(
    value && value.select === "Other (please specify)"
  ); // Show or hide the "Other" input field

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    setSelectValue(selectedValue);

    if (selectedValue === "No") {
      // Clear values and set to disabled state when "No" is selected
      setVolumeValue("");
      setUnitValue("");
      onChange({ ...value, select: selectedValue, volume: "", unit: "" });
    } else {
      onChange({ ...value, select: selectedValue });
    }

    if (selectedValue === "Other (please specify)") {
      setShowOtherInput(true);
      setOtherValue(""); // Clear the "Other" input
    } else {
      setShowOtherInput(false);
    }
  };

  const handleOtherInputChange = (e) => {
    const inputValue = e.target.value;
    setOtherValue(inputValue);
    onChange({ ...value, other: inputValue });
  };

  const handleVolumeChange = (e) => {
    const volumeInputValue = e.target.value;
    setVolumeValue(volumeInputValue);
    onChange({ ...value, volume: volumeInputValue });
  };

  const handleUnitChange = (e) => {
    const unitInputValue = e.target.value;
    setUnitValue(unitInputValue);
    onChange({ ...value, unit: unitInputValue });
  };

  const handleKeyDown = (event) => {
    // Prevent invalid characters from being entered in the number input
    if (["e", "E", "+", "-"].includes(event.key)) {
      event.preventDefault();
    }
  };

  // Retrieve enum options safely
  const enumOptions1 = uiSchema["ui:enum1"] || [];
  const enumOptions2 = uiSchema["ui:enum2"] || [];

  return (
    <>
      <div className="flex">
        <div className="mb-3 px-1">
          <div className="relative w-[68%]">
            {id.startsWith("root_0") && (
              <>
                <p className="flex text-[13px] h-[35px] text-neutral-950 font-[400] mb-1 leading-[15px] ml-1">
                  {uiSchema["ui:title1"]}
                  <MdInfoOutline
                    data-tooltip-id={uiSchema["ui:title1"]}
                    data-tooltip-content={uiSchema["ui:tooltiptext1"]}
                    className="mt-0.5 ml-2 w-[30px] text-[14px]"
                    style={{ display: uiSchema["ui:display1"] || "block" }}
                  />
                  <ReactTooltip
                    id={uiSchema["ui:title1"]}
                    place="top"
                    effect="solid"
                    style={{
                      maxWidth: "800px",
                      minWidth: "300px",
                      backgroundColor: "#000",
                      color: "white",
                      fontSize: "12px",
                      borderRadius: "8px",
                      padding: "10px",
                      zIndex: "1000",
                    }}
                  />
                </p>
              </>
            )}
          </div>

          <div className="relative">
            {!showOtherInput ? (
              <select
                className="block w-[40vw] py-2 text-[12px] p-0 custom-select focus:outline-none focus:border-blue-300 border-b-2 border-gray-300 capitalize"
                value={selectValue}
                onChange={handleSelectChange}
              >
                <option value="" disabled className="text-gray-500">
                  {`Select ${label}` || "Select..."}
                </option>
                {enumOptions1.length > 0 &&
                  enumOptions1.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
              </select>
            ) : (
              <input
                type="text"
                className="block w-[20vw] py-2 text-[12px] border-b-2 border-gray-300"
                placeholder={`Specify other ${label}`}
                value={otherValue}
                onChange={handleOtherInputChange}
              />
            )}
          </div>
        </div>

        <div className="mb-3 px-1">
          {id.startsWith("root_0") && (
            <div className="relative flex justify-end">
              <p className="flex text-[13px] h-[35px] text-neutral-950 font-[400] mb-1">
                {uiSchema["ui:title2"]}
                <MdInfoOutline
                  data-tooltip-id={uiSchema["ui:title2"]}
                  data-tooltip-content={uiSchema["ui:tooltiptext2"]}
                  className="mt-1 ml-2 w-[30px] text-[14px]"
                  style={{ display: uiSchema["ui:display2"] || "block" }}
                />
                <ReactTooltip
                  id={uiSchema["ui:title2"]}
                  place="top"
                  effect="solid"
                  style={{
                    backgroundColor: "#000",
                    color: "white",
                    fontSize: "12px",
                    borderRadius: "8px",
                    zIndex: "1000",
                  }}
                />
              </p>
            </div>
          )}
          <div>
            <input
              className="block w-[20vw] py-2 text-[12px] leading-6 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:leading-5 border-b-2 border-gray-300 mb-3 text-right pr-2"
              placeholder={placeholder || `Enter ${uiSchema["ui:title2"]}`}
              type="number"
              value={volumeValue}
              onChange={handleVolumeChange}
              onKeyDown={handleKeyDown}
              disabled={selectValue !== "Yes"} // Disable input when select value is not "Yes"
            />
          </div>
        </div>

        <div className="mb-3 px-1">
          {id.startsWith("root_0") && (
            <div
              className={`relative flex ${
                label !== "Metric Unit" ? "justify-center" : "pl-2"
              }`}
            >
              <p className="flex text-[13px] h-[35px] text-neutral-950 font-[400] mb-1">
                {uiSchema["ui:title3"]}
                <MdInfoOutline
                  data-tooltip-id={uiSchema["ui:title3"]}
                  data-tooltip-content={uiSchema["ui:tooltiptext3"]}
                  className="mt-1 text-[14px] w-[20px] ml-1"
                  style={{ display: uiSchema["ui:display3"] || "block" }}
                />
                <ReactTooltip
                  id={uiSchema["ui:title3"]}
                  place="top"
                  effect="solid"
                  style={{
                    width: "300px",
                    backgroundColor: "#000",
                    color: "white",
                    fontSize: "12px",
                    borderRadius: "8px",
                    zIndex: "1000",
                  }}
                />
              </p>
            </div>
          )}
          <div className="flex justify-center items-center mt-2">
            <select
              className={`text-center py-1 text-[12px] w-[100px] rounded-md ${
                unitValue ? "bg-white text-blue-500 shadow" : "bg-blue-500 text-white"
              }`}
              value={unitValue}
              onChange={handleUnitChange}
              disabled={selectValue !== "Yes"} // Disable select when select value is not "Yes"
            >
              <option value="" disabled>
                {`Unit` || "Select..."}
              </option>
              {enumOptions2.length > 0 &&
                enumOptions2.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectWidgetwater;
