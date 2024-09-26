import React from 'react';
import { MdKeyboardArrowDown, MdInfoOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const inputWidget2 = (props) => {
  const { onChange, value = "", uiSchema = {} } = props;
  const handleChange = (event) => {
    onChange(event.target.value);
  };
  
  return (
    <>
      <div className="mb-6">
        <div className="flex mb-2">
          <div className=" relative">
            <p className="flex text-[12px] text-gray-500 font-semibold">
              {uiSchema["ui:title"]}
              <MdInfoOutline
                data-tooltip-id={`tooltip-${uiSchema["ui:title"].replace(
                  /\s+/g,
                  "-"
                )}`}
                data-tooltip-html={uiSchema["ui:tooltip"]}
                className="mt-1 ml-2 w-[30px] text-[13px]"
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
        </div>
        <textarea
          placeholder="Enter data"
          className={`backdrop:before:w-[48rem] border appearance-none text-[12px] border-gray-400 text-neutral-600 pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer w-full`}
          value={value}
          onChange={handleChange}
          rows={4}
        />
      </div>
    </>
  );
};

export default inputWidget2;
