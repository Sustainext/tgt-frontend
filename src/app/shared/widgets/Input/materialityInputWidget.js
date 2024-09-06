import React from 'react';
import { MdKeyboardArrowDown, MdInfoOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const MaterialityInputWidget = (props) => {
  const { onChange, value = "", uiSchema = {} } = props;
 
  const handleChange = (event) => {
    onChange(event.target.value);
  };
  return (
    <>
      <div className="mb-6">
        <div className="flex mb-2">
          <div className=" relative w-[55%] flex">
            <p className="text-[15px] text-gray-700 flex w-full">
              {uiSchema["ui:title"]}
              
            </p>
            <MdInfoOutline
                data-tooltip-id={`tooltip-${uiSchema["ui:title"].replace(
                  /\s+/g,
                  "-"
                )}`}
                data-tooltip-html={`${uiSchema["ui:tooltip"]}`}
                className="mt-1 ml-2 w-[30px] text-[14px]"
                style={{ display: uiSchema["ui:tooltipdisplay"] }}
              />
              {/* Tooltip */}
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
              ></ReactTooltip>
          </div>
          <button className="text-[#007EEF] bg-slate-200 rounded-md text-[11px] w-[72px] h-[22px] ml-6 text-center mt-1">
            {uiSchema['ui:tag']}
          </button>
        </div>
        {/* <textarea
          placeholder="Enter data"
          className={`backdrop:before:w-[48rem] border appearance-none text-xs border-gray-400 text-neutral-600 pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer w-full`}
          value={value}
          onChange={handleChange}
          rows={4}
        /> */}
         <textarea
          placeholder="Enter a description..."
          className={`backdrop:before:w-[48rem] border appearance-none text-xs border-gray-400 text-neutral-600 pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer mx-3 mt-2 sm:w-[48rem] md:w-[60%] lg:w-[63%] xl:w-[62%] 2xl:w-[67%] `}
         
          value={value}
          onChange={handleChange}
          rows={7}
        />
      </div>
    </>
  );
};

export default MaterialityInputWidget;
