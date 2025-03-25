import React from "react";
import { MdKeyboardArrowDown, MdInfoOutline } from "react-icons/md";
import { GlobalState } from "../../../../Context/page";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import STARSVG from "../../../../../public/star.svg";
import Image from "next/image";

const AutoFillTextArea = (props) => {
  const { open } = GlobalState();
  const { onChange, value = "", uiSchema = {},formContext,name } = props;
  const { validationErrors } = formContext || {};
  const rowErrors = validationErrors || {};
  const hasError = !value && rowErrors && rowErrors[name]

  const handleChange = (event) => {
    onChange(event.target.value);
  };

  const loadContent=(data)=>{
    onChange(data);
  }

  return (
    <>
      <div className="px-1">
      <div className="flex justify-between mb-2 w-full">
          <div className=" relative">
            <p className="text-[14px] text-gray-700 font-[500] flex mt-4">
              {uiSchema["ui:title"]}
              <MdInfoOutline
                data-tooltip-id={`tooltip-${uiSchema["ui:title"].replace(
                  /\s+/g,
                  "-"
                )}`}
                data-tooltip-html={uiSchema["ui:tooltipstitle"]}
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
            </p>
          </div>
          <button className="px-2 py-2 text-[#007EEF] border border-[#007EEF] text-[12px] rounded-md mb-1 flex"
        onClick={()=>{loadContent(`${uiSchema["ui:autoFillContent"]}`)}}
        >
          <Image src={STARSVG} className="w-5 h-5 mr-1.5" alt="star" />
          Auto Fill
        </button>
        </div>
        <div className="">
          <textarea
           placeholder="Enter a description..."
           className={`w-full border appearance-none text-[12px] mb-2
           ${hasError ? "border-red-500" : "border-gray-400"} 
           text-neutral-600 pl-2 rounded-md py-2 leading-tight focus:outline-none 
           focus:bg-white focus:border-gray-400 cursor-pointer`}
            value={value}
            onChange={handleChange}
            rows={7}
          />
        </div>
        {hasError && (
          <div className="text-red-500 text-[12px] mt-1">
           {hasError}
          </div>
        )}
      </div>
    </>
  );
};

export default AutoFillTextArea;
