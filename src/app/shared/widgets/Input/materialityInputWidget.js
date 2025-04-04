import React from "react";
import { MdKeyboardArrowDown, MdInfoOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const MaterialityInputWidget = (props) => {
  const { onChange, value = "", uiSchema = {}, options } = props;

  const handleChange = (event) => {
    onChange(event.target.value);
  };
  return (
    <>
  <div className="mb-6 w-full">
  <div className="flex  xl:flex-row flex-col items-center mb-2 xl:gap-2 gap-4">
    <div className="flex items-start  xl:w-[55%] w-full px-2">
      <p className="text-[12px] text-gray-700 mr-2">{uiSchema["ui:title"]}</p>
      <MdInfoOutline
        data-tooltip-id={`tooltip-${uiSchema["ui:title"].replace(/\s+/g, "-")}`}
        data-tooltip-html={`${uiSchema["ui:tooltip"]}`}
        className="flex-shrink-0 mt-[2px]"
        style={{
          width: "14px",
          display: uiSchema["ui:tooltipdisplay"],
        }}
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
          boxShadow: 3,
          borderRadius: "8px",
        }}
      />
    </div>

    {/* Tag Button */}
    <button className="text-[#007EEF] bg-slate-200 rounded-md text-[11px] px-3 h-[22px] ml-2 sm:ml-0 w-fit self-start sm:self-center">
      {uiSchema["ui:tag"]}
    </button>
  </div>

  {/* Textarea */}
  <textarea
    placeholder="Enter a description..."
    className="border text-[12px] border-gray-400 text-neutral-600 pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 w-full  md:w-[65%] lg:w-[65%] xl:w-[65%] 2xl:w-[65%] 4k:w-[65%] 2k:w-[65%] mx-2 sm:mx-0 mt-2"
    value={value}
    onChange={handleChange}
    rows={7}
  />

  {/* Error message */}
  {options && options.yesChecked ? (
    <div className="text-red-600 text-[12px] mt-1 pl-3">
      This field is required
    </div>
  ) : (
    <div></div>
  )}
</div>

    </>
  );
};

export default MaterialityInputWidget;
